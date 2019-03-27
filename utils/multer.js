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
module.exports = upload;
