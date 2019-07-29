import { ICommand } from '@/helper';
import { commandGenerator } from '@/utils/command-generator';

const ncg = (command: string) => commandGenerator('note', command);

export const NoteCommand = {
    AddNote: ncg('add-note'),
    OpenWeb: ncg('open-web'),
};
const commands: ICommand[] = [
    { command: NoteCommand.AddNote, title: 'Add Note' },
    { command: NoteCommand.OpenWeb, title: 'Open Web' },
];

export default commands;
