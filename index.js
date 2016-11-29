'use strict';

var fs = require('fs');
var EOL = require('os').EOL;

let dotenvr = {};

dotenvr.load =  (file) => {
    if(file === undefined){
        file = './.env';
    }
    let exist = fs.existsSync(file);
    if(!exist){
        console.trace('.env file not found');
        process.exit(-1);
    }
    let content = fs.readFileSync(file).toString();
    let contentArr = content.split(/\n\r?|\r\n?/);
    let config = {};
    let match;
    for(let k in contentArr){
        match = contentArr[k].match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
        if(match!=null){
            let key = match[1];
            let value = match[2]?match[2]:'';
            if(key.includes('.')){
                let tmp = key.split('.');
                let obj = config;
                while(tmp.length>1){
                    let _index = tmp.shift();
                    if(!obj[_index]){
                        obj[_index] = {};
                    }
                    obj = obj[_index];
                }
                obj[tmp[0]] = value;
            }else {
                config[key] = value;
            }
        }
    }
    return config;
};

module.exports = dotenvr;