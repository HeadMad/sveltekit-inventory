export function cursorInEndForContentEditable(elem) {
  elem.focus();
  const range = document.createRange();
  range.selectNodeContents(elem);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function cursorInEndOfField(elem) {
  elem.setSelectionRange(elem.value.length, elem.value.length);
  elem.focus();
}

export function selectInner(elem) {
  window.getSelection().selectAllChildren(elem);
}