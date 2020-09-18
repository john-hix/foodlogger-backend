import app from './app';
import config from './config';

app.listen(config.PORT, config.HOST, function() {
  app.log.info(`${app.name} listening at ${app.url}`);
});

