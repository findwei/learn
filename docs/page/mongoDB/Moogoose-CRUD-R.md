# 补充

1. `mongoodb`操作和`mongoose`操作对比

![image-20200601150124530](https://cdn.jsdelivr.net/gh/findwei/learnImages@main/mongoDB/image-20200601150124530.png)

1. `mongodb`的备份与恢复

```shell
# 恢复
mongorestore -d <dbname> <backupDir>
# 备份
mongodump -d <dbname> -o <backupDir>
```



# mongodb原生查询

```js
// 根据条件、投影查询指定集合，返回游标
db.<collection>.find([filter], [projection]); 
```

## 返回结果

查询返回的是一个游标对象，它类似于迭代器，可以在查询结果中进行迭代

<img src="https://cdn.jsdelivr.net/gh/findwei/learnImages@main/mongoDB/image-20200601154340434.png" alt="image-20200601154340434" style="zoom:50%;" />

`cursor`的成员：

- `next()`：游标向后移动，并返回下一个结果，如果没有结果则报错
- `hasNext()`：判断游标是否还能向后移动，返回`boolean`
- `skip(n)`：去前面的`n`条数据，**返回`cursor`**
- `limit(n)`：取当前结果的`n`条数据，**返回`cursor`**
- `sort(sortObj)`：按照指定的条件排序，**返回`cursor`**
- `count()`：得到符合`filter`的结果数量，返回`Number`
- `size()`：得到最终结果的数量，返回`Number`

由于某些函数会继续返回`cursor`，因此可以对其进行链式编程，返回`cursor`的函数成为了链中的一环，无论它们的调用顺序如何，始终按照下面的顺序执行：

```
sort -> skip -> limit
```



## 查询条件

`find`函数的第一个参数是查询条件`filter`，它的写法极其丰富，下面列举了大部分情况下我们可能使用到的写法。

```js
// 查询所有 name="曹敏" 的用户
{
  name: "曹敏" 
}

// 查询所有 loginId 以 7 结尾 并且 name 包含 敏 的用户
{
  loginId: /7$/ , 
 	name: /敏/  
}

// 查询所有 loginId 以 7 结尾 或者 name 包含 敏 的用户
{
  $or: [
    {
      loginId: /7$/,
    },
    {
      name: /敏/  
    },
  ],
}
  
// 查询所有年龄等于18 或 20 或 25 的用户
{
  age: {
    $in: [18, 20, 25]
  }
}
  
// 查询所有年龄不等于18 或 20 或 25 的用户
{
  age: {
    $nin: [18, 20, 25]
  }
}
  
// 查询所有年龄在 20~30 之间的用户
{
  age: {
    $gt: 20,
    $lt: 30
  }
}
```

查询中出现了一些特殊的属性，它以`$`开头，表达了特殊的查询含义，这些属性称之为`操作符 operator`

查询中的常用操作符包括：

- `$or`：或者
- `$and`：并且
- `$in`：在...之中
- `$nin`：不在...之中
- `$gt`：大于
- `$gte`：大于等于
- `$lt`：小于
- `$lte`：小于等于
- `$ne`：不等于



## 投影

`find`中的第二个参数`projection`表示投影，类似于`mysql`中的`select`

它是一个对象，表达了哪些字段需要投影到查询结果中，哪些不需要

```js
// 查询结果中仅包含 name、age，以及会自动包含的 _id
{
  name: 1,
  age: 1
}

// 查询结果不能包含 loginPwd、age，其他的都要包含
{
  loginPwd: 0,
  age: 0
}

// 查询结果中仅包含 name、age，不能包含_id
{
  name: 1,
  age: 1,
  _id: 0
}

// 错误：除了 _id 外，其他的字段不能混合编写
{
  name: 1,
  age: 0
}
```



# mongoose中的查询

```js
<Model>.findById(id); // 按照id查询单条数据
<Model>.findOne(filter, projection); // 根据条件和投影查询单条数据
<Model>.find(filter, projection); // 根据条件和投影查询多条数据
```

`findOne`和`find`如果没有给予回调或等待，则不会真正的进行查询，而是返回一个`DocumentQuery`对象，可以通过`DocumentQuery`对象进行链式调用进一步获取结果，直到传入了回调、等待、调用`exec`时，才会真正执行。

链式调用中包括：

- `count`
- `limit`
- `skip`
- `sort`



## 差异点

1. `count`得到的是当前结果的数量
2. 查询`id`时，使用字符串即可
3. `projection`支持字符串写法
4. `sort`支持字符串写法
5. `populate`支持关联查询