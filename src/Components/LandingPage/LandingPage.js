import React from 'react';
import './LandingPage.css';
import { Route, NavLink } from 'react-router-dom';

import LoginContext from '../../ContextAPI/LoginContext';


class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            password: '',
            email: ''
        };

    }

    static contextType = LoginContext;

    


    onChangePassword = (password) => {
        this.setState({
            password
        });
    }

    onChangeEmail = (email) => {
        this.setState({
            email
        });
    }

    btnLocal = (e) => {
       /* e.preventDefault();
        //console.log('LOCAL clicked');
        //console.log('state: ', this.state);
//?username=ezg@yahoo.com&password=alskdjf
        fetch('https://protected-taiga-95742.herokuapp.com/local/login?' + new URLSearchParams({
            email: 'elijah@yahoo.com',
            password: 'wakawaka97'
        }),
        {   method: "POST", 
            'credentials': 'include',
            // headers: {
            //     'Accept': 'application/json',
            //     'Access-Control-Allow-Origin':'https://www.chat-app.dev',
            //     'Content-Type': 'application/json',
            //     'redirect': 'follow'
            // },
            headers: new Headers({
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify( 
                { email: this.state.email, password: this.state.password }
            )
        })
        .then(res => {
             //console.log('local auth returned');
            if(!res.ok){
                //console.log('error:', res);
            }
            // //console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            //console.log('local 2');
            //console.log('succsess: ', res);
        })
        .catch(err => {
            //console.log('ERROR: ', err);
        })*/

        e.preventDefault();
        //console.log('google clicked');
        // let myWindow = window.open("https://protected-taiga-95742.herokuapp.com/auth/google","google","width=600,height=800");

        // //console.log(myWindow);
        // //console.log(myWindow.closed);

        

        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/github',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // //console.log('google 2');
            if(!res.ok){
                //console.log('error:', res);
            }
            // //console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // //console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/github";

            //console.log(myWindow);
            // //console.log(myWindow.closed);
            

        })
        .catch(err => {
            //console.log('ERROR: ', err);
        })
     }

     //TWITCH
     btnTwitch = (e) => {
        e.preventDefault();
        //console.log('twitch clicked');

        //this don't matter bc it gonna return nothing so we can open a new tab
        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/github',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // //console.log('google 2');
            if(!res.ok){
                //console.log('error:', res);
            }
            // //console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // //console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/twitch";

            //console.log(myWindow);
            // //console.log(myWindow.closed);
            

        })
        .catch(err => {
            //console.log('ERROR: ', err);
        })
     }

    btnGoogle = (e) => {
        e.preventDefault();
        //console.log('google clicked');
        // let myWindow = window.open("https://protected-taiga-95742.herokuapp.com/auth/google","google","width=600,height=800");

        // //console.log(myWindow);
        // //console.log(myWindow.closed);

        

        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/google',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // //console.log('google 2');
            if(!res.ok){
                //console.log('error:', res);
            }
            // //console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // //console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/google";

            //console.log(myWindow);
            // //console.log(myWindow.closed);
            

        })
        .catch(err => {
            //console.log('ERROR: ', err);
        })
     }


     btnLinkedIn = (e) => {
        e.preventDefault();
        //console.log('linkedin clicked');

        //this don't matter bc it gonna return nothing so we can open a new tab
        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/github',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // //console.log('google 2');
            if(!res.ok){
                //console.log('error:', res);
            }
            // //console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // //console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/linkedin";

            //console.log(myWindow);
            // //console.log(myWindow.closed);
            

        })
        .catch(err => {
            //console.log('ERROR: ', err);
        })
     }

    handleDownButton = () => {

        const elmnt = document.getElementById("hidden");
        elmnt.setAttribute("id", "landing-info");
        elmnt.scrollIntoView();
    }

    render() {

        

        return(
        <div className='page'>
            <header id="heading">
                <svg 
                id="title"
                width="695" 
                height="109" 
                viewBox="0 0 695 109" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.19199 54.744C3.19199 44.952 5.39999 36.168 9.81599 28.392C14.232 20.52 20.232 14.376 27.816 9.96C35.496 5.54399 43.992 3.33599 53.304 3.33599C64.248 3.33599 73.8 5.976 81.96 11.256C90.12 16.536 96.072 24.024 99.816 33.72H84.12C81.336 27.672 77.304 23.016 72.024 19.752C66.84 16.488 60.6 14.856 53.304 14.856C46.296 14.856 40.008 16.488 34.44 19.752C28.872 23.016 24.504 27.672 21.336 33.72C18.168 39.672 16.584 46.68 16.584 54.744C16.584 62.712 18.168 69.72 21.336 75.768C24.504 81.72 28.872 86.328 34.44 89.592C40.008 92.856 46.296 94.488 53.304 94.488C60.6 94.488 66.84 92.904 72.024 89.736C77.304 86.472 81.336 81.816 84.12 75.768H99.816C96.072 85.368 90.12 92.808 81.96 98.088C73.8 103.272 64.248 105.864 53.304 105.864C43.992 105.864 35.496 103.704 27.816 99.384C20.232 94.968 14.232 88.872 9.81599 81.096C5.39999 73.32 3.19199 64.536 3.19199 54.744Z" stroke="#FFFEFE" stroke-width="5"/>
                    <path d="M196.65 4.632V105H183.546V59.496H132.426V105H119.322V4.632H132.426V48.696H183.546V4.632H196.65Z" stroke="#FFFEFE" stroke-width="5"/>
                    <path d="M278.354 82.68H234.577L226.513 105H212.689L248.977 5.208H264.098L300.242 105H286.418L278.354 82.68ZM274.609 72.024L256.465 21.336L238.321 72.024H274.609Z" stroke="#FFFEFE" stroke-width="5"/>
                    <path d="M377.833 4.632V15.288H350.473V105H337.369V15.288H309.865V4.632H377.833Z" stroke="#FFFEFE" stroke-width="5"/>
                    <path d="M489.68 78.2812H446.789L437.156 105H423.234L462.328 2.625H474.141L513.305 105H499.453L489.68 78.2812ZM450.867 67.1719H485.672L468.234 19.2891L450.867 67.1719Z" stroke="#FFFEFE" stroke-width="5"/>
                    <path d="M540.586 64.9219V105H527.086V2.625H564.844C576.047 2.625 584.812 5.48438 591.141 11.2031C597.516 16.9219 600.703 24.4922 600.703 33.9141C600.703 43.8516 597.586 51.5156 591.352 56.9062C585.164 62.25 576.281 64.9219 564.703 64.9219H540.586ZM540.586 53.8828H564.844C572.062 53.8828 577.594 52.1953 581.437 48.8203C585.281 45.3984 587.203 40.4766 587.203 34.0547C587.203 27.9609 585.281 23.0859 581.437 19.4297C577.594 15.7734 572.32 13.875 565.617 13.7344H540.586V53.8828Z" stroke="#FFFEFE" stroke-width="5"/>
                    <path d="M631.43 64.9219V105H617.93V2.625H655.687C666.891 2.625 675.656 5.48438 681.984 11.2031C688.359 16.9219 691.547 24.4922 691.547 33.9141C691.547 43.8516 688.43 51.5156 682.195 56.9062C676.008 62.25 667.125 64.9219 655.547 64.9219H631.43ZM631.43 53.8828H655.687C662.906 53.8828 668.437 52.1953 672.281 48.8203C676.125 45.3984 678.047 40.4766 678.047 34.0547C678.047 27.9609 676.125 23.0859 672.281 19.4297C668.437 15.7734 663.164 13.875 656.461 13.7344H631.43V53.8828Z" stroke="#FFFEFE" stroke-width="5"/>
                </svg>
            </header>

            <section className='buttons'>
                {/* <NavLink to='/login'>Sign up</NavLink>
                <NavLink to='/login'>Log in</NavLink> */}


                <section className='oauth-btns'>
                    <button className='oauth github'  onClick={(e) => this.btnLocal(e)}>Github</button>
                    <button className='oauth google' onClick={(e) => this.btnGoogle(e)}>Google</button>
                    <button className='oauth twitch' onClick={(e) => this.btnTwitch(e)}>Twitch</button>
                    {/* package used for LinkedIn Oauth has been deprecated... plan to come back and find a new package one day */}
                    {/* <button className='oauth linkedin' onClick={(e) => this.btnLinkedIn(e)}>LinkedIn</button> */}


                </section>
                <section className={this.state.errorClass}>
                    <p>{this.state.errorMessage}</p>
                </section>

            </section>
{/* 
            <section>
                <button className='down-bar' onClick={() => this.handleDownButton()}>v</button>
            </section>

            <section id="hidden">
                <section>
                    <header>
                        <h3>Purpose</h3>
                    </header>
                    <p>Lorem10  dsflakdsjf ;lsadjf; lkdfja ldskfjads lkfjdsalkf ;jdsalkf ja;ldskf j;lkdsf ;jalskfd j;alfds  </p> 
                </section>

                <section>
                <header>
                        <h3>Features</h3>
                    </header>
                    <p>Lorem10  dsflakdsjf ;lsadjf; lkdfja ldskfjads lkfjdsalkf ;jdsalkf ja;ldskf j;lkdsf ;jalskfd j;alfds  </p> 
                </section>

                <section>
                    <p>Lorem10  dsflakdsjf ;lsadjf; lkdfja ldskfjads lkfjdsalkf ;jdsalkf ja;ldskf j;lkdsf ;jalskfd j;alfds  </p> 
                </section>

                <section>
                    <p>Lorem10  dsflakdsjf ;lsadjf; lkdfja ldskfjads lkfjdsalkf ;jdsalkf ja;ldskf j;lkdsf ;jalskfd j;alfds  </p> 
                </section>
            </section> */}

        </div>
        );

    }

}

export default LandingPage;