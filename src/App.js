import React, {useState, useEffect, useCallback} from "react";
import Chatsblock from "./Chatsblock";
import Displblock from "./Displblock";
import { HubConnectionBuilder } from '@microsoft/signalr';
import jwt_decode from "jwt-decode";
import ModalWindow from "./ModalWindow";
function App() {
  const [chats, setChats] = useState([]);
  const [currchat, setCurrchat] = useState(null);
  const [connection, setConnection] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [lastMessage, setLastMessage]  = useState(null);


  const [user, setUser] = useState(null);
  
  useEffect(() => {
    getJwt();  
  }, []);

  // const logout = () => {
  //   cookies.remove("jwt");
  // }

  useEffect(()=>{
    if(lastMessage!=null){
      console.log(currchat);
      currchat.messages.push(lastMessage)
      console.log(currchat);
    }
  }, [lastMessage]);
  
  function getJwt(){
    if(localStorage.getItem("jwttoken") != null){    
      const token = localStorage.getItem("jwttoken");
      const decoded = jwt_decode(token);
      setUser({id: decoded.Id, name: decoded.Name, login: decoded.Login });

      const conn = new HubConnectionBuilder()
      .withUrl(`https://localhost:7049/hubs/chat?userid=${decoded.Id}`)
      .withAutomaticReconnect()
      .build();

      setConnection(conn);     
    }
  }

useEffect(() => {
        if(connection){          
          connection.start().then(result => {                         
              console.log('Connected!'); 

              connection.invoke("GetChats", user.id).catch((err) => console.error(err));    
              connection.on('GetChats', getchats=>{ 
                  setChats(getchats)           
              });

              connection.on('ReceiveMessage', message => {
                setLastMessage(message);  
              });
          });
        }     
}, [connection]);


function getChat(chatid) {
  if(connection){         
    connection.invoke("GetCurrentChat", chatid).catch((err) => console.error(err));
    
    connection.on('CurrentChat', res=>{
      setCurrchat(res);
    });   
  }
}

const sendMessage = (chatId, content) => { 
  const chatMessage = {
    Sender: user,
    ChatId: chatId,
    Content: content,
    IsReaded: false
};
  if (connection) {
      try {
         connection.send('SendMessage', chatMessage);
      }
      catch(e) {
          console.log(e);
      }
  }
}


  return (
    <div className="main-container">
      <ModalWindow getJwt={getJwt} modalType={modalType} setModalType={setModalType}/>
      <Chatsblock user={user} getChat={getChat} chats={chats}/>
      <Displblock user={user} sendMessage={sendMessage} currchat={currchat}/>
    </div>
  );
}

export default App;
