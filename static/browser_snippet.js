let isShift = false;
let lastChecked = -1;
let lastState = true;

const handler = (shift) => (event) => {
  if (event.key === 'Shift') 
  isShift = shift;
}

window.document.addEventListener('keydown', handler(true));
window.document.addEventListener('keyup', handler(false));

const table = document.querySelector('table');
const tds = table.querySelectorAll('td:first-child');
const checkeds = table.querySelectorAll('td:first-child input[type=checkbox]');



for (let i = 0; i < tds.length; i++) {
  let check = checkeds[i];
  tds[i].addEventListener('click', (event) => {
    if (isShift) invertCheck(lastChecked, i);
    
    lastState = check.checked;
    lastChecked = i;
  });
}


function invertCheck(from, to) {
  let min  = Math.min(from, to);
  let max  = Math.max(from, to);
  for (let i = min+1; i < max; i++) {
    if (lastState !== checkeds[i].checked)
      checkeds[i].click();
  }
}
