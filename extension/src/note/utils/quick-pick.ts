import * as vscode from 'vscode';
import { CustomQuickPickItems } from '@/note/helpers';

export class QuickPick<T extends CustomQuickPickItems> {
    private _items: T[] = [];

    private _quickPick: vscode.QuickPick<T>;

    private _options: IQuickPickOptions<T>;

    public onDidSelect: (selectedItems: T[]) => void = () => {};

    public constructor(options: IQuickPickOptions<T>) {
        this._options = options;
        this._quickPick = vscode.window.createQuickPick();
        this._setChangeSelection();
        this._items = options.items;
    }

    public show() {
        this._quickPick.items = this._items.filter(item => {
            if (item.isShown) {
                return item.isShown();
            }

            return true;
        });
        this._quickPick.show();
    }

    public setItems(newItems: T[]) {
        this._items = newItems;
    }

    public getItems(): T[] {
        return this._items;
    }

    private _onHide() {
        if (this._options.onDidExit) {
            this._options.onDidExit();
        }
        this._quickPick.hide();
    }

    private _setChangeSelection() {
        this._quickPick.onDidChangeSelection(selectedItems => {
            selectedItems.forEach(item => {
                if (this._options.autoHideAfterSelect) {
                    this._onHide();
                }
                item.onSelect(this._onHide.bind(this));
                this.onDidSelect(selectedItems);
            });
        });
    }
}

interface IQuickPickOptions<T> {
    items: T[];
    onDidExit?(): void;
    autoHideAfterSelect?: boolean;
}
