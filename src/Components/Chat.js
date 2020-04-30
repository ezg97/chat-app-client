import React from 'react';
import './Chat.css';
import Store from '../Store';


class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            handle: '',
            content: ''
        };

        this.typing = 0;
        this.myRef = React.createRef();
    }

    static contextType = Store;

    


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

    //this function will add and remove the hide class to a reference... 3 second intervals between class being most recently added and removed
    // isTyping = (className) => {
    //     //clear the timer that way it doesn't get stacked
    //     clearTimeout(this.typing);
    //     //if the hide class is already included, then remove
    //     if (this.myRef.current.classList.value.includes('hide')) {
    //         this.myRef.current.classList.toggle('hide');
    //     }
    //     //set timer for 3 seconds after most recent keypress and then add the hide class
    //     this.typing = setTimeout(() => {
    //         this.myRef.current.classList.toggle('hide')

    //     }, 3000);
    // }



    render() {

        

        return(
        <div className='page'>
            <h3>Chat App</h3>

            {console.log('here -:', this.context)}
            <div id='chat-window'>
                {/* <div id='output'> */}
                <div className="typing" ref={ this.myRef }>
                    {this.context.isTyping
                        ? <p>{`${this.context.typingHandle}`} is typing...</p>
                        : null
                    }
                    
                </div>
                {this.context.messages.map(msgs => 
                    <p className='messages'> {msgs.handle} - {msgs.content}</p>
                )}
                
                {/* </div> */}
            </div>
            <input id='handle' onChange={(event) => this.onChange(event.target.value, null, event)} type='text' placeholder='Handle'>
            </input>
            <input id='message' onChange={(event) => this.onChange(null, event.target.value)}  type='text' placeholder='Message'></input>
            <button id="send" onClick={() => this.context.sendMessage(this.state.handle, this.state.content)}>Send</button>

        </div>
        );
    }

}

export default Chat;