# Run a function in work thread

传入一个函数及对应的数据, 该函数将在worker thread执行, 并将结果以Promise方式返回给主线程.
在worker thread中执行function的简单封装, 目的时屏蔽掉worker thread库的重复写法,简化代码编写难度.

通过这种方式可以将计算密集型函数或长耗时同步处理过程,比较简单的移到工作线程中来保证主线程的持续服务.

## usage

```javascript
function f1(data){
 //do somthing with data ...
 return data * 10;
 //returns the ans or a Promise
 //同步执行的话将把运行结果作为主线程获得的结果, 异步的话请返回Promise
}

require('run-in-thread').runInThread(f1, 10).then(x=>{
  console.log(x); //will got 100
});
```

## 对函数的要求

传入的函数不要使用this, 也不要bind this, 因为子线程中的this指向为该线程对应上下文的global对象.

## 定义

``` javascript
/**
 * 将data作为参数调用fn,并异步返回结果
 * @param {Function} fn 待执行的函数, 直接传入函数引用即可, fn的格式为
 *   function fn(data={}){return data};
 * @param {Objectj} data 待执行函数的参数信息,任意格式
 * @returns Promise
 */
function runInThread(fn, data){
  return Promise.resolve();
}
```