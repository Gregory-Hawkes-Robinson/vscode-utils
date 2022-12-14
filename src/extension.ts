// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { parse, ParsedPath } from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		"typescript",
		{
			provideCompletionItems: provideInitCompletionItems
		},
		" "
	));
}

// This method is called when your extension is deactivated
export function deactivate() { }

async function provideInitCompletionItems(document: vscode.TextDocument, position: vscode.Position, token?: vscode.CancellationToken): Promise<vscode.CompletionItem[] | undefined> {
	// get all text until the `position` and check if it reads `"launches.`

	const path: ParsedPath = parse(document.fileName);

	const linePrefix = document.lineAt(position).text.substring(0, position.character);
	const suggestionText: string = `${path.name.charAt(0).toUpperCase()}${path.name.slice(1)}`;


	if (linePrefix.endsWith("class ")) {
		return [createCompletionItem(suggestionText, "Name {}")];
	}

	if (linePrefix.endsWith("interface ")) {
		return [createCompletionItem(`I${suggestionText}`, "IName {}")];
	}

	if (linePrefix.endsWith("enum ")) {
		return [createCompletionItem(suggestionText, "Name {}")]
	}

	return undefined;
}

function createCompletionItem(name: string, description: string): vscode.CompletionItem {
	const completionItem: vscode.CompletionItem = new vscode.CompletionItem(name, vscode.CompletionItemKind.Class);
	completionItem.insertText = new vscode.SnippetString(`${name} {\n\t$1\n}`);
	completionItem.detail = description;
	return completionItem;
}
