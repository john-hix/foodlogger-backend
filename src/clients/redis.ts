import Redis from 'ioredis';

import config from '../config';

const client = new Redis(config.REDIS_PORT, config.REDIS_HOST, {
  password: config.REDIS_PASSWORD,
  showFriendlyErrorStack: (process.env.NODE_ENV !== 'production')
  // enableOfflineQueue - circuit breaker patter?
});

export default client;
