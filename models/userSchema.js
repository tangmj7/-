var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    user_id:String,
    user_name:String,
    user_avatarUrl:String,
    user_gender:String,
    user_province:String,
    user_city:String
},{collection:'user'});
mongoose.model('user',UserSchema);