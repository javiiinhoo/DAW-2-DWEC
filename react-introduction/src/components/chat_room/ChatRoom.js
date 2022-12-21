import React from 'react';
import MessagesList from './MessagesList';
class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messagesList: [],
            currentText: ''
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    onChange(e) {
        console.log(e.target.value);
        this.setState({ currentText: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.currentText.length === 0) {
            return;
        }
        const newMessage = {
            text: this.state.currentText,
            key: Date.now()
        };
        this.setState(state => ({
            messagesList: state.messagesList.concat(newMessage),
            currentText: ''
        }));

    }


    render() {
        return (
            <div>
                <MessagesList receivedList={this.state.messagesList} />
                <form data-cy='form1770' onSubmit={this.handleSubmit}>
                    <input data-cy='issue17input' placeholder='Nuevo mensaje' onChange={this.onChange} value={this.state.currentText}></input>
                    <button data-cy='issue17button'>Enviar</button>
                </form>
                <p data-cy='issue17paragraph'>Cantidad de mensajes: {this.state.messagesList.length}</p>
            </div>



        );
    }
}


export default ChatRoom;


