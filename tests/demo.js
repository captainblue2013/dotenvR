/**
 * Created by lanhao on 16/5/13.
 */
const config = require('../index').load();

console.log(JSON.stringify(config,null,2));
// { APP: 'dotenvr demo', I: { am: { teapot: '418' } } }