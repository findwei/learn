#

[toc]

# 属性默认值 和 类型检查

## 属性默认值

通过一个**静态属性**`defaultProps`告知 react 属性默认值

## 属性类型检查

使用库：`prop-types`

对组件使用**静态属性**`propTypes`告知 react 如何检查属性

```js

PropTypes.any：//任意类型
PropTypes.array：//数组类型
PropTypes.bool：//布尔类型
PropTypes.func：//函数类型
PropTypes.number：//数字类型
PropTypes.object：//对象类型
PropTypes.string：//字符串类型
PropTypes.symbol：//符号类型

PropTypes.node：//任何可以被渲染的内容，字符串、数字、React元素
PropTypes.element：//react元素
PropTypes.elementType：//react元素类型
PropTypes.instanceOf(构造函数)：//必须是指定构造函数的实例
PropTypes.oneOf([xxx, xxx])：//枚举
PropTypes.oneOfType([xxx, xxx]);  //属性类型必须是数组中的其中一个
PropTypes.arrayOf(PropTypes.XXX)：//必须是某一类型组成的数组
PropTypes.objectOf(PropTypes.XXX)：//对象由某一类型的值组成
PropTypes.shape(对象): //属性必须是对象，并且满足指定的对象要求
PropTypes.exact({...})：//对象必须精确匹配传递的数据

//自定义属性检查，如果有错误，返回错误对象即可
属性: function(props, propName, componentName) {
   //...
}
```

# HOC 高阶组件

HOF：Higher-Order Function, 高阶函数，以函数作为参数，并返回一个函数
HOC: Higher-Order Component, 高阶组件，以组件作为参数，并返回一个组件

通常，可以利用 HOC 实现横切关注点。

> 举例：20 个组件，每个组件在创建组件和销毁组件时，需要作日志记录
> 20 个组件，它们需要显示一些内容，得到的数据结构完全一致

**注意**

1. 不要在 render 中使用高阶组件
2. 不要在高阶组件内部更改传入的组件

```js
import React from "react";
/**
 * 高阶组件
 * @param {*} comp 组件
 */
export default function withLog(Comp, str) {
  return class LogWrapper extends React.Component {
    componentDidMount() {
      console.log(`日志：组件${Comp.name}被创建了！${Date.now()}`);
    }

    componentWillUnmount() {
      console.log(`日志：组件${Comp.name}被销毁了！${Date.now()}`);
    }

    render() {
      return (
        <>
          <h1>{str}</h1>
          <Comp {...this.props} />
        </>
      );
    }
  };
}
```

# ref

> reference: 引用 本质上 ref 就是一个对象 `{current:null}` `React.createRef()`就的返回结果就相当于`{current:null}`

场景：希望直接使用 dom 元素中的某个方法，或者希望直接使用自定义组件中的某个方法

1. ref 作用于内置的 html 组件，得到的将是真实的 dom 对象
2. ref 作用于类组件，得到的将是类的实例
3. **ref 不能作用于函数组件 因为函数组件没有实例 可以使用 Ref 转发（forwardRef）解决**

ref 不再推荐使用字符串赋值，字符串赋值的方式将来可能会被移出

目前，ref 推荐使用对象或者是函数

**1.ref 对象形式**

通过 React.createRef 函数创建

```js
import React, { Component } from "react";
export default class Comp extends Component {
  constructor(props) {
    super(props);
    this.txt = React.createRef();
  }

  handleClick = () => {
    this.txt.current.focus();
  };
  render() {
    return (
      <div>
        <input ref={this.txt} type="text" />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    );
  }
}
```

**2.ref 回调函数形式**

函数的调用时间：

1. componentDidMount 的时候会调用该函数
   1. 在 componentDidMount 事件中可以使用 ref
2. 如果 ref 的值发生了变动（旧的函数被新的函数替代），分别调用旧的函数以及新的函数，时间点出现在 componentDidUpdate 之前
   1. 旧的函数被调用时，传递 null
   2. 新的函数被调用时，传递对象
3. 如果 ref 所在的组件被卸载，会调用函数

```js
import React, { Component } from "react";
export default class Comp extends Component {
  state = {
    show: true,
  };
  handleClick = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  componentDidMount() {
    console.log("didMount", this.txt);
  }
  getRef = (el) => {
    console.log("函数被调用了", el);
    this.txt = el;
  };

  render() {
    return (
      <div>
        {this.state.show && <input ref={this.getRef} type="text" />}
        <button onClick={this.handleClick}>显示/隐藏</button>
      </div>
    );
  }
}
```

**谨慎使用 ref**

能够使用属性和状态进行控制，就不要使用 ref。

1. 调用真实的 DOM 对象中的方法
2. 某个时候需要调用类组件的方法

# Ref 转发

forwardRef

forwardRef 方法：

1. 参数，传递的是**函数组件**，不能是类组件，并且，函数组件需要有第二个参数来得到 ref
2. 返回值，返回一个新的组件

