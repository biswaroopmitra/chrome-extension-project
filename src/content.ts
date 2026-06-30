import { ACTION, EVENT, ELEMENT_STATUS, HIGHLIGHT_STATUS } from './constants';
// /// <reference types="chrome" />

console.log('content script loaded');

let currentColour: string = '#ffff00';

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === ACTION) {//'setColour'
    currentColour = message.colour as string;
  }
});

document.addEventListener(EVENT, () => {//'mouseup'
  const selection: Selection | null = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  if (selection.toString().trim() === '') return;

  highlightSelection(currentColour);
});

function highlightSelection(colour: string) {
  const selection: Selection | null = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range: Range = selection.getRangeAt(0);

  try {
    const span: HTMLSpanElement = document.createElement(ELEMENT_STATUS);//'span'
    span.style.backgroundColor = colour;
    span.dataset.highlight = HIGHLIGHT_STATUS;//'true'
    range.surroundContents(span);
  } catch (error) {
    console.error('Error highlighting selection:', error);
    const fragment: DocumentFragment = range.extractContents();
    const span: HTMLSpanElement = document.createElement(ELEMENT_STATUS);//'span'
    span.style.backgroundColor = colour;
    span.dataset.highlight = HIGHLIGHT_STATUS;//'true'
    span.appendChild(fragment);
    range.insertNode(span);
  }

  selection.removeAllRanges();
}