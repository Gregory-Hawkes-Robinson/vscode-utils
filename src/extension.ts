// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { parse, ParsedPath } from 'path';
import * as vscode from 'vscode';
import classCompletionProvider from './completionProviders/classCompletionProvider';
import newCompletionProvider from './completionProviders/newCompletionProvider';
import regionCompletionProvider from './completionProviders/regionCompletionProvider';
import throwCompletionProvider from './completionProviders/throwCompletionProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	classCompletionProvider.register(context);
	regionCompletionProvider.register(context);
	throwCompletionProvider.register(context);
	newCompletionProvider.register(context);
}

// This method is called when your extension is deactivated
export function deactivate() { }