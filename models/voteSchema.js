var mongoose = require('mongoose');
var VoteSchema = new mongoose.Schema({
    user_id:String,
    add_id:String,
    vote_title:String,
    flag : Boolean,
    chooseOption:Array,
    countAll:Number,
    userCount:Number
},{collection:'vote'});
mongoose.model('vote',VoteSchema);