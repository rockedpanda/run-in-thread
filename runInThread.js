const Worker = require('worker_threads').Worker;

/**
 * 将data作为参数调用fn,并异步返回结果
 * @param {Function} fn 待执行的函数, 直接传入函数引用即可, fn的格式为
 *   function fn(data={}){return data};
 * @param {Objectj} data 待执行函数的参数信息,任意格式,
 * @returns Promise
 */
function runInThread(fn, data){
  return new Promise(function(resovle, reject){
    let source = `Promise.resolve((${fn.toString()})(require('worker_threads').workerData)).then(t=>require('worker_threads').parentPort.postMessage(t))`;
    const worker = new Worker(source, {
      eval:true,
      workerData : data
    });
    worker.once('message', result =>{
      worker.terminate();
      resovle(result);
    });
    worker.on('error', err=>{
      worker.terminate();
      reject(err);
    });
  });
}

exports.runInThread = runInThread;
