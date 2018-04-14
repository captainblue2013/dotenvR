/**
 * Created by lanhao on 16/5/13.
 */
const path = require('path');
const dotenvr = require('../index');


dotenvr.load('./file_not_exists');

let env = dotenvr.load(path.resolve(`${__dirname}/../test/.env`));

describe('TEST CASE', function(){
  dotenvr.load();
});