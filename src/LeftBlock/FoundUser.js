import React from 'react'

export default function FoundUser({found}) {

  return (
    <div className="chat">
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
