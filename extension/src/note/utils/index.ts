import * as vscode from 'vscode';
import * as path from 'path';
import { Database } from '@/note/utils/db';
import { Html } from '@/note/utils/html';
import { WebView } from '@/note/utils/webview';
import { Paths } from '@/note/utils/paths';
import { ActiveFile } from '@/note/utils/active-file';
import { Workspace } from '@/note/utils/workspace';
import MainUtils, { EventBus } from '@/utils';

export class Utils extends MainUtils {
    public readonly activeFile: ActiveFile;

    public readonly webview: WebView;

    public readonly paths: Paths;

    public readonly db: Database;

    public readonly html: Html;

    public readonly workspace: Workspace;

    public readonly eventbus: EventBus<string>;

    public readonly context: vscode.ExtensionContext;

    public constructor(context: vscode.ExtensionContext) {
        super();
        this.context = context;
        this.eventbus = new EventBus();
        this.activeFile = new ActiveFile();
        this.workspace = new Workspace();
        this.webview = new WebView(this, 'hei ', 'asdfaj');
        this.paths = new Paths(context);
        this.db = new Database(this);
        this.html = new Html(this);
    }

    public getResourceUri(mergeFolder: string, url: string) {
        return vscode.Uri.file(path.join(mergeFolder, url)).with({
            scheme: 'vscode-resource',
        });
    }
}
