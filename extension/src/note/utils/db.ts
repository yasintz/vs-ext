import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Utils } from '../utils';
import { DatabaseScheme, INote, IGroup } from '@/note/helpers';
import { uuid as UUID } from '@/utils';

export const selectedGroup: IGroup = {
    name: '',
    uuid: '',
};

export class Database {
    private _adapter: lowdb.AdapterSync<DatabaseScheme>;

    private _db: lowdb.LowdbSync<DatabaseScheme>;

    private _utils: Utils;

    public constructor(utils: Utils) {
        this._utils = utils;
        this._adapter = new FileSync<DatabaseScheme>(this._utils.paths.databaseFile);
        this._db = lowdb(this._adapter);

        this.setDefaults();
        // mockWrite(this._db);
    }

    private setDefaults = () => {
        const d: DatabaseScheme = {
            notes: [],
            groups: [
                {
                    createdAt: new Date(),
                    uuid: '1234',
                    name: 'kommunity-monorompe',
                },
            ],
        };
        this._db.defaults(d).write();
    };

    public addGroup = (group: IGroup) => {
        this._db
            .get('groups')
            .push(Object.assign({}, group, { uuid: UUID(), createdAt: new Date() }))
            .write();
        this._utils.webview.again(this._utils.html);
    };

    public addNote = (note: INote) => {
        this._db
            .get('notes')
            .push({
                ...note,
                uuid: UUID(),
                createdAt: new Date(),
                groupUuid: selectedGroup.uuid,
            })
            .write();
        this._utils.webview.again(this._utils.html);
    };

    public removeGroup = (uuid: string) => {
        this._db
            .get('groups')
            .remove({ uuid })
            .write();
        this._utils.webview.again(this._utils.html);
    };

    public removeNote = (uuid: string) => {
        this._db
            .get('notes')
            .remove({ uuid })
            .write();
        this._utils.webview.again(this._utils.html);
    };

    public updateNote = (uuid: string, content: string) => {
        this._db
            .get('notes')
            .find({ uuid })
            .assign({ content })
            .write();
        this._utils.webview.again(this._utils.html);
    };

    public get allDatabase(): DatabaseScheme {
        return this._db.toJSON();
    }

    public allGroups(): IGroup[] {
        return this._db.get('groups').toJSON();
    }
}
