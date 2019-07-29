import * as vscode from 'vscode';
import { DENEME_COMMAND } from './commands';

// eslint-disable-next-line
export function activate(context: vscode.ExtensionContext) {
    vscode.commands.registerCommand(DENEME_COMMAND.SHOW_WEB, () => {
        const a = vscode.workspace.workspaceFolders;
        if (a) {
            vscode.workspace.updateWorkspaceFolders(0, 1);
        }
    });
}

export function deactivate() {}
