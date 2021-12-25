const helper = require('../util/helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  let fetchedUser = null;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'User with the email doesn\'t exist.'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        return res.status(401).json({
          message: 'Password is invalid.'
        });
      }
      const token = jwt.sign(
        {
          email: req.body.email,
          userId: fetchedUser._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60)
        },
        process.env.JWT_KEY
      );
      res.status(200).json({
        token,
        message: 'Logined successfuly.'
      });
    })
    .catch(err => next(helper.logError(err, 'login')));
}