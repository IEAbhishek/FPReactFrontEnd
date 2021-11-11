import React from 'react';
import Chatbot from 'react-chatbot-kit'
import './Styles/chat.css'

import 'react-chatbot-kit/build/main.css';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
function Chat() {
    return (
      <div  className="bg-light ">
    <div className="d-flex justify-content-center">
      <Chatbot config={config} actionProvider={ActionProvider}  messageParser={MessageParser} /> 
      </div>
    </div>
    );
  }
  export default Chat;