/// <reference types="chrome" />

console.log('content script loaded');

document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  if (selection.toString().trim() === '') return;

  chrome.storage.local.get('selectedColour', (result) => {
    const colour = (result['selectedColour'] as string) ?? '#ffff00';
    highlightSelection(colour);
  });
});

function highlightSelection(colour: string) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  try {
    // simple case — selection stays within one element
    const span = document.createElement('span');
    span.style.backgroundColor = colour;
    span.dataset.highlight = 'true';
    range.surroundContents(span);
  } catch {
    // cross-element selection — e.g. across a <p> or <a> tag
    const fragment = range.extractContents();
    const span = document.createElement('span');
    span.style.backgroundColor = colour;
    span.dataset.highlight = 'true';
    span.appendChild(fragment);
    range.insertNode(span);
  }

  selection.removeAllRanges();
}