// /// <reference types="chrome" />

let selectedColour = '#ffff00';

document.querySelectorAll<HTMLButtonElement>('.swatch[data-colour]').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedColour = btn.dataset.colour!;
    setActive(btn);
    saveColour(selectedColour);
  });
});

const customInput = document.getElementById('customColour') as HTMLInputElement;
customInput.addEventListener('input', () => {
  selectedColour = customInput.value;
  saveColour(selectedColour);
});

function setActive(el: HTMLButtonElement) {
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function saveColour(colour: string) {
  chrome.storage.local.set({ selectedColour: colour });
}