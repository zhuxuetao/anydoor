const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/html')

    res.write('<html>')
    res.write('<body>')    
    res.write('hello word22!')
    res.write('</body>')
    res.end('</html>')
})

server.listen(conf.port, conf.hostName, () => {
    const addr = `http://${conf.hostName}:${conf.port}`
    console.info(`Server started at${chalk.green(addr)}`)
})


