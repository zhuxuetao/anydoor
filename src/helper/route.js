const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/index');
const tplpath = path.join(__dirname, '../template/dir.tpl');
//获取path信息
const source = fs.readFileSync(tplpath);
const template = Handlebars.compile(source.toString());
const mime = require('./mime');
//引用定义压缩方法 return
const compress = require('./compress');


module.exports = async function(req, res, filePath) {
    try {
        //fs 文件系统
        const stats = await stat(filePath);
        //判断是否为文件
        if (stats.isFile()) {
            res.statusCode = 200;
            //识别文件后缀名   对应给出Content-type 类型
            const contentType = mime(filePath);
            console.info('-------' + contentType);
            res.setHeader("Conetnt-Type", contentType);
            //createReadStream获取数据流 pipe 获取多少展示多少
            let rs = fs.createReadStream(filePath);

            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) { //判断是否为目录
            //readdir读取目录内容
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader("Conetnt-Type", 'text/plain');
            // path.relative() 方法返回从 from 到 to 的相对路径（基于当前工作目录）。 如果 from 和 to 各自解析到同一路径（调用 path.resolve()），则返回一个长度为零的字符串。
            const dir = path.relative(config.root, filePath);
            // 例如:
            //path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
            // 返回: '../../impl/bbb'

            let iConType = null;
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '', //dir 判断是因为path.relative如果在根目录会反回空因此添加判断
                files: files.map(file => {
                    iConType = mime(file);
                    if (!iConType) {
                        iConType = 'text/plain';
                    }
                    return {
                        file,
                        icon: iConType
                    }
                })
            }
            res.end(template(data));
        }
    } catch (ex) {
        res.statusCode = 404;
        res.setHeader("Conetnt-Type", "text/plain");
        res.end(`404!!!\n${ex}`)
    }
}