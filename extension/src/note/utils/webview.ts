import * as vscode from 'vscode';
import { Html } from './html';
import { Utils } from '@/note/utils';
import { EventBus } from '@/utils/event-bus';

export class WebView {
    private _webviewPanel: vscode.WebviewPanel | undefined;

    private _webviewViewType: string;

    private _webviewTitle: string;

    private _webviewShowOptions: vscode.ViewColumn = vscode.ViewColumn.One;

    private _webviewOptions = {
        enableScripts: true,
        enableFindWidget: true,
        retainContextWhenHidden: true,
    };

    public readonly eventbus: EventBus<WebViewListenerFlag> = new EventBus();

    private _utils: Utils;

    public constructor(utils: Utils, viewType: string, title: string) {
        this._utils = utils;
        this._webviewViewType = viewType;
        this._webviewTitle = title;
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.viewColumn) {
            this._webviewShowOptions = vscode.window.activeTextEditor.viewColumn;
        }

        this.eventbus.on<WebViewListenersResult>('DELETE_NOTE', data => {
            this._utils.db.removeNote(data.uuid);
        });
        this.eventbus.on<WebViewListenersResult>('UPDATE_NOTE', data => {
            if (data.content) {
            }
        });
    }

    public open = (html: Html) => {
        this._webviewPanel = vscode.window.createWebviewPanel(
            this._webviewViewType,
            this._webviewTitle,
            this._webviewShowOptions,
            this._webviewOptions,
        );
        this.again(html);
        this._webviewPanel.webview.onDidReceiveMessage(this.eventEmitter, undefined, this._utils.context.subscriptions);
    };

    public again = (html: Html) => {
        html.again();
        if (this._webviewPanel) {
            this._webviewPanel.webview.html = html.content;
        }
    };

    public eventEmitter = (message: WebViewListeners) => {
        this.eventbus.emit(message.flag, message.data);
    };
}
type WebViewListenerFlag = 'DELETE_NOTE' | 'UPDATE_NOTE';
interface WebViewListenersResult {
    uuid: string;
    content?: string;
}
interface WebViewListeners {
    flag: WebViewListenerFlag;
    data: WebViewListenersResult;
}
