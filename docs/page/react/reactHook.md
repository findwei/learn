#

[toc]

# HOOK 简介

HOOK 是 React16.8.0 之后出现

组件：分为两种

1. 无状态组件（函数组件）
2. 类组件

类组件中的麻烦：

1. this 指向问题

2. 繁琐的生命周期

3. 其他问题

HOOK 专门用于**增强函数组件的功能**（HOOK 在类组件中是不能使用的），函数组件理论上可以成为类组件的替代品

官方强调：没有必要更改已经完成的类组件，官方目前没有计划取消类组件，只是鼓励使用函数组件

HOOK（钩子）本质上是一个函数(命名上总是以 use 开头)，该函数可以挂载任何功能

HOOK 种类：

1. useState
2. useEffect
3. 指定要 Hook
4. useducer
5. useContext
6. useCallback
7. useMemo
8. useRef
9. useImperativeHandle
10. useLayoutEffect
11. useDebugValue
12. 其他...
13. useSyncExternalStore

# State Hook

State Hook 是一个在函数组件中使用的函数（useState），用于在函数组件中使用状态

> 在严格模式下，React 会调用你的初始值设定项函数两次 仅开发模式才会，这是为了方便调试工具

useState

- 函数有一个参数，这个参数的值表示状态的默认值
- 函数的返回值是一个数组，该数组一定包含两项
  - 第一项：当前状态的值
  - 第二项：改变状态的函数

```jsx
// 当改变n 后重新指向app组件 执行到useState后会先去看全局表格里面有没有这个引用 如果有直接拿过来如果没有就创建
export default function App() {
  const [n, setN] = useState(0); //使用一个状态，该状态的默认值是0
  return (
    <div>
      <button
        onClick={() => {
          setN((prevN) => prevN - 1);
        }}
      >
        -
      </button>
      <span>{n}</span>
      <button
        onClick={() => {
          setN((prevN) => prevN + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
```

一个函数组件中可以有多个状态，这种做法非常有利于横向切分关注点。

**注意的细节**

1. useState 最好写到函数的起始位置，便于阅读
2. useState 严禁出现在代码块（判断、循环）中

   - 这是由于所有 useState 声明的状态变量都在一个表格（相当于数组） 他们是利用下标索引来查找的 所以不能出现在判断和循环里面
   - useState 实际上是使用了闭包的原理来实现的。在每次组件渲染时，useState 都会返回一个包含当前状态值和更新状态值的数组，这个数组的引用将一直保留在内存中。在后续的渲染中，useState 将会返回同一个数组，因此它可以实现状态的持久化，并且不会丢失之前的状态。

   ```javascript
   //useState 简化版 原理
   let lastState; // 记录上一次的 state 值
   let hookIndex = 0; // 记录当前 hook 的索引
   const hooks = []; //存储
   function useState(initialState) {
     // 在组件的首次渲染时，创建一个新的 hook
     const stateHookIndex = hookIndex++;

     // 读取上一次的 state 值
     const prevState = hooks[stateHookIndex] || initialState;

     // 将 state 存储在 hooks 数组中
     const setState = (newState) => {
       hooks[stateHookIndex] = newState;
       render();
     };

     // 记录当前 state 值
     lastState = prevState;

     // 返回当前 state 值和 setState 函数
     return [prevState, setState];
   }

   function render() {
     // 在组件渲染之前，将 hookIndex 重置为 0
     hookIndex = 0;

     // 调用组件的函数体
     const app = App();

     // 将 lastState 重置为 undefined
     lastState = undefined;

     // 将组件渲染到页面上
     ReactDOM.render(app, document.getElementById("root"));
   }
   ```

3. useState 返回的函数（数组的第二项），引用不变（节约内存空间）
4. 使用函数改变数据，若数据和之前的数据完全相等（使用 Object.is 比较），不会导致重新渲染，以达到优化效率的目的。
5. 使用函数改变数据，传入的值不会和原来的数据进行合并，而是直接替换。（**注意类组件的 setState 就是混合进去不是直接替换**）
6. 如果要实现强制刷新组件
7. 类组件：使用 forceUpdate 函数
8. 函数组件：使用一个空对象的 useState
9. **如果某些状态之间没有必然的联系，应该分化为不同的状态，而不要合并成一个对象**
10. 和类组件的状态一样，函数组件中改变状态可能是异步的（在 DOM 事件中），多个状态变化会合并以提高效率，此时，不能信任之前的状态，而应该使用回调函数的方式改变状态。如果状态变化要使用到之前的状态，尽量传递函数。