```js
import React from "react";
function A(props, ref) {
  return (
    <h1 ref={ref}>
      组件A
      <span>{props.words}</span>
    </h1>
  );
}

//传递函数组件A，得到一个新组件NewA
const NewA = React.forwardRef(A);

export default class App extends React.Component {
  ARef = React.createRef();
  componentDidMount() {
    console.log(this.ARef);
  }
  render() {
    return (
      <div>
        <NewA ref={this.ARef} words="asfsafasfasfs" />
        {/* this.ARef.current:  h1 */}
      </div>
    );
  }
}
```

# 上下文-Context

上下文：Context，表示做某一些事情的环境

React 中的上下文特点：

1. 当某个组件创建了上下文后，上下文中的数据，会被所有后代组件共享
2. 如果某个组件依赖了上下文，会导致该组件不再纯粹（纯粹的组件外部数据仅来源于属性 props）
3. 一般情况下，用于第三方组件（通用组件）

## 旧的 API（了解就行了 马上淘汰了）

> 了解就行了 马上淘汰了

**创建上下文**

只有类组件才可以创建上下文

1. 给类组件书写静态属性 childContextTypes，使用该属性对上下文中的数据类型进行约束
2. 添加实例方法 getChildContext，该方法返回的对象，即为上下文中的数据，该数据必须满足类型约束，该方法会在每次 render 之后运行。

**使用上下文中的数据**

要求：如果要使用上下文中的数据，组件必须有一个静态属性 contextTypes，该属性描述了需要获取的上下文中的数据类型

1. 可以在组件的构造函数中，通过第二个参数，获取上下文数据
2. **从组件的 context 属性中获取**
3. 在函数组件中，通过第二个参数，获取上下文数据

**上下文的数据变化**

上下文中的数据不可以直接变化，最终都是通过状态改变 在上下文中加入一个处理函数，可以用于后代组件更改上下文的数据

Context 嵌套时候 取值是就

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
const types = {
  a: PropTypes.number,
  b: PropTypes.string.isRequired,
  onChangeA: PropTypes.func,
};
function ChildA(props, context) {
  return (
    <div>
      <h1>ChildA</h1>
      <h2>
        a:{context.a}，b:{context.b}
      </h2>
      <ChildB />
    </div>
  );
}

ChildA.contextTypes = types;

class ChildB extends React.Component {
  /**
   * 声明需要使用哪些上下文中的数据
   */
  static contextTypes = types;

  render() {
    return (
      <p>
        ChildB，来自于上下文的数据：a: {this.context.a}, b:{this.context.b}
        <button
          onClick={() => {
            this.context.onChangeA(this.context.a + 2);
          }}
        >
          子组件的按钮，a+2
        </button>
      </p>
    );
  }
}

export default class OldContext extends Component {
  /**
   * 约束上下文中数据的类型
   */
  static childContextTypes = types;

  state = {
    a: 123,
    b: "abc",
  };

  /**
   * 得到上下文中的数据
   */
  getChildContext() {
    console.log("获取新的上下文");
    return {
      a: this.state.a,
      b: this.state.b,
      onChangeA: (newA) => {
        this.setState({
          a: newA,
        });
      },
    };
  }

  render() {
    return (
      <div>
        <ChildA />
        <button
          onClick={() => {
            this.setState({
              a: this.state.a + 1,
            });
          }}
        >
          a加1
        </button>
      </div>
    );
  }
}
```

## 新版 API

旧版 API 存在严重的效率问题，并且容易导致滥用

**创建上下文**

上下文是一个独立于组件的对象，该对象通过 React.createContext(默认值)创建

返回的是一个包含两个属性的对象

1. Provider 属性：生产者。一个组件，该组件会创建一个上下文，该组件有一个 value 属性，通过该属性，可以为其数据赋值
   1. 同一个 Provider，不要用到多个组件中，如果需要在其他组件中使用该数据，应该考虑将数据提升到更高的层次
2. Consumer 属性：后续讲解

**使用上下文中的数据**

1. 在类组件中，直接使用 this.context 获取上下文数据
   1. 要求：必须拥有静态属性 contextType , 应赋值为创建的上下文对象
2. 在函数组件中，需要使用 Consumer 来获取上下文数据
   1. Consumer 是一个组件
   2. 它的子节点，是一个函数（它的 props.children 需要传递一个函数）

**注意细节**

如果，上下文提供者（Context.Provider）中的 value 属性发生变化(Object.is 比较)，会导致该上下文提供的所有后代元素全部重新渲染，无论该子元素是否有优化（无论 shouldComponentUpdate 函数返回什么结果）

```js
import React, { Component } from "react";
const ctx = React.createContext();

function ChildA(props) {
  return (
    <div>
      <h1>ChildA</h1>
      <h2>
        <ctx.Consumer>
          {(value) => (
            <>
              {value.a}，{value.b}
            </>
          )}
        </ctx.Consumer>
      </h2>
      <ChildB />
    </div>
  );
}

