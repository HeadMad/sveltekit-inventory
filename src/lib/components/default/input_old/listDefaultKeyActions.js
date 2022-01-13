const arrowAction = (add) => (event, list) => {
  event.preventDefault();
  if (!list.visible) {
    list.show();
    if (list.focused === -1)
      list.offsetFocus(add);
  } else {
    list.offsetFocus(add);
  }
};

export default {
  ArrowUp: arrowAction(-1),
  ArrowDown: arrowAction(1),

  Enter(event, list) {
    list.toggle();
    if (list.select() === false)
      list.show();
    else 
      list.hide();
    return (dispatch) => dispatch('enter', event.target.value);
  },
};