import * as vscode from 'vscode';
import { Utils } from '@/note/utils';
import { NoteTypeSchema, CustomQuickPickItems } from '@/note/helpers';
import { QuickPick } from '@/note/utils/quick-pick';
import { NoteTypeSelection } from '@/note/utils/note-selection';
import { NoteCommand } from '@/note/commands';
import { selectedGroup } from './utils/db';

export function activate(context: vscode.ExtensionContext) {
    const utils = new Utils(context);
    const noteTypeSelection = new NoteTypeSelection(utils);
    const addNoteQuickPick = new QuickPick<NoteTypeSchema>({
        items: noteTypeSelection.items,
        autoHideAfterSelect: true,
    });
    const selectGroupQuickPickItems: CustomQuickPickItems[] = utils.db.allGroups().map(group => ({
        id: group.uuid,
        label: group.name,
        onSelect: () => {
            selectedGroup.uuid = group.uuid;
        },
    }));

    const selectGroupQuickPick = new QuickPick<CustomQuickPickItems>({
        items: selectGroupQuickPickItems,
        autoHideAfterSelect: true,
    });
    const addNoteDisposable = vscode.commands.registerCommand(NoteCommand.AddNote, () => {
        selectGroupQuickPick.onDidSelect = () => {
            addNoteQuickPick.show();
        };
        selectGroupQuickPick.show();
    });
    const openWebViewDisposable = vscode.commands.registerCommand(NoteCommand.OpenWeb, () => {
        selectGroupQuickPick.onDidSelect = () => {
            utils.webview.open(utils.html);
        };
        selectGroupQuickPick.show();
    });

    context.subscriptions.push(addNoteDisposable);
    context.subscriptions.push(openWebViewDisposable);
}

export function deactivate() {}
