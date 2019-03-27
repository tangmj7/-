var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/vote";
var db = mongoose.connect(url);
/* GET users listing. */

var use = require('/node/voteApp/models/userSchema');
var User = mongoose.model('user');

var config = {
  'AppID': 'wx4f4fee4428bebd25',
  'AppSecret': '4713245881f01b016706501df51d77e4'
};

// function createToken() {
//   var chars = "abcdefghijklmnopqrstuvwxyz";
//   var length = chars.length;
//   var str = "";
//   for (var i = 0; i < length; i++) {
//     str += chars.substr(Math.round(Math.random() * length), 1);
//   }
//   return str;
// };

router.get('/', function(req, response, next) {
  res.send('respond with a resource');
});
router.post('/', function(req, res) {
  var code = req.body.code,
      user_id = req.body.user_id,     
      user_name = req.body.user_name,
      user_avatarUrl = req.body.user_avatarUrl,      
      user_province = req.body.user_province,
      user_city = req.body.user_city,
      user_gender = req.body.user_gender;
  request.get({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    
    json: true,
    qs: {
      grant_type: 'authorization_code',
      appid: config.AppID,
      secret: config.AppSecret,
      js_code: code
    }
  }, function (err, response, data) {
    if(response.statusCode===200){
      console.log(data,"openid");
      console.log(data.session_key,"session",code)
      var openid = data.openid;
      User.findOne({'user_id':data.openid},function(err,result){
        var user_result = {
          user_id:openid,
          user_name:user_name,
          user_avatarUrl:user_avatarUrl,
          user_province:user_province,
          user_city:user_city
        };
        console.log(user_result,openid,"测试")
        if (result==null) {
          var user = new User({
            user_id:openid,
            user_name:user_name,
            user_avatarUrl:user_avatarUrl,
            user_gender:user_gender,
            user_province:user_province,
            user_city:user_city
          });
          user.save(function(err){
            if(err) throw err;
            
            res.send(user_result);
          });
          // user_id = user_id + 1;
          console.log(user_result,data.openid)
        }
        else{
          console.log("用户已存在",result._id,user_result,data.openid)
          res.send(user_result);
        }
      })
    }else{
      console.log(err)
    }
  })

  // var user = new User({
  //   user_id:user_id,
  //   user_name:user_name,
  //   user_avatarUrl:user_avatarUrl,
  //   user_gender:user_gender,
  //   user_province:user_province,
  //   user_city:user_city
  // });
  // User.findOne({'user_id':user_id},function(err,result){
  //   var user_result = {
  //     user_id:user_id,
  //     user_name:user_name,
  //     user_avatarUrl:user_avatarUrl,
  //     user_province:user_province,
  //     user_city:user_city
  //   };
  //   if (result==null) {
  //     user.save(function(err){
  //       if(err) throw err;
        
  //       res.send(user_result);
  //     });
  //     user_id = user_id + 1;
  //     console.log(user_result)
  //   }
  //   else{
  //     console.log("用户已存在",result._id,user_result)
  //     res.send(user_result);
  //   }
  // })
});
module.exports = router;
