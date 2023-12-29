import * as vscode from 'vscode';

import hoverContent from './hoverContent';

function provideHover(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken
): vscode.ProviderResult<vscode.Hover> {
  const wordRange = document.getWordRangeAtPosition(position);
  const word = document.getText(wordRange);
  if(!hoverContent[word]) return null;
  const hoverText = new vscode.MarkdownString(hoverContent[word]);
  return new vscode.Hover(hoverText);
}


export function activate(context: vscode.ExtensionContext) {
  const languageSelector: vscode.DocumentSelector = { scheme: 'file', language: 'twbl' };
  const hoverProvider = vscode.languages.registerHoverProvider(languageSelector, {
    provideHover,
  });

  context.subscriptions.push(hoverProvider);
}

export function deactivate() {
}
