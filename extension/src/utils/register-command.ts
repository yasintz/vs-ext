import * as vscode from 'vscode';

export default function registerCommand(
    context: vscode.ExtensionContext,
    extensionName: string,
    command: string,
    callback: (...args: any[]) => any,
    push?: boolean,
) {
    const disposable = vscode.commands.registerCommand(`localextension.${extensionName}.${command}`, args => {
        callback(args);
    });
    if (typeof push === 'undefined' || push) {
        context.subscriptions.push(disposable);
    }

    return {
        disposable,
    };
}
