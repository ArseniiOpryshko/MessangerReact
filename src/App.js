import React, {useState, useEffect, useCallback} from "react";
import Chatsblock from "./LeftBlock/Chatsblock";
import Displblock from "./Displblock";
import { HubConnectionBuilder, HttpTransportType  } from '@microsoft/signalr';
import jwt_decode from "jwt-decode";
import ModalWindow from "./ModalWindow";
function App() {
  const [chats, setChats] = useState([]);
  const [currchatId, setCurrchatId] = useState(null);
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [lastMessage, setLastMessage]  = useState(null);
  const [members, setMembers]  = useState(null);

  const [user, setUser] = useState(null); 

  
  useEffect(() => {
    getJwt();  
  }, []);

  useEffect(()=>{
    if(lastMessage!=null){
      chats.forEach(el => {
        if(el.id == lastMessage.chatId){
          el.messages = [ lastMessage ] ;
        }
      });
      setMessages(prev=>{
        return [lastMessage, ...prev]
      })
      setChats(chats);
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

useEffect(()=>{
  if(connection){         
    connection.invoke("getChatMessages", currchatId).catch((err) => console.error(err));
    
    connection.on('CurrentChatMessages', res=>{
      setMessages(res);
    });   
    let mem = chats.find(e=>e.id == currchatId).users;
    setMembers(mem);
  }
}, [currchatId]);


const sendMessage = (content) => { 
  const chatMessage = {
    Sender: user,
    ChatId: currchatId,
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
      <Chatsblock connection={connection} user={user} setCurrchatId={setCurrchatId} chats={chats}/>
      <Displblock user={user} sendMessage={sendMessage} messages={messages} members={members}/>
    </div>
  );
}

export default App;
