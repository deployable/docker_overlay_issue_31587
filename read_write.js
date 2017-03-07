
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"))
const path = require('path')


let file_path = path.join(__dirname, 'file')
let buf = Buffer.alloc(4096)
let fdr = null
let fdw = null

fs.openAsync(file_path, "r").then(res => {
  fdr = res
  return fs.readAsync(fdr, buf, 0, 4096, 0)
}).then(res => {
  console.log('initial read: %s', buf.toString())
  return fs.openAsync(file_path, "a+")
}).then(res => {
  fdw = res
  return fs.writeAsync(fdw, Buffer.from('test3'))
}).then(res => {
  console.log('write bytes', res)
  return fs.readAsync(fdr, buf, 0, 4096, 0)
}).then(res => {
  console.log('read after write on fdr: %s', buf.toString())
  return fs.readAsync(fdw, buf, 0, 4096, 0)
}).then(res => {
  console.log('read after write on fdw: %s', buf.toString())
})
.catch(error => console.log(error))
