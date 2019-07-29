import { QuickPickItem } from 'vscode';

export type NoteTypeId = 'root' | 'folder' | 'file' | 'line' | 'current-line' | 'selection' | 'app';

export type NoteTypeLabel = 'Root' | 'Folder' | 'File' | 'Line' | 'Selection' | 'App' | 'Current Line';

export interface NoteTypeSchema extends CustomQuickPickItems {
    id: NoteTypeId;
    label: NoteTypeLabel;
}

export interface WorkspaceFoldersSchema extends CustomQuickPickItems {
    id: number;
    label: string;
    path: string;
}

export interface NoteProperty {
    selectionText?: string;
    fileExtension?: string;
    lineNumber?: number | number[];
    filePath?: string;
    folderPath?: string;
    rootPath?: string;
}

export interface CustomQuickPickItems extends QuickPickItem {
    id: number | string;
    label: string;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    onSelect: (hideQuickPick: () => void) => void;
    isShown?(): boolean;
}

export interface INote {
    content: string;
    property?: NoteProperty;
    type: NoteTypeId;
    uuid?: string;
    groupUuid?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IGroup {
    name: string;
    uuid: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface DatabaseScheme {
    notes: INote[];
    groups: IGroup[];
}
