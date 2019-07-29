import * as vscode from 'vscode';
import * as path from 'path';

export class Paths {
    private _context: vscode.ExtensionContext;

    public constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public get extensionFolder(): string {
        return this._context.extensionPath;
    }

    public get databaseFile(): string {
        return path.join(this.extensionFolder, 'note-db.json');
    }

    public get htmlFile(): string {
        return path.join(this.extensionFolder, 'index.html');
    }

    public join(...paths: string[]): string {
        return path.join(...paths);
    }
}
