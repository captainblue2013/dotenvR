
[![Build Status](https://www.travis-ci.org/captainblue2013/dotenvR.svg?branch=master)](https://www.travis-ci.org/captainblue2013/dotenvR)

# dotenvR
---

## Install

    npm install dotenvr --save
## Usage

    var config = require('dotenvr').load(); //默认当前路径 .env 
    //var config = require('dotenvr').load('/path/of/your/.env');
   
## Example

   .env
   
    APP = demo
    A.B.C = 123
   
   var config = require('dotenvr').load(); // also see process.env
   
    {
        APP:'demo',
        A:{
            B:{
                C:123
            }
        }
    }
  