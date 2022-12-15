import { parse, ParsedPath } from 'path';
import * as vscode from 'vscode';
import { ICompletionProvider } from './iCompletionProvider';

export class ClassCompletionProvider implements ICompletionProvider {

    public register(ctx: vscode.ExtensionContext): void {
        ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(
            "typescript",
            {
                provideCompletionItems: this.provideCompletionItemsAsync
            },
            " "
        ));
    }

    public provideCompletionItemsAsync = async (document: vscode.TextDocument, position: vscode.Position, token?: vscode.CancellationToken): Promise<vscode.CompletionItem[] | undefined> => {
        console.log("position:", position);

        const path: ParsedPath = parse(document.fileName);

        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        const suggestionText: string = `${path.name.charAt(0).toUpperCase()}${path.name.slice(1)}`;


        if (linePrefix.endsWith("class ")) {
            console.log("ends with class...");
            return [
                await this.createCompletionItem(suggestionText, "Name {}"),
                await this.createConstCompletionItem(suggestionText, "const export")
            ];
        }

        if (linePrefix.endsWith("interface ") || linePrefix.endsWith("enum ")) {
            console.log("ends with interface or enum...");
            return [this.createCompletionItem(`${suggestionText}`, "Name {}")];
        }

        return undefined;
    }

    //#region Private methods

    private createCompletionItem(name: string, description: string): vscode.CompletionItem {
        const completionItem: vscode.CompletionItem = new vscode.CompletionItem(name, vscode.CompletionItemKind.Class);
        completionItem.insertText = new vscode.SnippetString(`${name} {\n\t$1\n}`);
        completionItem.detail = description;
        return completionItem;
    }

    private createConstCompletionItem(name: string, description: string): vscode.CompletionItem {
        const camelCaseName: string = name.length > 1 ? `${name.charAt(0).toLowerCase()}${name.charAt(1).toLowerCase()}${name.slice(2)}` : `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
        const completionItem: vscode.CompletionItem = new vscode.CompletionItem(name, vscode.CompletionItemKind.Class);
        completionItem.insertText = new vscode.SnippetString(`${name} $1{\n\t$2\n}\nconst ${camelCaseName}:${name} = new ${name}();\nexport default ${camelCaseName};`);
        completionItem.detail = description;
        return completionItem;
    }

    //#endregion
}

const classCompletionProvider: ClassCompletionProvider = new ClassCompletionProvider();
export default classCompletionProvider;