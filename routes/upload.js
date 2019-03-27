var express = require('express');
var router = express.Router();

var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建
  destination: function(req,file,cb){
      cb(null,'./public/images');
      console.log("路径")
  },
  //给上传文件重命名，获取添加后缀名
  filename: function(req,file,cb){
      cb(null,Date.now() + file.originalname);
      console.log("名字")
  }
});
//添加配置文件到muler对象。
var upload = multer({
  storage: storage
});

router.get('/', function(req, res) {
    res.send('respond with a upload');

  });
var i = 0;
var array = [];
router.post('/',upload.single('file'),function(req, res) {
    var url = 'http://127.0.0.1:3000' + '/images/' + req.file.filename;
    // if(i>req.body.length){
    //   i = 0;
    //   arr = [];
    // }else{
      array.push(url);
    // }
    console.log("图片上传至服务器",req.file,array)
    res.send({
      data: url
    });

  });
console.log(array,"图片")
module.exports = router;
// module.exports.array = array;
