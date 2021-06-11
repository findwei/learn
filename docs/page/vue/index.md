# vue
**Vue最核心的三部分：**
即：compiler、reactivity、runtime。
1. compiler 表示template编译成有规律的数据结构，即AST抽象语法树。
2. reactivity 表示data数据可以被监控，通过proxy语法来实现。
3. runtime 表示运行时相关功能，虚拟DOM(即：VNode)、diff算法、真实DOM操作等。

vue render实现是借鉴snabbdom
