import {createContext} from 'react';

export const Store = createContext({
    general: [],
    sports: [],
    code: [],
    messages: [],
    typingHandle: null,
    typing: false,
    sendMessage: () => {
    },
    typingMessage: (a) => {

    }


});

export default Store;
