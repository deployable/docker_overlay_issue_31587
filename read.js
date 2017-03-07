
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"))
const path = require('path')
const file_path = path.join(__dirname, 'file')
const loop_delay = 3000

// Read loop
function read( ms, fd, previous_buf ){
  let buf = Buffer.alloc(4096)
  return fs.readAsync(fd, buf, 0, 4096, 0).then(bytes => {
    console.log('%s read %s [%s]', Date.now(), bytes, buf.toString())
    return Promise.delay(ms).then(() => read(ms, fd, buf))
  })
}

fs.openAsync(file_path, "r").then(fd => {
  let buf = Buffer.alloc(4096)
  return read(loop_delay, fd, buf)
})
.catch(error => console.log(error))


// Docker
process.on('SIGINT', ()=> process.exit(0) )
process.on('SIGTERM', ()=> process.exit(0) )
