var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/home", (req, res) => {
  res.sendFile(
    __dirname, "..", "build", "index.html"
  )
})


module.exports = router;
