import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';

export default (routes) => {
  const app = express();

  const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
  });

  app.use('/public', express.static(path.resolve(__dirname, '../../public')));

  // app.use(cors({ origin: true, credentials: true }));
  app.use(cors());

  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '50mb', verify: rawBodyBuffer }));

  app.use(cookieParser());
  app.use(routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
