import getConfiguration from './get-configuration';
import registerCommand from './register-command';
import { commandGenerator } from './command-generator';
import { EventBus } from '@/utils/event-bus';
import viewEngine from '@/utils/view-engine';
import Log from '@/utils/log';

export { getConfiguration, registerCommand, commandGenerator, EventBus, viewEngine };

const character = 'abcdefghijklmnopqrstuvwyzxXABCDEFGHİJKLMNOPQRSTUVWYZ1234567890-+*!@#$%^&()_+[]{}';

const RN = (): number => Math.floor(Math.random() * character.length);

export const uuid = (): string => {
    let name = '';
    while (name.length < 7) {
        const rn = RN();
        name += character[rn];
    }

    return name + Date.now();
};

class MainUtils {
    public uuid = uuid;

    public log = Log;

    public viewEngine = viewEngine;

    public commandGenerator = commandGenerator;

    public registerCommand = registerCommand;

    public getConfiguration = getConfiguration;
}

export default MainUtils;
