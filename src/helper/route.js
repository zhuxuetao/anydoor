const promisify = require('util').promisify
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf-8')
const template = Handlebars.compile(source)
const config = require('../config/defaultConfig.js')
const mime = require('./mime.js')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

module.exports = async (req, res, filePath) => {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const ContentType = mime(filePath)
            res.setHeader('Content-type', ContentType)
            
            if (isFresh(stats, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }
            
            const {code, start, end} = range(stats.size, req, res)
            let rs
            if (code == 200) {
                res.statusCode = 200
                rs = fs.createReadStream(filePath)
            } else {                
                res.statusCode = 206
                rs = fs.createReadStream(filePath, {start, end})
            }                        
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res)
            }            
            rs.pipe(res)
        } else  if (stats.isDirectory()) {
            const files = await readdir(filePath)
            let directoryType = []
            files.forEach(item => {
                directoryType.push({
                    type: path.extname(item) ? true : false,
                    file: item
                })
            })
            res.statusCode = 200
            res.setHeader('Content-type', 'text/html')            
            const dir = path.relative(config.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files,
                directoryType
            }
            res.end(template(data))
        }
    } catch (e) {
        console.error(e)
        res.statusCode = 404
        res.setHeader('Content-type', 'text/plain')
        res.end(`${filePath} is not a directory or file\n ${e.toString()}`)
    }
}