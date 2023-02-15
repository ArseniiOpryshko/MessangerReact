import React, {useState} from "react";
import Chatsblock from "./Chatsblock";
import Displblock from "./Displblock";

function App() {
  const [chats, setChats] = useState([{id: 1, name:"NameUser", lasttime: "17.08", lastmessage:"Some ytext", newCount: 1}]);

  return (
    <div class="main-container">
      <Chatsblock chats={chats}/>
      <Displblock/>
    </div>
  );
}

export default App;
