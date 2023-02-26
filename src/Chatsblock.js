import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chat';
import FoundUser from './FoundUser';

export default function Chatsblock({user, chats, setCurrchatId, connection}) {  

    const searchText = useRef(null);
    const [foundUsers, setFoundUsers] = useState(null); 
    useEffect(()=>{
        if(connection){
            connection.on("SearchResult", res=>{
                setFoundUsers(res);
                console.log(res)
            });
        } 
    }, [connection]);

    function onChangeSearch(){
        if(connection){
            connection.invoke("searchResult", searchText.current.value).catch((err) => console.error(err));
            
            
        }
    }

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
                    <input ref={searchText} onChange={onChangeSearch} type="text" name="nick" className="nick" placeholder="Search"></input>
                </div>
            </div>
            <div className="chatsbottomblock">
                { foundUsers != null ? "Global Search" : "Your chats"}
                { foundUsers != null ? foundUsers.map(found => <FoundUser key={found.id} found={found} />) : 
                chats.map(chat => <Chat key={chat.id} user={user} chat={chat} setCurrchatId={setCurrchatId}/>) }         
            </div>
        </div>
  )
}
