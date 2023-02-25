import React from 'react'
import Chat from './Chat';

export default function Chatsblock({user, chats, getChat}) {  
    function menuclick(){
        let punkts = document.querySelector('.punkts');
        if(punkts.classList.contains('showed')){
            punkts.classList.remove('showed')
        }
        else{
            punkts.classList.add('showed')
        }
    }
    
  return (
    <div className="chatsblock"> 
            <div className="chatstopblock">
                <div className="menu" onClick={menuclick}>
                    <ul className="punkts">
                        <li className="punkt"><img src="./images/account.jpg"></img><span>Account</span></li>
                        <li className="punkt"><img src="./images/logout.png"></img><span>Log out</span></li>
                    </ul>
                </div>
                <div className="search">
                    <input type="text" name="nick" className="nick" placeholder="Search"></input>
                </div>
            </div>
            <div className="chatsbottomblock">
                {chats.map(chat => <Chat key={chat.id} user={user} chat={chat} getChat={getChat}/>)}            
            </div>
        </div>
  )
}
