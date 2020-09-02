import {createContext} from 'react';

// //console.log('HERE INSIDE OF CONTEXT API');

export const Auth = createContext({
    username: '',
    passowrd: '',
    token: '',
    id: 0,
    isAuthValid: false,
    links: [],
    searchResults: [],
    userHasBeenChecked: false,
    authorize: () => {
    },

});

export default Auth;
