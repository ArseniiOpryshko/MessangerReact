import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chat';
import EditProfile from './EditProfile';
import FoundUser from './FoundUser';
import Settings from './Settings';

export default function Chatsblock({user, chats, setCurrchatId, connection}) {  

    const searchText = useRef(null);
    const [foundUsers, setFoundUsers] = useState(null); 
    const [curPage, setCurPage] = useState(0);
    const [accountImage, setAccountImage] = useState(null);


    function getImg(){
        if(user && connection && connection._connectionState == 'Connected'){
            connection.invoke("GetAccountImage", user.id).catch((err) => console.error(err));
        } 
    }

    useEffect(()=>{
        if(connection){
            connection.on("SearchResult", res=>{
                setFoundUsers(res);
            });
            connection.on("Image", res=>{
                setAccountImage(res);
            });
        } 
    }, [connection]);

    function onChangeSearch(){
        if(connection){
            connection.invoke("searchResult", searchText.current.value, user.id).catch((err) => console.error(err));
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

        if (punkts.classList.contains('showed')) {
            document.querySelector('.main-container').addEventListener('click', () => punkts.classList.remove('showed'), { once: true });
        }
    }
    
    const logout = () => {
        localStorage.removeItem("jwttoken");
        window.location.reload()
    }
    
    return (
        <div className="chatsblock"> 
                <Settings setCurPage={setCurPage} curPage={curPage} user={user} accountImage={accountImage}/>
                <EditProfile setCurPage={setCurPage} curPage={curPage} user={user} accountImage={accountImage} getImg={getImg}/>

                <div className="chatstopblock">               
                    <div className="menu" onClick={menuclick}>
                        <ul className="punkts">
                            <li onClick={()=>{setCurPage(1); getImg()}} className="punkt"><img src="/images/account.jpg"></img><span>Details</span></li>
                            <li onClick={logout} className="punkt"><img src="./images/logout.png"></img><span>Log out</span></li>
                        </ul>
                    </div>
                    <div className="search">
                        <input ref={searchText} onChange={onChangeSearch} type="text" name="nick" className="nick" placeholder="Search"></input>
                    </div>
                </div>
                <div className="chatsbottomblock">
                    { foundUsers != null ? "Global Search" : "Your chats"}
                    { foundUsers != null ? 
                    foundUsers.map(found => <FoundUser key={found.id} found={found} user={user} connection={connection} setFoundUsers={setFoundUsers}/>) : 
                    chats.map(chat => <Chat key={chat.id} user={user} chat={chat} setCurrchatId={setCurrchatId}/>) }         
                </div>
            </div>
      )
}
