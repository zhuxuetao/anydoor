const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')
const path = require("path")
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server {
    constructor (config) {
        console.info('-------config:')
        console.info(config)
        this.conf = Object.assign({}, conf, config)
    }
    start () {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url)
            route(req, res, filePath, this.conf)
        })
        
        server.listen(this.conf.port, this.conf.hostName, () => {
            const addr = `http://${this.conf.hostName}:${this.conf.port}`
            console.info(`Server started at${chalk.green(addr)}`)
            console.info(`父进程的 pid 是 ${process.ppid}`)
            openUrl(addr)
        })
    }
}
module.exports = Server