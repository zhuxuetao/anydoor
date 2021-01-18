const promisify = require('util').promisify
const fs = require('fs')
const path = require('path')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf-8')
const template = Handlebars.compile(source)
const config = require('../config/defaultConfig.js')
const chalk = require('chalk')
const mime = require('./mime.js')

module.exports = async (req, res, filePath) => {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const ContentType = mime(filePath)
            res.statusCode = 200
            res.setHeader('Content-type', ContentType)
            fs.createReadStream(filePath).pipe(res)
        } else  if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-type', 'text/html')
            
            const dir = path.relative(config.root, filePath)
            console.info('-----dir:')
            console.info(dir)
            const data = {
                title: path.basename(filePath),
                dir: dir,
                files
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