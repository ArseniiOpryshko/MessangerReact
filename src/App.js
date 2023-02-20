import React, {useState, useEffect} from "react";
import Chatsblock from "./Chatsblock";
import Displblock from "./Displblock";
import { HubConnectionBuilder } from '@microsoft/signalr';

function App() {
  const [chats, setChats] = useState([]);
  const [currchat, setCurrchat] = useState(null);
  const [connection, setConnection] = useState(null);

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
              connection.invoke("GetChats", 2).catch((err) => console.error(err)); // 1 - id usera 
//connection.invoke("AddToGroup", "myGroup").catch((err) => console.error(err)); //myGroup поменять на groupId
              connection.on('GetChats', getchats=>{  //при setCurrchat делать запрос к бд и получать информацию о текущем чате
                  setChats(getchats)                 
              });

              connection.on('ReceiveMessage', message => {
                  
                  // const updatedMessages = [...currchat.messages];
                  // updatedMessages.push(message.content);
                  // currchat.messages = updatedMessages;
                  // // console.log(currchat);
                  // setCurrchat(currchat);             
              });
          })
          .catch(e => console.log('Connection failed: ', e));
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
    <div class="main-container">
      <Chatsblock setCurrchat={setCurrchat} chats={chats}/>
      <Displblock sendMessage={sendMessage} currchat={currchat}/>
    </div>
  );
}

export default App;
