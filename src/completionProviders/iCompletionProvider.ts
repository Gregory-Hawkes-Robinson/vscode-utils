import * as vscode from 'vscode';

export interface ICompletionProvider {
    register(ctx: vscode.ExtensionContext): void;
    provideCompletionItemsAsync(document: vscode.TextDocument, position: vscode.Position, token?: vscode.CancellationToken): Promise<vscode.CompletionItem[] | undefined>
}