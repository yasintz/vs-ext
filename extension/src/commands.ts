import NoteCommands from '@/note/commands';
import DenemeCommdans from '@/deneme/commands';
import { ICommand } from '@/helper';

const commands: ICommand[] = [...NoteCommands, ...DenemeCommdans];

export default commands;
