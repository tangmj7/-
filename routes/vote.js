var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/vote";
var db = mongoose.connect(url);
/* GET users listing. */

var add = require('/node/voteApp/models/addSchema');
var Add = mongoose.model('add');

var vote = require('/node/voteApp/models/voteSchema');
var Vote = mongoose.model('vote');

/* GET home page. */
router.get('/count', function(req, res, next) {
  res.send('respond with a count');
});
router.post('/count', function(req, res) {
    var user_id = req.body.user_id,
    add_id = req.body.add_id,
    chooseOption = req.body.chooseOption,
    countAll = req.body.countAll,
    vote_title = req.body.vote_title,
    flag = req.body.flag;

Vote.findOne({'user_id':user_id,'add_id':add_id},function(err,result){
    
    if (result==null) {
      Add.findOne({'_id':add_id},function(err,add_result){
        console.log(add_result.countAllOption,"Add");
        var n = 0;

        for(var j=0;j<chooseOption.length;j++){
          if(chooseOption[j].flag==false){
            chooseOption[j].count++;
            n++;
          }
        }
        countAll = add_result.countAllOption + n;
        userCount = add_result.userCount + 1;
        var voteOption = new Vote({
            'user_id' : user_id,
            'add_id' : add_id,
            'chooseOption' : chooseOption,
            'countAll': countAll,
            'vote_title': vote_title,
            'flag': flag,
            'userCount': userCount
        });
      var vote_result = {
        chooseOption : chooseOption,
        countAll: countAll,
        userCount: userCount
    };
        voteOption.save(function(err){
        if(err) throw err;
        res.send(vote_result);
        var whereStr = {'_id':add_id};
        var updateCount = {$set:{'vote_option':chooseOption,'countAllOption':countAll,'userCount':userCount}};
        Add.updateOne(whereStr,updateCount,function(err,result){
           if(err) throw err;
           console.log("update成功");
           console.log(result);
           // res.redirect('/edit');
    })
      });
      console.log(vote_result,"vote");

    })
    }
    else{
      console.log("用户已投过票")
      res.send('用户已投过票');
    }
  })
});
module.exports = router;