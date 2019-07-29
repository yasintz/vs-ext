import * as vscode from 'vscode';
import { Utils } from '../utils';
import { QuickPick } from './quick-pick';
import { WorkspaceFoldersSchema, INote, NoteTypeSchema } from '@/note/helpers';

export class NoteTypeSelection {
    private utils: Utils;

    public constructor(utils: Utils) {
        this.utils = utils;
    }

    public items: NoteTypeSchema[] = [
        {
            id: 'selection',
            label: 'Selection',
            isShown: () => Boolean(this.utils.activeFile.isAvailable && this.utils.activeFile.selectionText),
            onSelect: () => {
                this.selectionNotes();
            },
        },
        {
            id: 'line',
            label: 'Line',
            isShown: () => Boolean(this.utils.activeFile.isAvailable && this.utils.activeFile.selectionText),
            onSelect: () => {
                this.lineNotes();
            },
        },
        {
            id: 'current-line',
            label: 'Current Line',
            isShown: () => this.utils.activeFile.isAvailable,
            onSelect: () => {
                this.currentLineNotes();
            },
        },
        {
            id: 'file',
            label: 'File',
            isShown: () => this.utils.activeFile.isAvailable,
            onSelect: () => {
                this.fileNotes();
            },
        },
        {
            id: 'folder',
            label: 'Folder',
            isShown: () => false,
            onSelect: () => {
                this.folderNotes();
            },
        },
        {
            id: 'root',
            label: 'Root',
            isShown: this.utils.workspace.isFolderAvailable,
            onSelect: () => {
                this.rootNotes();
            },
        },
        {
            id: 'app',
            label: 'App',
            onSelect: () => {
                this.appNotes();
            },
        },
    ];

    public selectionNotes() {
        vscode.window.showInputBox().then(content => {
            if (typeof content !== 'undefined' && content) {
                const lineNumber = [];
                if (this.utils.activeFile.selectionInfo) {
                    if (
                        this.utils.activeFile.selectionInfo.start.line === this.utils.activeFile.selectionInfo.end.line
                    ) {
                        lineNumber.push(this.utils.activeFile.selectionInfo.start.line + 1);
                    } else {
                        lineNumber.push(this.utils.activeFile.selectionInfo.start.line + 1);
                        lineNumber.push(this.utils.activeFile.selectionInfo.end.line + 1);
                    }
                }
                this.utils.db.addNote({
                    content,
                    property: {
                        filePath: this.utils.activeFile.path,
                        fileExtension: this.utils.activeFile.activeFileExtension,
                        selectionText: this.utils.activeFile.selectionText,
                        lineNumber:
                            lineNumber.length === 2 ? lineNumber : lineNumber.length === 1 ? lineNumber[0] : undefined,
                    },
                    type: 'selection',
                });
            }
        });
    }

    public currentLineNotes() {
        vscode.window.showInputBox().then(content => {
            if (typeof content !== 'undefined' && content) {
                let lineNumber;
                if (this.utils.activeFile.selectionInfo) {
                    lineNumber = this.utils.activeFile.selectionInfo.active.line + 1;
                }
                this.utils.db.addNote({
                    content,
                    property: {
                        filePath: this.utils.activeFile.path,
                        fileExtension: this.utils.activeFile.activeFileExtension,
                        lineNumber,
                    },
                    type: 'line',
                });
            }
        });
    }

    public lineNotes() {
        vscode.window.showInputBox().then(content => {
            if (typeof content !== 'undefined' && content) {
                const lineNumber = [];
                if (this.utils.activeFile.selectionInfo) {
                    if (
                        this.utils.activeFile.selectionInfo.start.line === this.utils.activeFile.selectionInfo.end.line
                    ) {
                        lineNumber.push(this.utils.activeFile.selectionInfo.start.line + 1);
                    } else {
                        lineNumber.push(this.utils.activeFile.selectionInfo.start.line + 1);
                        lineNumber.push(this.utils.activeFile.selectionInfo.end.line + 1);
                    }
                }
                this.utils.db.addNote({
                    content,
                    property: {
                        filePath: this.utils.activeFile.path,
                        fileExtension: this.utils.activeFile.activeFileExtension,
                        lineNumber:
                            lineNumber.length === 2 ? lineNumber : lineNumber.length === 1 ? lineNumber[0] : undefined,
                    },
                    type: 'line',
                });
            }
        });
    }

    public fileNotes() {
        this._noteInputBox({
            content: '',
            property: {
                filePath: this.utils.activeFile.path,
                fileExtension: this.utils.activeFile.activeFileExtension,
            },
            type: 'file',
        });
    }

    public folderNotes() {}

    public rootNotes() {
        const workspaceFolders = this.utils.workspace.getWorkpaceFolders();
        if (workspaceFolders.length === 1) {
            this._noteInputBox({
                content: '',
                property: {
                    rootPath: workspaceFolders[0].uri.path,
                },
                type: 'root',
            });
        } else {
            const folderQuickPickItems: WorkspaceFoldersSchema[] = workspaceFolders.map(item => ({
                id: item.index,
                label: item.name,
                path: item.uri.path,
                onSelect: (hideQuickPick: () => void) => {
                    hideQuickPick();
                    this._noteInputBox({
                        content: '',
                        property: {
                            rootPath: item.uri.path,
                        },
                        type: 'root',
                    });

                    return true;
                },
            }));

            const folderQuickPick = new QuickPick<WorkspaceFoldersSchema>({
                items: folderQuickPickItems,
            });
            folderQuickPick.show();
        }
    }

    public appNotes() {
        this._noteInputBox({
            content: '',
            type: 'app',
        });
    }

    private _noteInputBox(note: INote) {
        vscode.window.showInputBox().then(content => {
            if (typeof content !== 'undefined' && content) {
                this.utils.db.addNote(
                    Object.assign({}, note, {
                        content,
                    }),
                );
            }
        });
    }
}
