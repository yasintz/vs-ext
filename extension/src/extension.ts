import * as vscode from 'vscode';
// import * as NoteExtension from '@/note/extension';
import * as Deneme from '@/deneme/extension';

export function activate(context: vscode.ExtensionContext) {
    // eslint-disable-next-line no-console
    console.log('local extension started');
    // NoteExtension.activate(context);
    Deneme.activate(context);
}

export function deactivate() {}
