let selectedColour = '#ffff00';

document.getElementById('customColor')!.addEventListener('input', (e) => {
  selectedColour = (e.target as HTMLInputElement).value;
});