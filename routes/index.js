var express = require('express');
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var index = require('../controllers/index.js');
var formModel = require('../controllers/form.js');
var router = express.Router();


// 后台账户登录
router.post('/api/logo', index.logo);
//表单提交
router.post('/api/formmodel', formModel.formModel);
//列表查询
router.get('/api/getUserListPage', formModel.getUserListPage);
//上传图片
// router.post('/api/img_upload', multipart(), formModel.img_upload);
router.post('/api/img_upload', formModel.img_upload);
//上传视频
router.post('/api/video_upload', formModel.video_upload);

module.exports = router;
