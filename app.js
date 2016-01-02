// MemoApp - app.js

// (a)使用モジュールの読み込み
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');

// (b)アプリケーションの作成
var app = express();

// (c)ビューの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// (d)ミドルウェアの設定
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('_method'));

// (e)ルーティングの設定
app.use('/', routes);

// (f)リクエストの受け付け
var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});
