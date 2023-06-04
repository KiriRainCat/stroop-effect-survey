import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1685766949418_8868',
  koa: {
    port: 8002,
    globalPrefix: '/api',
  },
} as MidwayConfig;
