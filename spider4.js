var http=require('http');
var fs=require('fs');
var Url=require('url');


var nowUrl=Url.parse('http://nodejs.cn/download/?username=lihaohua&password=123456')
console.log(nowUrl);
var hostname=nowUrl.hostname;
var pathname=nowUrl.path;

//createServer用于创建服务器
//request用于访问服务器
var req=http.request({
	hostname:hostname,//域名
	path:pathname//路径
},res=>{
	var arr=[];
	var str='';
	res.on('data',function(data){
		arr.push(data);
		str+=data;
	})
	res.on('end',function(){
		//使用异步写文件的时候需要设置回调函数，否则node命令行里面会出现警告
		fs.writeFile('down1.html',arr,'utf-8',function(){
//			console.log('文件创建完成');
		});
		fs.writeFile('down2.html',str,'utf-8',function(){
//			console.log('文件down1创建完成');
		});
	})
});
req.end();//结束访问，否则浏览器会一直是等待结束状态，而不能操作数据

