import { ICommand } from '@/helper';
import { commandGenerator } from '@/utils/command-generator';

const dcg = (command: string) => commandGenerator('deneme', command);

export const DENEME_COMMAND = {
    SHOW_WEB: dcg('show-command'),
};
const commands: ICommand[] = [
    {
        command: DENEME_COMMAND.SHOW_WEB,
        title: 'DELETE FOLDERS',
    },
];

export default commands;
