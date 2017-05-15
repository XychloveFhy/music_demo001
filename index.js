var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var template = require('art-template');
var formidable = require('formidable');
var util = require('util');

var server = http.createServer();
var arr = [
    {
        "id": 1,
        "title": "富士山下",
        "singer": "陈奕迅",
        "music": "陈奕迅 - 富士山下.mp3",
        "poster": "陈奕迅.jpg"
    },
    {
        "id": 2,
        "title": "石头记",
        "singer": "达明一派",
        "music": "达明一派 - 石头记.mp3",
        "poster": "达明一派.jpg"
    },
    {
        "id": 3,
        "title": "青城山下白素贞",
        "singer": "好妹妹乐队",
        "music": "好妹妹乐队 - 青城山下白素贞.mp3",
        "poster": "好妹妹乐队.jpg"
    },
    {
        "id": 4,
        "title": "友情岁月",
        "singer": "黄耀明",
        "music": "黄耀明 - 友情岁月.mp3",
        "poster": "黄耀明.jpg"
    },
    {
        "id": 5,
        "title": "梦里水乡",
        "singer": "江珊",
        "music": "江珊 - 梦里水乡.mp3",
        "poster": "江珊.jpg"
    },
    {
        "id": 6,
        "title": "Blowing In The Wind",
        "singer": "南方二重唱",
        "music": "南方二重唱 - Blowing In The Wind.mp3",
        "poster": "南方二重唱.jpg"
    },
    {
        "id": 7,
        "title": "女儿情",
        "singer": "万晓利",
        "music": "万晓利 - 女儿情.mp3",
        "poster": "万晓利.jpg"
    },
    {
        "id": 8,
        "title": "王馨平",
        "singer": "别问我是谁",
        "music": "王馨平 - 别问我是谁.mp3",
        "poster": "王馨平.jpg"
    }
];

server.on('request',function(request,response){
    var url = decodeURIComponent(request.url);
    var method = request.method;
    if(url === '/'){
        // response.write('音乐列表首页');
        // fs.readFile(path.join(__dirname,'views/index.html'),function(err,data){
        //     if(err)throw err;
        //     response.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        //     response.write(data);
        //     response.end();
        // });
        var html = template(path.join(__dirname,'views/index.html'), {
            arr:arr
        });
        // console.log(html);
        // response.write('hello');
        response.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        response.write(html);
        response.end();
    }else if(url === '/add' && method === 'GET'){
        // response.write('添加 get');
        fs.readFile(path.join(__dirname,'views/add.html'),function(err,data){
            if(err)throw err;
            response.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            response.write(data);
            response.end();
        });
    }else if(url === '/add' && method === 'POST'){
        // response.write('添加 post');
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname,'uploads');
        form.keepExtensions = true;
        form.parse(request, function(err, fields, files) {
            fs.rename(files.music.path,path.join(__dirname,'uploads',files.music.name),function(err){
                if(err)throw err;
                fs.rename(files.poster.path,path.join(__dirname,'uploads',files.poster.name),function(err){
                    if(err)throw err;
                    // response.end('success');
                    var tempId;
                    if(arr.length===0){
                        tempId = 1;
                    }else{
                        tempId = arr[arr.length - 1].id + 1;
                    }
                    var tempObj = {
                        id:tempId,
                        title:fields.title,
                        singer:fields.singer,
                        music:files.music.name,
                        poster:files.poster.name
                    };
                    arr.push(tempObj);
                    response.writeHead(302,{'Location':'/'});
                    response.end();
                })
            })
        });
    }else if(url === '/edit' && method === 'GET'){
        // response.write('编辑 get');
        fs.readFile(path.join(__dirname,'views/edit.html'),function(err,data){
            if(err)throw err;
            response.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            response.write(data);
            response.end();
        });
    }else if(url === '/edit' && method === 'POST'){
        // response.write('编辑 post');

    }else if(url.startsWith('/delete')){
        var tempId = querystring.parse(url.split('?')[1]).id - 0;
        for(var i=0;i<arr.length;i++){
            console.log(arr[i].id,tempId)
            if(arr[i].id === tempId){
                arr.splice(i,1);
                response.writeHead(302,{"Location":'/'});
                response.end();
                break;
            }
        }
    }else if(url.startsWith('/uploads/') || url.startsWith('/assets/')){
        fs.readFile(path.join(__dirname,url),function(err,data){
            if(err)throw err;
            response.write(data);
            response.end();
        });
    }
});
server.listen(3000,function(){
    console.log('server is listening at port 3000');
})