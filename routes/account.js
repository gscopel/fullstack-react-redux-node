var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')


/* GET home page. */
router.get('/:action', function(req, res, next) {
  var action = req.params.action

  if (action == 'currentuser'){
      if(req.session == null){
        res.json({
          confirmation: 'success',
          user: null
        })
        return
      }

      if(req.session.user == null){
        res.json({
          confirmation: 'success',
          user: null
        })
        return
      }
      // res.json({
      //   confirmation: 'success',
      //   user: req.session.user
      // })
      controllers.profile.getById(req.session.user, false)
      .then(function(user){
        res.json({
          confirmation: 'success',
          user: user
        })
      })
      .catch(function(err){
        res.json({
          confirmation: 'fail',
          message: err
        })
      })
  }

  if (action == 'logout'){
      req.session.reset()
      res.json({
        confirmation: 'success'
      })
  }

  // res.json({
  //   confirmation: 'success',
  //   action: action
  // })
})

router.post('/:action', function(req, res, next) {
  var action = req.params.action

  if (action == 'register') {
    controllers.profile.post(req.body, false)
    .then(function(profile){

      //set the session
      req.session.user = profile.id

      res.json({
        confirmation: 'success',
        user: profile
      })
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
  }

  if (action == 'login') {
    controllers.profile
    .get({username: req.body.username}, true) //Raw boolean to get password back
    .then(function(profiles){
      if (profiles.length == 0){
        res.json({
          confirmation: 'fail',
          message: 'Profile not found.'
        })
        return
      }
      var profile = profiles[0]

      // check password:
      var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
      if (isPasswordCorrect == false){
        res.json({
          confirmation: 'fail',
          message: 'Incorrect Password.'
        })
        return
      }


      req.session.user = profile._id //Mongoose raw underscore record

      res.json({
        confirmation: 'success',
        user: profile.summary()
      })
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
  }
})

module.exports = router
