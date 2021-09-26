import config from './rollup.config';
import serve from 'rollup-plugin-serve';

config.plugins.push(
  serve({
    port: 5900,
    contentBase: [''],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
);

export default config;
