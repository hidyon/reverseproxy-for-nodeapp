var express = require('express');
var router = express.Router();
const passport = require('passport')



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})

router.post(
  '/login', 
  passport.authenticate(
    'local', 
    { successRedirect: '/',
      failureRedirect: '/login',
      session: true,
    }
  )
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