```jsx
import React, { useState } from 'react'

//
export function Comp1() {
  console.log("comp2");
  const [n, setN] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setN(n - 1);
        }}
      >
        减
      </button>
      <span>{n}</span>
     <button
        onClick={() => {
          // setN(n + 1) //不会立即改变，事件运行完成之后一起改变
          // setN(n + 1) //此时，n的值仍然是0
          setN((prevN) => prevN + 1); //传入的函数，在事件完成之后统一运行
          setN((prevN) => prevN + 1);
        }}
      >
        加
      </button>
    </div>
  );
}
export function Comp2() {
  console.log("comp2");
  const [data, setData] = useState({
    x: 1,
    y: 2,
  });
  const [, forceUpdate] = useState({});
  return (
    <div>
      <p>
        x: {data.x}，y：{data.y}
        <button
          onClick={() => {
            {
              /* 需要混入才能，引入默认是替换原来的值 如果不混入 那么y就会丢失 */
            }
            setData({
              ...data,
              x: data.x + 1,
            });
          }}
        >
          x+1
        </button>
      </p>
      <button
        onClick={() => forceUpdate();}
      >
        强制刷新
      </button>
    </div>
  );
}
```

# Effect Hook

> Effect Hook：用于在函数组件中处理副作用

useEffect 在 **更改了真实 DOM，并且用户已经看到了 UI 更新** **异步执行** 传入的用于处理副作用的函数

副作用：

1. ajax 请求
2. 计时器
3. 其他异步操作
4. 更改真实 DOM 对象
5. 本地存储
6. 其他会对外部产生影响的操作

函数：useEffect，该函数接收一个函数作为参数，接收的函数就是需要进行副作用操作的函数

**细节**

1. 副作用函数的运行时间点，是在页面完成真实的 UI 渲染之后。因此它的执行是异步的，并且不会阻塞浏览器
   1. 与类组件中 componentDidMount 和 componentDidUpdate 的区别
   2. componentDidMount 和 componentDidUpdate，**更改了真实 DOM，但是用户还没有看到 UI 更新**，**同步的**。
   3. useEffect 中的副作用函数，**更改了真实 DOM，并且用户已经看到了 UI 更新**，**异步的**。
2. 每个函数组件中，可以多次使用 useEffect，但**不要放入判断或循环等代码块中**。
3. useEffect 中的副作用函数，可以有返回值，返回值必须是一个函数，该函数叫做清理函数
   1. 该函数运行时间点，在每次运行副作用函数之前
   2. 首次渲染组件不会运行
   3. 组件被销毁时一定会运行
4. useEffect 函数，可以传递第二个参数
   1. 第二个参数是一个数组
   2. 数组中记录该副作用的依赖数据
   3. 当组件重新渲染后，只有依赖数据与上一次不一样的时，才会执行副作用
   4. 所以，当传递了依赖数据之后，如果数据没有发生变化
      1. 副作用函数仅在第一次渲染后运行
      2. 清理函数仅在卸载组件后运行
5. 副作用函数中，如果使用了函数上下文中的变量，则由于闭包的影响，会导致副作用函数中变量不会实时变化。
6. 副作用函数在每次注册时，会覆盖掉之前的副作用函数，因此，尽量保持副作用函数稳定，否则控制起来会比较复杂。

