'use strict';
const Secretary = require('../../domain/repositories/secretary');
const JsonResponse = require('../responses/login-api-responses');

module.exports = class LoginApi {
  constructor(router, sql) {
    this.router = router;
    this.secretary = new Secretary();
  }

  expose() {
    this.createUser();
    this.createSession();
  }

  createUser() {
    this.router.post('/users', (req,res,next)=>{
      this.secretary.registerUser(req.body.data).then((user) => {
        res.json(JsonResponse.formatUserData(user));
      }).catch((err) => next(err));
    });
  }

  createSession() {
    this.router.post('/session/create', (req, res, next) => {
      this.secretary.grantAccess(req.body.data).then((token) => {
        res.json(JsonResponse.formatAuthorization(token));
      }).catch((err) => next(err));
    });
  }
};
