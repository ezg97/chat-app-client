//import AuthService from './AuthService';
console.log('1 testing imports');
// const Auth = fetch('http://localhost:8000/auth/',
//         {   method: "GET", 
//             headers: {
//                 'Accept': 'application/json',
//                 'Access-Control-Allow-Origin':'*',
//                 'Content-Type': 'applications/json',
//             }
//         })
//         .then(validAuth => {
//             console.log(validAuth);
//             if(!validAuth.ok){
//                 console.log('error:', validAuth);
//             }
//             return validAuth.json(); //the response is NOT Json
//         })
//         .then(validAuth => {
//             console.log('IS it valid? '+validAuth);
//             if (validAuth) {
//                 return true;
//             }
//             else return false;
//         });
const Auth = {
    res() { console.log('1.2 testing object functions') }
}

export default Auth;