/* eslint-disable no-useless-escape */
import { Dict } from '@mohism/utils';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export type SupportedType = undefined | string | Array<string> | boolean | Array<boolean> | number | Array<number>;

const TRUE_IS: Dict<number> = {
  '\'true\'': 1,
  '"true"': 1,
  '\'TRUE\'': 1,
  '"TRUE"': 1,
};
const FALSE_IS: Dict<number> = {
  '\'false\'': 1,
  '"false"': 1,
  '\'FALSE\'': 1,
  '"FALSE"': 1,
};

class Dotenvr {

  /**
   * 
   * @param file .env file
   * @param mixed is mixed into process.env
   */
  load(file?: string | undefined, mixed: boolean = true): Dict<any> {
    if (file === undefined) {
      file = process.cwd() + '/.env';
    }
    const abs: string = resolve(`${file}`);

    if (!existsSync(abs)) {
      return process.env;
    }
    const content: string = readFileSync(abs).toString();
    const contentArr: Array<string> = content.split(/\n\r?|\r\n?/);
    const config: Dict<any> = {};

    contentArr.forEach((item: string) => {
      const match: RegExpMatchArray | null = item.match(/^\s*([\w\.\-\[\]]+)\s*=?\s*(.*)?\s*$/);
      if (match !== null) {
        let key: string = match[1];
        let value: SupportedType = match[2] ? match[2] : (process.env[key] || '');

        if (key.endsWith('[]')) {
          key = key.replace('[]', '');
          value = (match[2] ? match[2] : (process.env[key] || '')).toString().split(',');
        } else {
          if (TRUE_IS[value]) {
            value = true;
          } else if (FALSE_IS[value]) {
            value = false;
          } else if (!Number.isNaN((value as any) * 1)) {
            value = +value;
          } else {
            value = value.replace(/\"|'/g, '');
          }
        }

        if (key.includes('.')) {
          const tmp = key.split('.');
          let obj = config;
          while (tmp.length > 1) {
            const index: string = tmp.shift() as string;
            obj[index] = obj[index] || {};
            obj = obj[index];
          }
          obj[tmp[0]] = value;
        } else {
          config[key] = value;
        }
      }
    });
    if (mixed) {
      return {
        ...process.env,
        ...config,
      };
    }
    return config;
  }
}

export default new Dotenvr();




