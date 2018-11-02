const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir); 

module.exports = async function(req,res,filePath){
	try{
		//fs 文件系统
		const stats = await stat(filePath);
		//判断是否为文件
		if(stats.isFile()){
			res.statusCode = 200;
			res.setHeader("Conetnt-Type","text/plain");
			//createReadStream获取数据流 pipe 获取多少展示多少
			fs.createReadStream(filePath).pipe(res);
		}else if(stats.isDirectory()){ //判断是否为目录
			//readdir读取目录内容
			fs.readdir(filePath,(err,files) => {
				res.statusCode = 200;
				res.setHeader("Conetnt-Type","text/plain");
				res.end(files.join(','));
			})

		}
	}catch(ex){
		res.statusCode = 404;
		res.setHeader("Conetnt-Type","text/plain");
		res.end(`404!!!\n${ex}`)
	}
}