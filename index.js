import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import Webpack from './lib/webpack.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import nodeStatic from 'node-static';
import chalk from 'chalk';

const port = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var a = new Webpack(join(__dirname, 'static', 'dip'));
//a.watch();
//a.bundle();

const bare = createServer('/bare/');
const serve = new nodeStatic.Server('static/');

const server = http.createServer();

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    serve.serve(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {

  if (bare.shouldRoute(req, socket, head)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({
  port: port,
}, () => {
  console.log(chalk.green.bold("[Dynamic] ") + "live at port " + chalk.underline.bold.green(port));
});