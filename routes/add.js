var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/vote";
var db = mongoose.connect(url);
/* GET users listing. */


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



var add = require('/node/voteApp/models/addSchema');
var Add = mongoose.model('add');

//创建表单
router.get('/', function(req, res, next) {
  res.send('respond with a add');
});
var add_id = 1;
// var upload = require('/node/voteApp/routes/upload');
var array = [];
var i = 0;
var arr;
router.post('/', upload.single('file'), function(req, res) {
  i++;
  var length = parseInt(req.body.length);
  var url = 'http://127.0.0.1:3000' + '/images/' + req.file.filename;
  if(i>length){
      i = 0;
      array = [];
    }else{
      array.push(url);
      if(i===length){


        var user_id = req.body.user_id,
user_name = req.body.user_name,
user_avatarUrl = req.body.user_avatarUrl,
vote_title = req.body.vote_title,
vote_detail = req.body.vote_detail,
vote_option = req.body.vote_option,
vote_type = req.body.vote_type,
vote_region = req.body.vote_region,
vote_limitDate = req.body.vote_limitDate,
vote_anonymous = req.body.vote_anonymous,
flag = req.body.flag,
countAllOption = req.body.countAllOption;
var s = add_id.toString();
    add = user_id + s;

user_id = JSON.parse(user_id);
user_name = JSON.parse(user_name);
user_avatarUrl = JSON.parse(user_avatarUrl);
vote_title = JSON.parse(vote_title);
vote_detail = JSON.parse(vote_detail);
vote_option = JSON.parse(vote_option);
vote_type = JSON.parse(vote_type);
vote_region = JSON.parse(vote_region);
vote_limitDate = JSON.parse(vote_limitDate);
vote_anonymous = JSON.parse(vote_anonymous);
flag = JSON.parse(flag);
countAllOption = parseInt(countAllOption);
for(var j=0;j<array.length;j++){
  vote_option[j].pic = array[j];
}
console.log(add_id,"add_id",user_id,"vote_option图片",vote_option)
 var submitForm = new Add({
   'add_id' : add,
   'user_id' : user_id,
   'user_name' : user_name,
   'user_avatarUrl': user_avatarUrl,
   'vote_title' : vote_title,
   'vote_detail' : vote_detail,
   'vote_option' : vote_option,
   'vote_type' : vote_type,
   'vote_region' : vote_region,
   'vote_limitDate' : vote_limitDate,
   'vote_anonymous' : vote_anonymous,
   'flag':flag,
   'countAllOption':countAllOption,
   'userCount': 0
});


    submitForm.save(function (err,data) { 
      if(err) throw err;
      console.log(submitForm,data,"data")
      res.send(submitForm);
     });
     add_id = add_id + 1;
    console.log(submitForm,'submit');



      }
    }
  console.log("图片上传至服务器",req.file,"图片数组",array)
  console.log(req.body)        

     
  });


  //主页面
  router.get('/home', function(req, res, next) {
    res.send('respond with a home');
  });
  router.post('/home', function(req, res) {
    Add.find({}).sort({userCount:-1}).exec(function(err,result){
      if(result!=null){
        res.send(result);
        console.log(result,'home');
      }
    })
  });


//投票页面
  router.get('/vote', function(req, res, next) {
    res.send('respond with a vote');
  });
  router.post('/vote', function(req, res) {
    var add_id = req.body.add_id,
        user_id = req.body.user_id;
    Add.findOne({'user_id':user_id,'_id':add_id},function(err,result){
      if(result!=null){
        res.send(result);
        console.log(result,'vote');
      }
    })
  });

  var vote = require('/node/voteApp/models/voteSchema');
  var Vote = mongoose.model('vote');

  router.get('/release', function(req, res, next) {
    res.send('respond with a release');
  });
  router.post('/release', function(req, res) {
    var user_id = req.body.user_id,
        currentTab = req.body.currentTab;
    //我发布的
    if(currentTab===0){
      Add.find({'user_id':user_id},function(err,result){

        if(result!=null){
          res.send(result.reverse());
          console.log(result,'release');
        }
      })
    }else{
      //我参与的
      Vote.find({'user_id':user_id},function(err,vote_result){

        if(vote_result!=null){
          res.send(vote_result.reverse());
          console.log(vote_result,"involve");
        }
        
      })
    }
    console.log(currentTab,"tab")
  });


  //删除


  router.get('/del', function(req, res, next) {
    res.send('respond with a del');
  });
  router.post('/del', function(req, res) {
    var _id = req.body.add_id;
    Add.deleteOne({'_id':_id},function(err,result){
      if(err) throw err;
      var delResult = "删除成功";
      res.send(delResult);
      console.log("add删除成功",delResult);
    })
    Vote.deleteMany({'add_id':_id},function(err,result){
      if(err) throw err;
      // var delResult = "删除成功";
      // res.send(delResult);
      console.log("add删除成功");
    })
  });
module.exports = router;
