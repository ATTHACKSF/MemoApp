// MemoApp – models\memo.js (メモリー版)
// メモ・データを保持するオブジェクト
//var docs = {};



// MemoApp – models\memo.js (Cloudant版)

// (a)使用モジュールの読み込み
var cradle = require('cradle');

// (b)Cloudant接続情報の取得
var services = JSON.parse(process.env.VCAP_SERVICES);
var credentials = services['cloudantNoSQLDB'][0].credentials;
var host = credentials.host;
var port = credentials.port;
var options = {
  cache : true,
  raw : false,
  secure : true,
  auth : {
    username : credentials.username,
    password : credentials.password
  }
};

// (c)メモ・データを保持するデータベース
var db = new (cradle.Connection)(host, port, options).database('memo');


// (1)メモ一覧の取得
exports.list = function(callback) {
  var list = Object.keys(docs).map(function(id) {
    var row = {
      id : id,
      title : docs[id].title,
      updatedAt : docs[id].updatedAt
    };

    return row;
  }).sort(function(a, b) {
    if (a.updatedAt < b.updatedAt)
      return 1;
    if (a.updatedAt > b.updatedAt)
      return -1;

    return 0;
  });

  process.nextTick(function() {
    callback(null, list);
  });
};

// (2)メモの取得
exports.get = function(id, callback) {
  var doc = {
    title : docs[id].title,
    content : docs[id].content,
    updatedAt : docs[id].updatedAt
  };

  process.nextTick(function() {
    callback(null, doc);
  });
};

// (3)メモの保存
exports.save = function(id, doc, callback) {
  docs[id] = {
    title : doc.title,
    content : doc.content,
    updatedAt : doc.updatedAt
  };

  process.nextTick(function() {
    callback();
  });
};

// (4)メモの削除
exports.remove = function(id, callback) {
  delete docs[id];

  process.nextTick(function() {
    callback();
  });
};