class ChildB extends React.Component {
  // 这种形式也可以 也可以用Consumer
  static contextType = ctx;
  shouldComponentUpdate(nextProps, nextState) {
    console.log("运行了优化");
    // 这里的优化是没有效果的 就算是返回的false render 还是会运行 react 强制更新
    return false;
  }
  render() {
    return (
      <p>
        ChildB，来自于上下文的数据：a: {this.context.a}, b:{this.context.b}
        <button
          onClick={() => {
            this.context.changeA(this.context.a + 2);
          }}
        >
          后代组件的按钮，点击a+2
        </button>
      </p>
    );
  }
}

export default class NewContext extends Component {
  state = {
    a: 0,
    b: "abc",
    changeA: (newA) => {
      this.setState({
        a: newA,
      });
    },
  };

  render() {
    return (
      <ctx.Provider value={this.state}>
        <div>
          <ChildA />

          <button
            onClick={() => {
              this.setState({
                a: this.state.a + 1,
              });
            }}
          >
            父组件的按钮，a加1
          </button>
        </div>
      </ctx.Provider>
    );
  }
}
```

# PureComponent

纯组件：基于 React.PureComponent 类实现的的类组件被视为纯组件，用于避免不必要的渲染（运行 render 函数）从而提高效率

优化：如果更新 React 组件 相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。（赋予相同的值重新渲染组件是不必要的）

PureComponent 是一个组件，如果某个组件继承自该组件，则该组件的 shouldComponentUpdate 会进行优化，对组件的 props 和 state 进行**浅比较**，如果**相等则**不会重新渲染

**注意：**

1. PureComponent 是进行浅比较
   1. 为了效率应该尽量使用该组件
   2. 在更新状态时 不要直接改原来的状态 永远要创建新的状态去覆盖原来状态（可以考虑使用 [immutable](https://immutable-js.com/) 不可改变对象）
2. 函数组件使用 React.memo 函数制作纯组件

```js
// 类组件使用
class Greeting extends React.PureComponent {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
// 函数组件
function MyComponent(props) {
  /* 使用 props 渲染 */
}
// 自定义对比方法
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
  /*
    与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，
    areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。
    */
}
export default React.memo(MyComponent, areEqual);
```

# render props

某些组件的各种功能及其**处理逻辑几乎完全相同**，只是显示的**界面不一样**，建议下面的方式认选其一来解决重复代码的问题（横切关注点）

1.  render props

    1. 某个组件，需要某个属性
    2. 该属性是一个函数，函数的返回值用于渲染
    3. 函数的参数会传递为需要的数据
    4. 注意纯组件的属性（尽量避免每次传递的 render props 的地址不一致）
    5. 通常该属性的名字叫做 render

```javascript
import React, { PureComponent } from "react";

/**
 * 该组件用于监听鼠标的变化
 */
class MouseListener extends PureComponent {
  state = {
    x: 0,
    y: 0,
  };

  divRef = React.createRef();

  handleMouseMove = (e) => {
    //更新x和y的值
    const { left, top } = this.divRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    this.setState({
      x,
      y,
    });
  };

  render() {
    return (
      <div
        ref={this.divRef}
        className="point"
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render ? this.props.render(this.state) : "默认值"}
      </div>
    );
  }
}
// ui 界面不一样的组件
const renderPoint = (mouse) => (
  <>
    横坐标：{mouse.x}，纵坐标：{mouse.y}
  </>
);
const renderDiv = (mouse) => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: "#008c8c",
        position: "absolute",
        left: mouse.x - 50,
        top: mouse.y - 50,
      }}
    ></div>
  );
};
// 使用
export default function Test() {
  return (
    <div>
      <MouseListener render={renderPoint} />
      <MouseListener render={renderDiv} />
    </div>
  );
}
```

2.  HOC（高阶组件）

使用高阶组件实现

```js
import React, {PureComponent} from 'react'
// 高阶组件
export default function withMouseListener(Comp) {
    return class MouseListener extends PureComponent {
        state = {
            x: 0,
            y: 0
        }

        divRef = React.createRef()

        handleMouseMove = e => {
            //更新x和y的值
            const { left, top } = this.divRef.current.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            this.setState({
                x,
                y
            });
        }

        render() {
            return (
                <div ref={this.divRef} className="point" onMouseMove={this.handleMouseMove}>
                    <Comp {...this.props} x={this.state.x} y={this.state.y} />
                </div>
            )
        }
    }
}

function Point(props) {
  return (
    <>
      横坐标：{props.x}，纵坐标：{props.y}
    </>
  );
}

function MoveDiv(props) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: "#008c8c",
        position: "absolute",
        left: props.x - 50,
        top: props.y - 50,
      }}
    ></div>
  );
}

const MousePoint = withMouseListener(Point);
const MouseDiv = withMouseListener(MoveDiv);

export default function Test() {
  return (
    <div>
      <MousePoint />
      <MouseDiv />
    </div>
  );
}
```
