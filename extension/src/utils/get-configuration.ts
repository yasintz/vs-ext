import * as vscode from 'vscode';

export default (extensionName: string) =>
    vscode.workspace.getConfiguration(`localextension.${extensionName}`).get('multi-commands');
