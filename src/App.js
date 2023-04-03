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
  const [method, setMethod] = useState(null); 
  
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

      if(messages==null){
        setMessages(lastMessage)
      }
      else{
        setMessages(prev=>{
          return [lastMessage, ...prev]
        })
      }
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

  function onclose(){
    if(user){
      connection.invoke("Disconnect", parseInt(user.id, 10));
    }      
  }

useEffect(() => {
      if(connection){          
            connection.start().then(result => {                         
              console.log('Connected!'); 
              window.addEventListener('beforeunload', ()=>{
                onclose();
              });             
            
              connection.on('ReceiveMessage', message => {
                setLastMessage(message);  
              });

              connection.on('NewChatData', res=>{
                setCurrchatId(res.id);   
                setChats(prev=>{
                  return [...prev, res]
                });
              });

              connection.on('OnDeleteMessage', id => {
                setMethod({id: id, case: "delete"});
              });             

              connection.on('GetChats', getchats=>{ 
                setChats(getchats);  
              });

              connection.on('UserDisconnect', id => {
                setMethod({id: id, case: "workWithConn"});
              });    

              connection.on('UserConnect', id => {
                setMethod({id: id, case: "workWithConn"}); 
              });    

              connection.on('OnEditMessage', res => {
                setMethod({obj: res, case: "editMessage"});
              }); 

              connection.on('ChatDeleted', id => {
                setMethod({id: id, case: "deleteChat"});
              }); 
            })
            .then(()=>{
              connection.invoke("GetChats", parseInt(user.id, 10)).catch((err) => console.error(err));
            });
      }                     
}, [connection]);

useEffect(()=>{
  if(connection){         
    connection.invoke("getChatMessages", currchatId).catch((err) => console.error(err));
    
    connection.on('CurrentChatMessages', res=>{
      setMessages(res);
    });   

    if (chats.find(e=>e.id == currchatId)!=undefined) {
      let mem = chats.find(e=>e.id == currchatId).users;
      setMembers(mem);
    }

  }
}, [currchatId]);

const sendMessage = (data) => { 

  window.removeEventListener('beforeunload', ()=>{
    onclose();
  });

  const chatMessage = {
    Id: data.id,
    Sender: user,
    ChatId: currchatId,
    Content: data.content,
    IsReaded: false
  };

  if (connection && data.content!=' ' && data.content.length > 0) {
      try {
         connection.send('SendMessage', chatMessage);
      }
      catch(e) {
          console.log(e);
      }
  }

  window.addEventListener('beforeunload', ()=>{
    onclose();
  });
}

  useEffect(()=>{
    if (method === null) {
      return;
    }

    if (method.case === "delete") {
      if(messages!=null){
        let editedM = messages.filter(item => item.id !== method.id)
        setMessages(editedM);
        setLastMessage(messages[messages.lenght])
      }
    }
    else if(method.case === "workWithConn"){  
      let editedchat = [...chats];
      editedchat.forEach(chat => {
        chat.users.forEach(user => {
          if (user.id === method.id) {
            user.status = !user.status;
          }
        });
      });
      setChats(editedchat);
    }
    else if (method.case === "editMessage") {
      console.log(messages);
      if(messages!=null){
        const newArray = [...messages];
        const index = newArray.findIndex((item) => item.id === method.obj.id);
        newArray[index] = { ...newArray[index], content: method.obj.content };

        setMessages(newArray);
        setLastMessage(messages[messages.lenght])
      }
    }
    else if(method.case === "deleteChat"){
      const index = chats.findIndex(obj => obj.id === method.id);
      const edited = [...chats]; 
      if (index !== -1) {
        edited.splice(index, 1);
        setChats(edited); 
        setCurrchatId(null);
        setMessages(null);
      }
    }
  }, [method])


  function chatdelete() {
    connection.invoke("DeleteChat", currchatId).catch((err) => console.error(err));
  }

  return (
    <div className="main-container">
      <ModalWindow getJwt={getJwt} modalType={modalType} setModalType={setModalType}/>
      <Chatsblock connection={connection} user={user} setCurrchatId={setCurrchatId} chats={chats} setUser={setUser} currchatId={currchatId}/>
      <Displblock connection={connection} chatdelete={chatdelete} user={user} sendMessage={sendMessage} messages={messages} members={members} />
    </div>
  );
}

export default App;
