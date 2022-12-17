import { ExtensionContext, TextDocument, Position, CancellationToken, CompletionItem } from "vscode";
import * as vscode from 'vscode';

export class NewCompletionProvider implements NewCompletionProvider {
    register(ctx: ExtensionContext): void {
        ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(
            "typescript",
            {
                provideCompletionItems: this.provideCompletionItemsAsync
            },
            " "
        ));
    }
    public provideCompletionItemsAsync = async (document: TextDocument, position: Position, token?: CancellationToken | undefined): Promise<CompletionItem[] | undefined> => {
        console.log("position:", position);
        const linePrefix = document.lineAt(position).text.substring(0, position.character);

        if (linePrefix.endsWith("new ")) {
            const colonIdx: number = linePrefix.indexOf(":") + 1;
            const equalsIdx: number = linePrefix.lastIndexOf("=");
            const subStr: string = linePrefix.substring(colonIdx, equalsIdx);
            console.log(`subStr|${subStr}`);
            return [this.createCompletionItem(subStr)];
        }

        return undefined;
    }

    protected createCompletionItem(name: string): vscode.CompletionItem {

        const completionItem: vscode.CompletionItem = new vscode.CompletionItem(`new ${name}`, vscode.CompletionItemKind.Class);
        completionItem.insertText = new vscode.SnippetString(`${name.trim()}();`);
        completionItem.detail = `new ${name}`;
        return completionItem;
    }
}
const newCompletionProvider: NewCompletionProvider = new NewCompletionProvider();
export default newCompletionProvider;