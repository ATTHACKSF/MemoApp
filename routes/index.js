// MemoApp - routes\index.js

// (a)使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');

// (b)ルーターの作成
var router = express.Router();

// (1)メモ一覧の表示(ページ表示)
router.get('/', function(req, res) {
  memo.list(function(err, list) {
    res.render('index', { version : package.version, list : list });
  });
});

// (2)新規メモの作成(ダイアログ表示)
router.get('/memos', function(req, res) {
  res.render('dialog', { id : null, doc : null });
});

// (3)既存メモの編集(ダイアログ表示)
router.get('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('dialog', { id : id, doc : doc });
  });
});

// (4)新規メモの保存
router.post('/memos', function(req, res) {
  var id = uuid.v4();
  var doc = {
    title : req.body.title,
    content : req.body.content,
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/');
  });
});

// (5)既存メモの保存
router.put('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');
  var doc = {
    title : req.body.title,
    content : req.body.content,
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/');
  });
});

// (6)既存メモの削除
router.delete('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.remove(id, function(err) {
    res.redirect('/');
  });
});

module.exports = router;
