import * as fs from 'fs';
import { Utils } from '../utils';

const mpC = (type: string, size: number) => {
    const f = type.charAt(0);

    return `
      .${f}-${size} {
        ${type}-right: ${size}px;
        ${type}-left: ${size}px;
        ${type}-top: ${size}px;
        ${type}-bottom: ${size}px;
      }
      .${f}x-${size} {
        ${type}-right: ${size}px;
        ${type}-left: ${size}px;
      }
      .${f}t-${size}{
        ${type}-top: ${size}px;
      }
      .${f}b-${size}{
        ${type}-bottom: ${size}px;
      }
      .${f}r-${size}{
        ${type}-right: ${size}px;
      }
      .${f}l-${size}{
        ${type}-left: ${size}px;
      }
      .${f}y-${size}{
        ${type}-top: ${size}px;
        ${type}-bottom: ${size}px;
      }
   `;
};
const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25];
const globalStyle = ['margin', 'padding'].map(type => sizes.map(size => mpC(type, size)).join('')).join('');

export class Html {
    private _content: string = '';

    private _utils: Utils;

    private _getHtml = fs.readFileSync(this._utils.paths.htmlFile, 'utf-8');

    public constructor(utils: Utils) {
        this._utils = utils;
        this.again();
    }

    public get content(): string {
        return this._content;
    }

    public again() {
        this._content = this._utils.viewEngine(
            {
                style: `<style>${globalStyle}</style>`,
                script: `
        <script>
          window.TEMPLATE_TYPE = 'note'
          window.vscode = acquireVsCodeApi();
          window.DATABASE = window.vscode.setState(${JSON.stringify(this._utils.db.allDatabase)});
         </script>
         `,
            },
            this._getHtml,
        );
    }
}
