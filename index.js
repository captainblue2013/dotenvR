'use strict';

const fs = require('fs');

let dotenvr = {};

dotenvr.load = (file) => {
  if (file === undefined) {
    file = process.cwd()+'/.env';
  }

  let exist = fs.existsSync(file);
  if (!exist) {
    throw Error(".env not found");
  }
  let content = fs.readFileSync(file).toString();

  let contentArr = content.split(/\n\r?|\r\n?/);
  let config = {};

  for (let k in contentArr) {
    let match = contentArr[k].match(/^\s*([\w\.\-]+)\s*=?\s*(.*)?\s*$/);
    if (match !== null) {
      let key = match[1];
      let value = match[2] ? match[2] : (process.env[key] || "");

      if(value === 'true'){
        value = true;
      } else if(value === 'false'){
        value = false;
      } else if(Number.parseFloat(value)){
        value *=1;
      }else{

        value = value.replace(/\"|'/g,'')
      }


      if (key.includes('.')) {
        let tmp = key.split('.');
        let obj = config;
        while (tmp.length > 1) {
          let index = tmp.shift();

          obj[index] = obj[index] || {};
          obj = obj[index];
        }
        obj[tmp[0]] = value;
      } else {
        config[key] = value;
      }
    }
  }

  return config;
};

module.exports = dotenvr;