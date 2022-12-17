import { ExtensionContext, TextDocument, Position, CancellationToken, CompletionItem, languages, CompletionItemKind, SnippetString } from "vscode";
import { ICompletionProvider } from "./iCompletionProvider";

export class ThrowCompletionProvider implements ICompletionProvider {
    register(ctx: ExtensionContext): void {
        ctx.subscriptions.push(languages.registerCompletionItemProvider(
            "typescript",
            {
                provideCompletionItems: this.provideCompletionItemsAsync
            },
            "t"
        ));
    }
    public provideCompletionItemsAsync = async (document: TextDocument, position: Position, token?: CancellationToken | undefined): Promise<CompletionItem[] | undefined> => {
        // get all text until the `position` and check if it reads `"launches.`
        const linePrefix = document.lineAt(position).text.substring(0, position.character);

        if (linePrefix.endsWith("t")) {
            return [this.createCompletionItem()]
        }
        return undefined;
    }

    protected createCompletionItem(): CompletionItem {
        const completionItem: CompletionItem = new CompletionItem("thr", CompletionItemKind.Text);
        completionItem.insertText = new SnippetString(`throw new `);
        completionItem.detail = "Throw new";
        completionItem.sortText = "a";
        return completionItem;
    }

}
const throwCompletionProvider: ThrowCompletionProvider = new ThrowCompletionProvider();
export default throwCompletionProvider;