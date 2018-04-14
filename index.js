'use strict';

const fs = require('fs');

let dotenvr = {};

const TRUE_IS = {
  '\'true\'': 1,
  '"true"': 1,
  '\'TRUE\'': 1,
  '"TRUE"': 1,
};
const FALSE_IS = {
  '\'false\'': 1,
  '"false"': 1,
  '\'FALSE\'': 1,
  '"FALSE"': 1,
};

dotenvr.load = (file) => {
  if (file === undefined) {
    file = process.cwd() + '/.env';
  }
  
  if (!fs.existsSync(file)) {
    return process.env;
  }
  let content = fs.readFileSync(file).toString();
  let contentArr = content.split(/\n\r?|\r\n?/);
  let config = {};

  for (let k in contentArr) {
    let match = contentArr[k].match(/^\s*([\w\.\-\[\]]+)\s*=?\s*(.*)?\s*$/);
    if (match !== null) {
      let key = match[1];
      let value = match[2] ? match[2] : (process.env[key] || "");

      if (key.endsWith('[]')) {
        key = key.replace('[]', '');
        value = (match[2] ? match[2] : (process.env[key] || "")).toString().split(',');
      } else {
        if (TRUE_IS[value]) {
          value = true;
        } else if (FALSE_IS[value]) {
          value = false;
        } else if (!Number.isNaN(value * 1)) {
          value *= 1;
        } else {
          value = value.replace(/\"|'/g, '')
        }
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