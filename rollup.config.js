import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import json from '@rollup/plugin-json'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const libraryName = 'calendar-meeting'

const ENV = process.env.BUILD

const Global = `var process = {
  env: {
    NODE_ENV: '${ENV}'
  }
};`

export default {
  input: './src/main.js', //入口文件
  output: [
    {
      file: pkg.main, //打包后的存放文件
      format: 'umd', //输出格式 amd es6 iife umd cjs
      name: camelCase(libraryName), //如果iife,umd需要指定一个全局变量
      sourcemap: true,
      banner: Global,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
      },
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: ['react', 'react-dom', 'antd'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    postcss({
      extensions: ['.less', '.css'],
    }),
    json(),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve(),
    sourceMaps(),
    ENV === 'production' && uglify(),
  ],
}