```jsx
import React, { useState, useEffect } from "react";
//
function Test() {
  useEffect(() => {
    console.log("副作用函数，仅挂载时运行一次");
    return () => {
      console.log("清理函数，仅卸载时运行一次");
    };
  }, []); //使用空数组作为依赖项，则副作用函数仅在挂载的时候运行。 如果不写依赖项这个参数，则每次都运行。
  console.log("渲染组件");
  const [, forceUpdate] = useState({});

  return (
    <h1>
      Test组件{" "}
      <button
        onClick={() => {
          forceUpdate({});
        }}
      >
        刷新组件
      </button>
    </h1>
  );
}

// 这是一个倒计时10秒的效果
export function App() {
  const [n, setN] = useState(10);
  useEffect(() => {
    if (n === 0) {
      return;
    }
    //某一次渲染完成后，需要根据当前n的值，1秒后重新渲染
    const timer = setTimeout(() => {
      setN(n - 1);
    }, 1000);
    // 返回清理函数  只能返回函数
    return () => {
      clearTimeout(timer);
    };
  }, [n]); //依赖n n改变了才会执行 如果setN相同的值 是不会执行 相当于没改变
  return (
    <div>
      <h1>{n}</h1>
      <button
        onClick={() => {
          setN(n + 1);
        }}
      >
        n+1
      </button>
    </div>
  );
}

// 移动方块
export function Comp2() {
  console.log("comp2");
  const [point, setPoint] = useState({
    x: 300,
    y: 500,
  });
  const [move, setMove] = useState(false);
  const ref = React.createRef();
  useEffect(() => {
    console.log("useEffect", move);
    if (move === false) {
      return;
    }
    // 移动的次数
    let count = 0;
    // 每次移动多少
    const left = point.x / 100;
    const top = point.y / 100;
    // 移动
    const timer = setInterval(() => {
      count++;
      ref.current.style.left = count * left + "px";
      ref.current.style.top = count * top + "px";
      if (count === 100) {
        clearInterval(timer);
        setMove(false);
      }
    }, 10);
    return () => {
      clearInterval(timer);
      setMove(false);
    };
  }, [move]); //依赖move move改变移动方块
  return (
    <div>
      x:
      <input
        type="number"
        value={point.x}
        onChange={(e) => {
          setPoint({
            ...point,
            x: e.target.value,
          });
        }}
      />
      y:
      <input
        type="number"
        value={point.y}
        onChange={(e) => {
          setPoint({
            ...point,
            y: e.target.value,
          });
        }}
      /> <button
        onClick={() => {
          setMove(true);
        }}
      >
        移动
      </button>
      {/* 移动的方块 */}
      <div
        ref={ref}
        style={{
          width: "100px",
          height: "100px",
          position: "fixed",
          left: "100px",
          top: "200px",
          background: "#f40",
        }}
      ></div>
    </div>
  );
}
```

# 自定义 Hook

State Hook： useState
Effect Hook：useEffect

自定义 Hook：将一些常用的、跨越多个组件的 Hook 功能，抽离出去形成一个函数，该函数就是自定义 Hook，自定义 Hook，由于其内部需要使用 Hook 功能，所以它本身也需要按照 Hook 的规则实现：

自定义 Hook **允许您共享有状态逻辑**，但**不能共享状态本身**。对 Hook 的每次调用都完全独立于对同一 Hook 的所有其他调用

1. Hook 函数名必须以 use 开头
2. 调用自定义 Hook 函数时，应该放到顶层

例如：

1. 很多组件都需要在第一次加载完成后，获取数据
2. 很多组件都需要在第一次加载完成后，启动一个计时器，然后在组件销毁时卸载
3. 第一次加载判断网络状态

> 使用 Hook 的时候，如果没有严格按照 Hook 的规则进行，eslint 的一个插件（eslint-plugin-react-hooks）会报出警告

使用高阶组件一样可以达到上面效果 但是使用 HOOK 更加容易理解和阅读

```jsx
/* eslint "react-hooks/exhaustive-deps": "off" */
import { useEffect } from "react";

/**
 * 组件首次渲染后，启动一个Interval计时器
 * 组件卸载后，清除该计时器
 */
export function useTimer (func, duration) {
  useEffect(() => {
    const timer = setInterval(func, duration);
    return () => {
      clearInterval(timer);
    };
  }, []);
};
// 使用useTimer 自定义hooks
import React, { useState } from 'react'
import {useTimer} from "./myHooks/useTimer"
function Test(props) {
    useTimer(() => {
        console.log("Test组件的一些副作用操作")
    }, 1000);
    return <h1>Test组件</h1>
}
export  function App() {
    const [visible, setVisible] = useState(true)
    return (
        <div>
            {
               visible && <Test />
            }
            <button onClick={()=>{
                setVisible(!visible);
            }}>隐藏/显示</button>
        </div>
    )
}


// 自定义hook  加载获取数据
import { useEffect, useState } from "react"
import { getStudents } from "../services/student" //api
/**
 * 根据页码和页容量获取学生数据，得到一个响应结果
 * 并且，当页码和页容量变化时，将重新获取学生数据
 */
export default function useAllStudents(page = 1, limit = 10) {
    const [resp, setResp] = useState()
    useEffect(() => {
        (async () => {
            const resp = await getStudents(page, limit);
            setResp(resp);
        })();
    }, [page, limit])
    return resp;
}

// 使用高阶组件实现================
import React from 'react'
import { getAllStudents } from "./services/student"
// 这个高阶组件用于获取学生数据
function withAllStudents(Comp) {
    return class AllStudentsWrapper extends React.Component {
        state = {
            stus: []
        }
        async componentDidMount() {
            // 请求数据
            const stus = await getAllStudents();
            this.setState({
                stus
            })
        }
        render() {
            return <Comp {...this.props} stus={this.state.stus} />
        }

    }
}
// 渲染列表组件
function Test(props) {
    const list = props.stus.map(it => <li key={it.id}>{it.name}</li>)
    return <ul>
        {list}
    </ul>
}
const TestStudents = withAllStudents(Test)

export default function App() {
    return (
        <div>
            <TestStudents />
        </div>
    )
}
// 函数传入的方式=================
import React from 'react'
import { getAllStudents } from "./services/student"
//这个组件用于获取数据
class AllStudents extends React.Component {

    state = {
        stus: []
    }
    async componentDidMount() {
        const stus = await getAllStudents();
        this.setState({
            stus
        })
    }
    render() {
        if (typeof this.props.render === "function") {
            return this.props.render(this.state.stus);
        }
        return null;
    }
}
function Test(props) {
    const list = props.stus.map(it => <li key={it.id}>{it.name}</li>)
    return <ul>
        {list}
    </ul>
}
export default function App() {
    return (
        <div>
            <AllStudents render={stus => <Test stus={stus} />} />
        </div>
    )
}

```

