import React, {useState, useEffect} from "react";
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

  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    if (connection && user) {
      connection.invoke("GetChats", user.id).catch((err) => console.error(err));
    }
  }, [user]);

  // const logout = () => {
  //   cookies.remove("jwt");
  // }

  function getJwt(){
    if(localStorage.getItem("jwttoken") != null){
      const token = localStorage.getItem("jwttoken");
      const decoded = jwt_decode(token);
      setUser({id: decoded.Id, name: decoded.Name, login: decoded.Login });
    }
  }

  useEffect(() => {
    const conn = new HubConnectionBuilder()
        .withUrl('https://localhost:7049/hubs/chat')
        .withAutomaticReconnect()
        .build();

        setConnection(conn);     
  }, []);
  
useEffect(() => {
        if(connection){          
          connection.start().then(result => {                         
              console.log('Connected!'); 
//connection.invoke("AddToGroup", "myGroup").catch((err) => console.error(err)); //myGroup поменять на groupId
              connection.on('GetChats', getchats=>{ 
                  setChats(getchats)                 
              });
              
              connection.on('ReceiveMessage', message => {
                  console.log(message);
                  // const updatedMessages = [...currchat.messages];
                  // updatedMessages.push(message.content);
                  // currchat.messages = updatedMessages;
                  // // console.log(currchat);
                  // setCurrchat(currchat);
              });
          })
          .then(result=>{
            getJwt();
          });
          //.catch(e => console.log('Connection failed: ', e));
        }     
}, [connection]);

useEffect(() => {
  if(connection){          
    connection.invoke("GetCurrentChat", currchat).catch((err) => console.error(err));
    connection.on('CurrentChat', res=>{
      setCurrchat(res);
    });   
  }
},[currchat]);

const sendMessage = async (chatId, content) => { //senderId, receiverId
  const chatMessage = {
      chatId: chatId,
      content: content
  };

  if (connection) {
      try {
          await connection.send('SendMessage', chatMessage);
      }
      catch(e) {
          console.log(e);
      }
  }
  else {
      alert('No connection to server yet.');
  }
}

  return (
    <div className="main-container">
      <ModalWindow getJwt={getJwt} connection={connection} modalType={modalType} setModalType={setModalType}/>
      <Chatsblock user={user} setCurrchat={setCurrchat} chats={chats}/>
      <Displblock user={user} sendMessage={sendMessage} currchat={currchat}/>
    </div>
  );
}

export default App;
