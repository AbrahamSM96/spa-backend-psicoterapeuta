import express from './services/express';
import http from 'http';
import api from './api/index';
const app = express(api);
const port = 8001;
const ip = 'localhost';

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'test') {
  const server = http.createServer(app);

  setImmediate(() => {
    server.listen(port, ip, () => {
      console.info(`Express server listening on http://${ip}:${port}`);
    });
  });
}
export default app;
