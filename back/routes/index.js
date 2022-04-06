var express = require('express');
var router = express.Router();

/* route for api calls (any new calls should start with "/api/..." */
router.get('/api/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* any url the api doesn't recognize routes to our single page (index.html) */
router.get('*', (req, res) => {
  res.sendFile(
    path.join(
      __dirname + "/front/public/index.html"
    )
  )
})

module.exports = router;