# Reducer Hook

Flux：Facebook 出品的一个数据流框架

和 vuex 大同小异

1. 规定了数据是单向流动的
2. 数据存储在数据仓库中（目前，可以认为 state 就是一个存储数据的仓库）
3. action 是改变数据的唯一原因（本质上就是一个对象，action 有两个属性）
   1. type：字符串，动作的类型
   2. payload：任意类型，动作发生后的附加信息
   3. 例如，如果是添加一个学生，action 可以描述为：
      1. `{ type:"addStudent", payload: {学生对象的各种信息} }`
   4. 例如，如果要删除一个学生，action 可以描述为：
      1. `{ type:"deleteStudent", payload: 学生id }`
4. 具体改变数据的是一个函数，该函数叫做 reducer
   1. 该函数接收两个参数
      1. state：表示当前数据仓库中的数据
      2. action：描述了如何去改变数据，以及改变数据的一些附加信息
   2. 该函数必须有一个返回结果，用于表示数据仓库变化之后的数据
      1. Flux 要求，对象是不可变的，如果返回对象，必须创建新的对象
   3. reducer 必须是纯函数，不能有任何副作用
5. 如果要触发 reducer，不可以直接调用，而是应该调用一个辅助函数 dispatch
   1. 该函数仅接收一个参数：action
   2. 该函数会间接去调用 reducer，以达到改变数据的目的

```jsx
import { useState } from "react"
/**
 * 通用的useReducer函数
 * @param {function} reducer reducer函数，标准格式
 * @param {any} initialState 初始状态
 * @param {function} initFunc 用于计算初始值的函数
 */
export default function useReducer(reducer, initialState, initFunc) {
    const [state, setState] = useState(initFunc? initFunc(initialState): initialState)

    function dispatch(action) {
        const newState = reducer(state, action)
        console.log(`日志：n的值  ${state}->${newState}`)
        setState(newState);
    }

    return [state, dispatch];
}
import React from "react"
import useReducer from "./useReducer"

/**
 * 该函数，根据当前的数据，已经action，生成一个新的数据
 * @param {*} state
 * @param {*} action
 */
function reducer(state, action) {
    switch (action.type) {
        case "increase":
            return state + 1;
        case "decrease":
            if (state === 0) {
                return 0;
            }
            return state - 1;
        default:
            return state;
    }
}
export default function App() {
    const [n, dispatch] = useReducer(reducer, 10, (args) => {
        console.log(args)
        return 100
    });
    return (
        <div>
            <button onClick={() => {
                dispatch({ type: "decrease" })
            }}>-</button>
            <span>{n}</span>
            <button onClick={() => {
                dispatch({ type: "increase" })
            }}>+</button>
        </div>
    )
}

```

# Context Hook

用于获取上下文数据

