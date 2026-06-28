import { INDEX_FILE_CSS_BUTTON, INDEX_FILE_CSS_BUTTON_CLICK, INDEX_FILE_ELEMENT_BY_ID, INDEX_FILE_ADD_EVENT_LISTENER, INDEX_FILE_CLASS_LIST_REMOVE, INDEX_FILE_CLASS_LIST_ADD, INDEX_FILE_SEND_MESSAGE_ACTION} from './constants';
// /// <reference types="chrome" />

let selectedColour: string = '#ffff00';

document.querySelectorAll<HTMLButtonElement>(INDEX_FILE_CSS_BUTTON).forEach(btn => {//'.swatch[data-colour]'
  btn.addEventListener(INDEX_FILE_CSS_BUTTON_CLICK, () => {//'click'
    selectedColour = btn.dataset.colour!;
    setActive(btn);
    sendColour(selectedColour);
  });
});

const customInput = document.getElementById(INDEX_FILE_ELEMENT_BY_ID) as HTMLInputElement;//'customColour'
customInput.addEventListener(INDEX_FILE_ADD_EVENT_LISTENER, () => {//'input'
  selectedColour = customInput.value;
  sendColour(selectedColour);
});

function sendColour(colour: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, { action: INDEX_FILE_SEND_MESSAGE_ACTION, colour });//'setColour'
    }
  });
}

function setActive(el: HTMLButtonElement) {
  document.querySelectorAll(INDEX_FILE_CSS_BUTTON).forEach(s => s.classList.remove(INDEX_FILE_CLASS_LIST_REMOVE));//'.swatch'//'active'
  el.classList.add(INDEX_FILE_CLASS_LIST_ADD);//'active'
}