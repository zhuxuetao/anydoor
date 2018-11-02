const http = require('http');
const conf = require('./config/index');
const chalk = require('chalk');
const path = require('path');

const route = require('./helper/route');

//创建一个server
const server = http.createServer((req,res) => {
	const filePath = path.join(conf.root,req.url);
	
	route(req,res,filePath);
})

//监听
server.listen(conf.port,conf.hostname,() => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.info(`Server started at ${chalk.green(addr)}`)
})

