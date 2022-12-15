import { ExtensionContext, TextDocument, Position, CancellationToken, CompletionItem } from "vscode";
import { ICompletionProvider } from "./iCompletionProvider";
import * as vscode from 'vscode';

export class RegionCompletionProvider implements ICompletionProvider {
    register(ctx: ExtensionContext): void {
        ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(
            "typescript",
            {
                provideCompletionItems: this.provideCompletionItemsAsync
            },
            "#"
        ));
    }
    public provideCompletionItemsAsync = async (document: TextDocument, position: Position, token?: CancellationToken | undefined): Promise<CompletionItem[] | undefined> => {
        console.log("position:", position);
        const linePrefix = document.lineAt(position).text.substring(0, position.character);

        if (linePrefix.endsWith("#")) {
            return [this.createCompletionItem(position)];
        }

        return undefined;
    }

    protected createCompletionItem(position: vscode.Position): vscode.CompletionItem {
        const completionItem: vscode.CompletionItem = new vscode.CompletionItem("#region", vscode.CompletionItemKind.Class);
        completionItem.insertText = new vscode.SnippetString(`//#region $1 \n\n//#endregion`);
        completionItem.detail = "Region start";
        completionItem.range = new vscode.Range(new vscode.Position(position.line, position.character - 1), position);
        return completionItem;
    }

}
const regionCompletionProvider: RegionCompletionProvider = new RegionCompletionProvider();
export default regionCompletionProvider;