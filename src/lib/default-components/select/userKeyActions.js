const arrowAction = (add) => ({ list, event }) => {
  event.preventDefault();
  if (!list.visible)
    list.show();

  else if (list.focused === -1)
    list.offsetFocus(add);

  else if (!event.ctrlKey) {
    list.offsetFocus(add);

  } else {

    list.change(items => {
      const len = items.length;
      const start = list.focused;
      let end = (start + add) % len;
      if (end < 0) end = len + end;

      [items[start], items[end]] = [items[end], items[start]];

      setTimeout(() => { list.focus(end); }, 0);
      return items;
    });
  }
};

export default {
  ArrowUp: arrowAction(-1),
  ArrowDown: arrowAction(1),

  Delete({ list, event }) {
    if (list.focused !== -1 && event.ctrlKey)
      list.change(items => {
        items.splice(list.focused, 1);
        return items;
      })
  },

  Enter({ list, event }) {
    if (event.ctrlKey)
      return (dispatch) => dispatch('enter');
      
    if (list.select() === false) {
      list.show();
      const value = event.target.value;
      if (value !== '' && list.selected === -1)
      list.change(items => [value, ...items])
    } else {
      list.hide();
    }
  },


  KeyS({event}) {
    if (event.ctrlKey) {
      event.preventDefault();
      return dispatch => dispatch('save');
    }
  },

}