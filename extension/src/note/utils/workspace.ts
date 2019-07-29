import * as vscode from 'vscode';
// import { Utils } from '.';

export class Workspace {
    // constructor(public readonly utils: Utils) {}

    public isFolderAvailable(): boolean {
        if (typeof vscode.workspace.workspaceFolders === 'undefined') {
            return false;
        }
        if (vscode.workspace.workspaceFolders.length === 0) {
            return false;
        }

        return true;
    }

    public getWorkpaceFolders(): vscode.WorkspaceFolder[] {
        if (this.isFolderAvailable) {
            // @ts-ignore
            return vscode.workspace.workspaceFolders;
        }

        return [];
    }
}
