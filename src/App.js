import React, {useState} from "react";
import Chatsblock from "./Chatsblock";
import Displblock from "./Displblock";

function App() {
  const [chats, setChats] = useState(
    [
      {id: 1, name:"NameUser1", lasttime: "17.08", lastmessage:"Some ytext", newCount: 1, status:"online"},
      {id: 2, name:"Qeqeqe", lasttime: "13.08", lastmessage:"Hi bro", newCount: 3, status:"last seen 2 years ago"}
    ]
    );

  const [currchat, setCurrchat] = useState({id: 1, name:"NameUser1", lasttime: "17.08", lastmessage:"Some ytext", newCount: 1, status:"online"});

  return (
    <div class="main-container">
      <Chatsblock setCurrchat={setCurrchat} chats={chats}/>
      <Displblock currchat={currchat}/>
    </div>
  );
}

export default App;
