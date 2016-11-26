var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');
var request = require('request');
/* GET home page. */

// router.get('/', function(req, res, next) {
//   viewFile(req, res, 'main');
// });

router.get('/app/signin', function(req, res, next){
  viewFile(req, res, 'signin');
});

router.get('/app/signout', function(req, res, next){
  viewFile(req, res, 'signout');
});

router.get('/app/signup', function(req, res, next){
  viewFile(req, res, 'signup');
});


router.get('/docs/:id', function(req, res, next) {
  
 var fs = require('fs');
 fs.readFile("views/docs/" + req.params.id + ".html", "utf8", function(err, data){
    if(err){
      console.log("error!!!");
      res.send(404);
    }
    else{
      viewFile(req, res, 'docs', {docs: data});

    }
  });

});


var viewFile = function(req, res, filename, param){
  request({
    url: req.protocol + '://' + global.api_url + '/api/user/profile',
    // url: req.protocol + '://' + req.get('host') + '/api/user/profile',
    headers: req.headers
  }, function(err, res2, body){
    console.log(body);
    try {
      // console.log(param);
      res.render(filename, { title: 'CICERON', filename: filename, user: JSON.parse(body), param });
      
    } catch (error) {
      
    }
  });
  //   // console.log(req);
  // console.log(req.headers);
}

module.exports = router;
