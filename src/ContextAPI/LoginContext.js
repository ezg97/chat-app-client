import {createContext} from 'react';

// console.log('HERE INSIDE OF CONTEXT API');

export const Auth = createContext({
    username: '',
    passowrd: '',
    token: '',
    id: 0,
    isAuthValid: false,
    authorize: () => {
    },
    userHasBeenChecked: false,

});

export default Auth;
