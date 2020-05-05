import {createContext} from 'react';

export const Store = createContext({
    username: '',
    passowrd: '',
    token: '',
    id: 0,


});

export default Store;
