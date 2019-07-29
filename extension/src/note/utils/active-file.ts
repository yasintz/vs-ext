import * as vscode from 'vscode';
// import { Utils } from '.';

export class ActiveFile {
    // public constructor(public readonly utils: Utils) {}

    public get isAvailable(): boolean {
        return Boolean(vscode.window.activeTextEditor && this.path !== 'Untitled-1');
    }

    public get activeFile(): vscode.TextEditor | undefined {
        return vscode.window.activeTextEditor;
    }

    public get activeFileExtension(): string {
        const pathSplit = this.path.split('.');

        return pathSplit[pathSplit.length - 1];
    }

    public get lineCount(): number {
        if (this.activeFile) {
            return this.activeFile.document.lineCount;
        }

        return 0;
    }

    public get selectionText(): string | undefined {
        if (this.activeFile) {
            return this.activeFile.document.getText(this.activeFile.selection);
        }

        return undefined;
    }

    public get selectionInfo(): vscode.Selection | undefined {
        if (this.activeFile) {
            return this.activeFile.selection;
        }

        return undefined;
    }

    public get path(): string {
        if (typeof this.activeFile !== 'undefined') {
            return this.activeFile.document.fileName;
        }

        return '';
    }
}
