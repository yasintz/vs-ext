import * as fs from 'fs';
import { IPackageJson, ICommand } from '@/helper';

import commands from '@/commands';

const MAIN_PATH = './extension.js';
const packageJson: IPackageJson = {
    name: 'localextension',
    displayName: 'localextension',
    description: '',
    version: '0.0.1',
    publisher: 'yasintz',
    engines: {
        vscode: '^1.32.0',
    },
    categories: ['Other'],
    activationEvents: ['*', ...commands.map(({ command }) => `onCommand:${command}`)],
    main: MAIN_PATH,
    contributes: {
        commands: ((): ICommand[] => {
            const result: ICommand[] = [];
            commands.forEach(command => {
                if (command.title) {
                    result.push(command);
                }
            });

            return result;
        })(),
    },
    scripts: {
        start: 'code --extensionDevelopmentPath=D:/project/extension-monorepo/bundle',
        'vscode:prepublish': '',
        postinstall: 'node ./node_modules/vscode/bin/install',
        test: 'node ./node_modules/vscode/bin/test',
    },
    devDependencies: {
        typescript: '^3.4.5',
        vscode: '^1.1.33',
    },
};

try {
    fs.exists('./bundle', exists => {
        if (exists) {
            fs.writeFileSync('./bundle/package.json', JSON.stringify(packageJson, null, 2));
        } else {
            fs.mkdirSync('bundle');
            fs.writeFileSync('./bundle/package.json', JSON.stringify(packageJson, null, 2));
        }
    });
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}
