/**
 * 表单提交
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
    title : { type: String },//标题
    profiles: {type: String},//简介
    cover : {type: String},//封面
    date : {type: Number},//时间
    videourl : {type: String},//地址
});
// UserSchema.index({id: 1});

module.exports = mongoose.model('Form',FormSchema);
