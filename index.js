'use strict';
process.env.NODE_ENV = process.env.NODE_ENV;

const express = require('express');
const config = require('./config/main');
const LoginApi = require('./services/portal/login-api');
const Repository = require(`./domain/entities/index`);
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

class Server {

  constructor() {
    this.app = express();
    this.sql = new Repository(config.sql);
    this.router = express.Router();
  }

  setup() {
    //Enable CORS
    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PATCH');
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type,Accept, Authorization');
      next();
    });

    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(jwt({
      secret: new Buffer(config.jwtSecret, 'base64'),
      credentialsRequired: true,
      getToken: function fromHeaderOrQuerystring (req) {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
          return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
    }).unless({
      path: [
        '/',
        '/session/create',
        '/users'
      ]}
    ));
  }

  boot() {
    new LoginApi(this.router, this.sql).expose();
    this.router.get('/', function(req, res) {
      res.status(200).json({
        status: 'running'
      });
    });
    this.app.enable('trust proxy');
    this.app.use('/', this.router);
    this.app.listen(config.targetPort, () => {
      console.log(`Server running at ${config.targetPort}`);
    });
  }
}

const api = new Server();
api.setup();
api.boot();
