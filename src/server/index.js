import express from 'express';
import path from 'path';
import webpack from 'webpack'

const PROD = process.env.NODE_ENV === 'production';

const app = express();

if (!PROD) {
  const config = require('../../webpack/client.config.dev');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use((req, res, next) => {
  if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
    res.status(404).end();
  } else {
    next();
  }
});

if (PROD) {
  app.use(compression());
  app.use('/static', express.static('build/client'));
}

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function() {
  console.log("App started on port 3000");
});
