
'use strict'; 
const express = require('express'); 
const router = express.Router();
// Instagram モジュールを読み込み
var ig = require('instagram-node').instagram();

// ACCESS TOKEN, CLIANT ID, CLIENT SECRET を登録
ig.use({ access_token: '7a00494918fc4fdab03bd335828dfb63' });
ig.use({ client_id: 'dd18401ce5e34e03813cedb1c65a39bd',
            client_secret:'6f31f1516f314ec49cf656d6ba5af0a2' }); 


router.get('/', (req, res, next) => {
  res.render('photos', { title: 'Photos - Test' }); 
}); 


module.exports = router; 


