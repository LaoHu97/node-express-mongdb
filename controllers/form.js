var ROOTFORM = require("../models/rootForm.js");
var multiparty = require('multiparty');
var fs = require('fs');

async function formModel(req, res, next) {
  var form = new ROOTFORM({
    title: req.body.title, //标题
    profiles: req.body.profiles, //简介
    cover: req.body.cover, //封面
    date: req.body.date, //时间
    videourl: req.body.videourl, //地址
  });
  try {
    form.save((err) => { //添加
      if (err) {
        res.send({
          status: 300,
          message: '添加失败！'
        })
      } else {
        res.send({
          status: 200,
          message: '添加成功！'
        })
      }
    });
  } catch (err) {
    res.send({
      status: 400,
      message: '添加失败！'
    })
  }
}
async function getUserListPage(req, res, next) {
  try {
    var page = Number(req.query.page);
    var rows = Number(req.query.rows);
    if (page && rows) {
      var total = await ROOTFORM.find({});
      var query = await ROOTFORM.find({}).limit(rows).skip((page - 1) * rows);
      res.send({
        data: query,
        total: total.length,
        status: 200,
        message: '查询成功！'
      })
    } else {
      res.send({
        status: 300,
        message: '查询失败！'
      })
    }
  } catch (err) {
    if (err) {
      console.log("错误:" + err);
    } else {
      res.send({
        status: 400,
        message: "查询失败！"
      })
    }
  }
}
async function img_upload(req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './uploads/images'
  });
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    try {
      if (err) {
        console.log('parse error: ' + err);
        res.send({
          status: 300,
          message: "上传失败！"
        })
      } else {
        console.log('parse files: ' + filesTmp);
        console.log(files);
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var dstPath = './uploads/images/' + inputFile.originalFilename;
        //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log('rename error: ' + err);
            res.send({
              status: 300,
              message: "上传失败！"
            })
          } else {
            console.log('rename ok');
            res.send({
              data:{url:dstPath},
              status: 200,
              message: "上传成功！"
            })
          }
        });
      }
    } catch (err) {
      res.send({
        status: 400,
        message: "上传失败！"
      })
    }
  })
}
async function video_upload(req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './uploads/video'
  });
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    try {
      if (err) {
        console.log('parse error: ' + err);
        res.send({
          status: 300,
          message: "上传失败！"
        })
      } else {
        console.log('parse files: ' + filesTmp);
        console.log(files);
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var dstPath = './uploads/video/' + inputFile.originalFilename;
        //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log('rename error: ' + err);
            res.send({
              status: 300,
              message: "上传失败！"
            })
          } else {
            console.log('rename ok');
            res.send({
              data:{url:dstPath},
              status: 200,
              message: "上传成功！"
            })
          }
        });
      }
    } catch (err) {
      res.send({
        status: 400,
        message: "上传失败！"
      })
    }
  })
}
module.exports = {
  formModel: formModel,
  getUserListPage: getUserListPage,
  img_upload: img_upload,
  video_upload:video_upload
};
