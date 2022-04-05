var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

{/* router.get('/end', (req, res) => {
  res.sendFile(
    __dirname, "..", "build", "index.html"
  )
}) */}


module.exports = router;
