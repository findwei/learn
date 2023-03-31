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

# Portals

插槽：将一个 React 元素渲染到指定的 DOM 容器中

这个插槽与 vue 的插槽**不是一个概念**，vue 的插槽在 react 里面相当于就是属性传递值 默认传递的属性是 children

ReactDOM.createPortal(React 元素, 真实的 DOM 容器)，该函数返回一个 React 元素

**注意事件冒泡**

1. React 中的事件是包装过的
2. 它的事件冒泡是根据虚拟 DOM 树来冒泡的，与真实的 DOM 树无关。

**见下面 React中的事件标题**


# 错误边界

默认情况下，若一个组件在**渲染期间**（render）发生错误，会导致整个组件树全部被卸载

错误边界：是一个组件，该组件会捕获到渲染期间（render）子组件发生的错误，并有能力阻止错误继续传播

**让某个组件捕获错误**

1. 编写生命周期函数 getDerivedStateFromError
   1. 静态函数
   2. 运行时间点：渲染子组件的过程中，发生错误之后，在更新页面之前
   3. **注意：只有子组件发生错误，才会运行该函数**
   4. 该函数返回一个对象，React会将该对象的属性覆盖掉当前组件的state
   5. 参数：错误对象
   6. 通常，该函数用于改变状态
2. 编写生命周期函数 componentDidCatch
   1. 实例方法
   2. 运行时间点：渲染子组件的过程中，发生错误，更新页面之后，由于其运行时间点比较靠后，因此不太会在该函数中改变状态
   3. 通常，该函数用于记录错误消息


**细节**

某些错误，错误边界组件无法捕获

1. 自身的错误
2. 异步的错误
3. 事件中的错误
4. 服务端渲染

总结：仅处理渲染子组件期间的同步错误

```javascript
import React, { PureComponent } from "react";
export default class ErrorBound extends PureComponent {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    console.log("发生错误了");
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log("记录错误信息");
  }
  render() {
    if (this.state.hasError) {
      return <h1>发生错误了！</h1>;
    }
    return this.props.children;
  }
}
```

# React 中的事件

这里的事件：React 内置的 DOM 组件中的事件

1. 给 document 注册事件
2. 几乎所有的元素的事件处理，均在 document 的事件中处理
   1. 一些不冒泡的事件，是直接在元素上监听
   2. 一些 document 上面没有的事件，直接在元素上监听
3. 在 document 的事件处理，React 会根据虚拟 DOM 树的完成事件函数的调用
4. React 的事件参数，并非真实的 DOM 事件参数，是 React 合成的一个对象，该对象类似于真实 DOM 的事件参数
   1. stopPropagation，阻止事件在虚拟 DOM 树中冒泡
   2. nativeEvent，可以得到真实的 DOM 事件对象
   3. 为了提高执行效率，React 使用事件对象池来处理事件对象 （React 17 不在使用事件池）

**注意事项**

1. 如果给真实的 DOM 注册事件，阻止了事件冒泡，则会导致 react 的相应事件无法触发
2. 如果给真实的 DOM 注册事件，事件会先于 React 事件运行
3. 通过 React 的事件中阻止事件冒泡，无法阻止真实的 DOM 事件冒泡
4. 可以通过 nativeEvent.stopImmediatePropagation()，阻止 document 上剩余事件的执行
5. 在事件处理程序中，不要异步的使用事件对象，如果一定要使用，需要调用 persist 函数


# 渲染原理

渲染：生成用于显示的对象，以及将这些对象形成真实的DOM对象（按照下面三步顺序）

1. React元素：React Element，通过React.createElement创建（语法糖：JSX）React元素（本质就是）js对象
  - 例如：
  - ```<div><h1>标题</h1></div>```
  - ```<App />```
2. React节点：专门用于渲染到UI界面的对象，React会通过React元素，创建React节点，ReactDOM一定是通过React节点来进行渲染的
    - 节点类型：
        - React DOM节点：创建该节点的React元素类型是一个字符串
        - React 组件节点：创建该节点的React元素类型是一个函数或是一个类
        - React 文本节点：由字符串、数字创建的
        - React 空节点：由null、undefined、false、true
        - React 数组节点：该节点由一个数组创建
3. 真实DOM：通过document.createElement创建的dom元素

![](./img/2019-07-25-13-51-08.png)

## 首次渲染(新节点渲染)

1. 通过参数的值创建节点,这里的参数是必须能创建react节点的参数 `ReactDOM.render(<App/>, document.getElementById('root'))`
2. 根据不同的节点，做不同的事情
   1. 文本节点：通过document.createTextNode创建真实的文本节点
   2. 空节点：什么都不做
   3. 数组节点：遍历数组，将数组每一项递归创建节点（回到第1步进行反复操作，直到遍历结束）
   4. DOM节点：通过document.createElement创建真实的DOM对象，然后立即设置该真实DOM元素的各种属性，然后遍历对应React元素的children属性，递归操作（回到第1步进行反复操作，直到遍历结束）
   5. 组件节点
      1. 函数组件：调用函数(该函数必须返回一个可以生成节点的内容)，将该函数的返回结果递归生成节点（回到第1步进行反复操作，直到遍历结束）
      2. 类组件：
         1. 创建该类的实例
         2. 立即调用对象的生命周期方法：static getDerivedStateFromProps
         3. 运行该对象的render方法，拿到节点对象（将该节点递归操作，回到第1步进行反复操作）
         4. 将该组件的componentDidMount加入到执行队列（先进先出，先进先执行），当整个虚拟DOM树全部构建完毕，并且将真实的DOM对象加入到容器中后，执行该队列
3. 生成出虚拟DOM树之后，将该树保存起来，以便后续使用
4. 将之前生成的真实的DOM对象，加入到容器中。