```js
import React, { useContext } from "react";
const ctx = React.createContext();
// 使用react元素的形式
function Test() {
  return (
    <ctx.Consumer>{(value) => <h1>Test，上下文的值：{value}</h1>}</ctx.Consumer>
  );
}
// 使用Hook的形式
function Test1() {
  const value = useContext(ctx);
  return <h1>Test，上下文的值：{value}</h1>;
}

export default function App() {
  return (
    <div>
      <ctx.Provider value="abc">
        <Test />
        <Test1 />
      </ctx.Provider>
    </div>
  );
}
```

# Callback Hook

函数名：useCallback

用于得到一个固定引用值的函数，通常用它进行性能优化

useCallback:

该函数有两个参数：

1. 函数，useCallback 会固定该函数的引用，只要依赖项没有发生变化，则始终返回之前函数的地址
2. 数组，记录依赖项

该函数返回：引用相对固定的函数地址

```jsx
import React, { useState, useCallback } from "react";
// 这是一个纯组件
class Test extends React.PureComponent {
  render() {
    console.log("Test Render");
    return (
      <div>
        <h1>{this.props.text}</h1>
        <button onClick={this.props.onClick}>改变文本</button>
      </div>
    );
  }
}
//  这是一个纯组件
class Test1 extends React.PureComponent {
  render() {
    console.log("Test1 Render");
    return (
      <div>
        <h1>{this.props.text}</h1>
        <button onClick={this.props.onClick}>改变文本</button>
      </div>
    );
  }
}
function Parent() {
  console.log("Parent Render");
  const [txt, setTxt] = useState(123);
  const [n, setN] = useState(0);
  const handleClick = useCallback(() => {
    setTxt(txt + 1);
  }, [txt]); //只有改变了txt这个值才会改变引用地址
  return (
    <div>
      {/* 函数的地址每次渲染都发生了变化，
      导致了子组件跟着重新渲染，
      若子组件是经过优化的组件，则可能导致优化失效 */}
      <Test
        text={txt}
        onClick={() => {
          {
            /* 这个箭头函数每次渲染都是一个新的箭头函数 地址发生了变化 ,当更改下面input里面的值重新渲染Parent这个组件的时候 Test虽然做了优化是纯组件 但是由于这个箭头函数地址有变化还是会重新渲染Test组件*/
          }
          setTxt(Math.random());
        }}
      />
      {/* 这个组件不会每次都渲染 应该handleClick函数一直使用的一个地址 */}
      <Test1 text={txt} onClick={handleClick} />
      {/* 更改这个input Test重新渲染了 Test1不会重新渲染 */}
      <input
        type="number"
        value={n}
        onChange={(e) => {
          setN(parseInt(e.target.value));
        }}
      />
    </div>
  );
}
export default function App() {
  return (
    <div>
      <Parent />
    </div>
  );
}
```

# Memo Hook

用于保持一些比较稳定的数据，通常用于性能优化

和 useCallback hook 差不多

**如果 React 元素本身的引用没有发生变化，一定不会重新渲染**

```jsx
import React, { useState, useMemo } from "react";

function Item(props) {
  console.log("Item Render " + props.value);
  return <li>{props.value}</li>;
}

export default function App() {
  const [range] = useState({ min: 1, max: 10000 });
  const [n, setN] = useState(0);
  const list = useMemo(() => {
    const list = [];
    for (let i = range.min; i <= range.max; i++) {
      list.push(<Item key={i} value={i}></Item>);
    }
    return list;
  }, [range.min, range.max]); //只有min max更改后list才会重新渲染

  // n值更改后 list会重新渲染的 因为重新执行函数 list是新生成的
  // const list = [];
  // for (let i = range.min; i <= range.max; i++) {
  //     list.push(<Item key={i} value={i}></Item>)
  // }
  return (
    <div>
      <ul>{list}</ul>
      {/* 当使用useMemo 后n值更改后 list是不会重新渲染的 是读取的之前的值 */}
      <input
        type="number"
        value={n}
        onChange={(e) => {
          setN(parseInt(e.target.value));
        }}
      />
    </div>
  );
}
```

# Ref Hook

useRef 函数：

1. 只有一个参数：默认值
2. 返回一个固定的对象，`{current: 值}`

注意

1. 您可以更改属性。与状态不同，它是可变的。但是，如果它包含用于呈现的对象（例如，状态的一部分），则不应更改该对象。ref.current
2. 当你改变属性时，React **不会重新渲染**你的组件。React 不知道你什么时候更改它，因为 ref 是一个普通的 JavaScript 对象。ref.current
3. 在渲染期间不要写入或读取，初始化除外。这使得组件的行为不可预测。ref.current
4. 在严格模式下，React 会调用你的组件函数两次，以帮助你找到意外的杂质。这是仅开发行为，不会影响生产。每个 ref 对象将被创建两次，但其中一个版本将被丢弃。如果您的组件函数是纯函数（应该是纯函数），这应该不会影响行为。

