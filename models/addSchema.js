var mongoose = require('mongoose');
var addSchema = new mongoose.Schema({
    add_id:String,
    user_id:String,
    user_name:String,
    user_avatarUrl:String,
    vote_title:String,
    vote_detail:String,
    vote_option:Array,
    vote_type:String,
    vote_region:Array,
    vote_limitDate:String,
    vote_anonymous:Boolean,
    flag : Boolean,
    countAllOption : Number,
    userCount:Number
},{collection:'add'});
mongoose.model('add',addSchema);