```js
const app = <div className="assaf">
    <h1>
        标题
        {["abc", null, <p>段落</p>]}
    </h1>
    <p>
        {undefined}
    </p>
</div>;
ReactDOM.render(app, document.getElementById('root'));
```

以上代码生成的虚拟DOM树：

![](./img/2019-07-25-14-17-04.png)


```js

function Comp1(props) {
    return <h1>Comp1 {props.n}</h1>
}

function App(props) {
    return (
        <div>
            <Comp1 n={5} />
        </div>
    )
}

const app = <App />;
ReactDOM.render(app, document.getElementById('root'));
```

以上代码生成的虚拟DOM树：

![](./img/2019-07-25-14-49-53.png)


```js
class Comp1 extends React.Component {
    render() {
        return (
            <h1>Comp1</h1>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Comp1 />
            </div>
        )
    }
}

const app = <App />;
ReactDOM.render(app, document.getElementById('root'));
```

以上代码生成的虚拟DOM树：

![](./img/2019-07-25-14-56-35.png)



## 更新节点

更新的场景：

1. 重新调用ReactDOM.render，触发根节点更新
2. 在类组件的实例对象中调用setState，会导致该实例所在的节点更新

**节点的更新**

- 如果调用的是ReactDOM.render，进入根节点的**对比（diff算法）更新**
- 如果调用的是setState
  - 1. 运行生命周期函数，static getDerivedStateFromProps
  - 2. 运行shouldComponentUpdate，如果该函数返回false，终止当前流程 
  - 3. 运行render，得到一个新的节点，进入该新的节点的**对比更新**
  - 4. 将生命周期函数getSnapshotBeforeUpdate加入执行队列，以待将来执行
  - 5. 将生命周期函数componentDidUpdate加入执行队列，以待将来执行
 
后续步骤：
1. 更新虚拟DOM树
2. 完成真实的DOM更新
3. 依次调用执行队列中的componentDidMount
4. 依次调用执行队列中的getSnapshotBeforeUpdate
5. 依次调用执行队列中的componentDidUpdate


### 对比更新

将新产生的节点，对比之前虚拟DOM中的节点，发现差异，完成更新

问题：对比之前DOM树中哪个节点

React为了提高对比效率，做出以下假设

1. 假设节点不会出现层次的移动（对比时，直接找到旧树中对应位置的节点进行对比）
2. 不同的节点类型会生成不同的结构
   1. 相同的节点类型：节点本身类型相同，如果是由React元素生成，type值还必须一致
   2. 其他的，都属于不相同的节点类型
3. 多个兄弟通过唯一标识（key）来确定对比的新节点

key值的作用：用于通过旧节点，寻找对应的新节点，如果某个旧节点有key值，则其更新时，会寻找相同层级中的相同key值的节点，进行对比。

**key值应该在一个范围内唯一（兄弟节点中），并且应该保持稳定**

#### 找到了对比的目标

判断节点类型是否一致


- **一致**

根据不同的节点类型，做不同的事情

**空节点**：不做任何事情

**DOM节点**：
1. 直接重用之前的真实DOM对象
2. 将其属性的变化记录下来，以待将来统一完成更新（现在不会真正的变化）
3. 遍历该新的React元素的子元素，**递归对比更新**


**文本节点**：
1. 直接重用之前的真实DOM对象
2. 将新的文本变化记录下来，将来统一完成更新

**组件节点**：

**函数组件**：重新调用函数，得到一个节点对象，进入**递归对比更新**

**类组件**：

1. 重用之前的实例
2. 调用生命周期方法getDerivedStateFromProps
3. 调用生命周期方法shouldComponentUpdate，若该方法返回false，终止
4. 运行render，得到新的节点对象，进入**递归对比更新**
5. 将该对象的getSnapshotBeforeUpdate加入队列
6. 将该对象的componentDidUpdate加入队列

**数组节点**：遍历数组进行**递归对比更新**

- **不一致**

整体上，卸载旧的节点，全新创建新的节点

**创建新节点**

进入新节点的挂载流程

**卸载旧节点**

1. **文本节点、DOM节点、数组节点、空节点、函数组件节点**：直接放弃该节点，如果节点有子节点，递归卸载节点
2. **类组件节点**：
   1. 直接放弃该节点
   2. 调用该节点的componentWillUnMount函数
   3. 递归卸载子节点


#### 没有找到对比的目标

新的DOM树中有节点被删除

新的DOM树中有节点添加

- 创建新加入的节点
- 卸载多余的旧节点


# 工具

## 严格模式

StrictMode(```React.StrictMode```)，本质是一个组件，该组件不进行UI渲染。（```React.Fragment 简写 <> </>```），它的作用是，在渲染内部组件时，发现不合适的代码。

- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
  - React要求，副作用代码仅出现在以下生命周期函数中
  - 1. ComponentDidMount
  - 2. ComponentDidUpdate
  - 3. ComponentWillUnMount

副作用：一个函数中，做了一些会影响函数外部数据的事情，例如：

1. 异步处理
2. 改变参数值
3. setState
4. 本地存储
5. 改变函数外部的变量

相反的，如果一个函数没有副作用，则可以认为该函数是一个纯函数

在严格模式下，虽然不能监控到具体的副作用代码，但它会将不能具有副作用的函数调用两遍，以便发现问题。（这种情况，仅在开发模式下有效）

- 检测过时的 context API

## Profiler

性能分析工具

分析某一次或多次提交（更新），涉及到的组件的渲染时间

火焰图：得到某一次提交，每个组件总的渲染时间以及自身的渲染时间

排序图：得到某一次提交，每个组件自身渲染时间的排序

组件图：某一个组件，在多次提交中，自身渲染花费的时间