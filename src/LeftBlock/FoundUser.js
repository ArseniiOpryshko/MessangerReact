import React, { useEffect } from 'react'

export default function FoundUser({found, connection, user, setFoundUsers}) {

    function createChat(){
        connection.invoke('CreateChat', found.id, parseInt(user.id, 10)).catch((err) => console.error(err));
        setFoundUsers(null)
    }

  return (
    <div className="chat" onClick={createChat}>
        <button className="found" >
            <img className="circular-img" src="./images/forest.jpg" />
            <div className="chatinnerflex">
                <div className="chattop">
                    <span className="name">{found.name}</span>
                    <span className="lasttime"></span>
                </div>
                <div className="chatbottom">
                    <span className="lasttext">@{found.login}</span>     
                                 
                </div>
            </div>
        </button>
    </div>
  )
}
