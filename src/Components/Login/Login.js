import React from 'react';
// import './Chat.css';
import LoginContext from '../../ContextAPI/LoginContext';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            handle: '',
            content: ''
        };

        this.typing = 0;
        this.myRef = React.createRef();
    }

    static contextType = LoginContext;

    


    onChange = (handle, content, className) => {

        if (handle) {
            this.setState({
                handle
            });
        }
        if (content) {
            this.setState({
                content
            });
        }

        this.isTyping()
    }

    isTyping = () => {
        this.context.typingMessage(this.state.handle);
    }


    render() {

        

        return(
        <div className='page'>
            <h3>Chat App</h3>

            {console.log('here -:', this.context)}
            
                
                {/* </div> */}
            <input id='handle' onChange={(event) => this.onChange(event.target.value, null, event)} type='text' placeholder='Handle'>
            </input>
            <input id='message' onChange={(event) => this.onChange(null, event.target.value)}  type='text' placeholder='Message'></input>
            <button id="send" onClick={() => this.context.sendMessage(this.state.handle, this.state.content)}>Send</button>

        </div>
        );
    }

}

export default Login;