```jsx
//
import React, { useState, useRef } from 'react'
export default function App() {
    const inpRef = useRef(); //用于存储值得
    const [n, setN] = useState(0)
    return (
        <div>
            <input ref={inpRef} type="text" />
            <button onClick={() => {
                console.log(inpRef.current.value)
            }}>得到input的值</button>

            <input type="number"
                value={n}
                onChange={e => {
                    setN(e.target.value)
                }} />
        </div>
    )
}
//
import React, { useState, useRef, useEffect } from 'react'
export default function App() {
    const [n, setN] = useState(10)
    const nRef = useRef(n); // {current:10}   这里不适用ref也行 let nC = n  这里只是需要一个变量  但是使用ref是最好每次都是同一个引用地址
    // 这里需要使用ref 为什么不能直接用n 因为在useEffect第一次执行得时候拿到得n 是10  setN执行后 重新执行app组件 是一个新得作用域了 定时器里面得n一直是第一次得值 10
    useEffect(() => { //这里没有依赖性只在第一次运行时执行，所以里面拿到的作用域 也是第一次的
        const timer = setInterval(() => {
            nRef.current--;
            setN(nRef.current);
            if(nRef.current === 0){
                clearInterval(timer);
            }
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])
    return (
        <div>
            <h1>{n}</h1>
        </div>
    )
}
// 重要事情说三遍
// 这是上面效果得 ======错误示例======
// 这是上面效果得 ======错误示例======
// 这是上面效果得 ======错误示例======
export function App1() {
    const [n, setN] = useState(10)
    useEffect(() => {
        console.log('useEffect')
        const timer = setInterval(() => {
            console.log(n) //10 拿到得是第一次加载得n 一直是用得这个n
            setN(n - 1)  //修改后 重新执行app1 是一个新得作用域了 所以定时器下次执行 还是用的第一次的作用域 这里得n还是10 所以相当于一直在设置 setN(9)
            if (n === 0) { //n永远等于10 定时器不可能进入这里面
                clearInterval(timer);
            }
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, []) // 这里依赖为空 说明只有第一次加载执行 后面重新渲染App1 会在缓存里面取 不会在执行里面的副作用函数了
    return (
        <div>
            <h1>{n}</h1>
        </div>
    )
}
```

# ImperativeHandle Hook

函数：`useImperativeHandleHook(ref, createHandle, dependencies?)`

向父组件暴露一个自定义的 ref 句柄

- ref：该 ref 是你从 forwardRef 渲染函数 中获得的第二个参数。
- createHandle：该函数无需参数，它返回你想要暴露的 ref 的句柄。该句柄可以包含任何类型。通常，你会返回一个包含你想暴露的方法的对象。
- 可选的 dependencies：函数 createHandle 代码中所用到的所有反应式的值的列表。反应式的值包含 props、状态和其他所有直接在你组件体内声明的变量和函数。倘若你的代码检查器已 为 React 配置好，它会验证每一个反应式的值是否被正确指定为依赖项。该列表的长度必须是一个常数项，并且必须按照 [dep1, dep2, dep3] 的形式罗列各依赖项。React 会使用 Object.is 来比较每一个依赖项与其对应的之前值。如果一次重新渲染导致某些依赖项发生了改变，或你没有提供这个参数列表，你的函数 createHandle 将会被重新执行，而新生成的句柄则会被分配给 ref。

```tsx
import { forwardRef, useImperativeHandle } from "react";
const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        // 这里写你要暴露给父组件东西
      };
    },
    []
  );

  return <input {...props} />;
});
```

# LayoutEffect Hook

useEffect：浏览器渲染完成后，用户看到新的渲染结果之后 执行
useLayoutEffectHook：完成了虚拟DOM改动，但还没有呈现给用户 执行

应该尽量使用useEffect，因为它不会导致渲染阻塞，如果出现了问题，再考虑使用useLayoutEffectHook

# DebugValue Hook

useDebugValue：用于将自定义Hook的关联数据显示到调试栏

如果创建的自定义Hook通用性比较高，可以选择使用useDebugValue方便调试

