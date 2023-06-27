import keyActions from './listDefaultKeyActions.js';


export const createEventActions = (list, userKeyActions) => {
  if (userKeyActions)
    Object.assign(keyActions, userKeyActions);

  return {
    init() {
      list.hide()
    },

    blur() {
      list.hide();
    },
  
    click() {
      list.toggle();
    },
  
    keydown(event) {
      const code = event.code;
      if (code in keyActions)
        return keyActions[code](event, list);
    }
  };
}

