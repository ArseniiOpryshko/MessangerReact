import React, { useEffect } from 'react'

export default function Settings({setCurPage, curPage, user, accountImage}) {
    
    useEffect(()=>{
        let a = document.querySelectorAll('.accountblock'); 
        if (curPage == 1) {
            a[0].classList.add('on');
        }
        else{
            a[0].classList.remove('on');
        }
        
    }, [curPage])

    useEffect(()=>{
        document.querySelector(".accImg").src = "data:image/png;base64," + accountImage;
    }, [accountImage])
    
  return (
    <div className="accountblock">
        <div className="chatstopblock">
            <button onClick={()=>{setCurPage(0)}} className="back-btn">
                &#8617;
            </button>
            <p>Settings</p>              
        </div>
        <div className="imgblock">
            <img className='accImg' src="/images/forest.jpg" alt=""></img>
            <div className="databl">
                <h3>{user!=null?user.name:""}</h3>
                <p>online</p>
            </div>
        </div>
        <div className="listitems">
            <div className="item">
                <img src="/images/email.png" alt=""></img>
                <div className="iteminner">
                    <h3>{user!=null?user.login:""}</h3>
                    <p className="status">Login</p>
                </div>
            </div>
            <div onClick={ ()=>{ setCurPage(2) } } className="item edit">
                <img src="/images/editicon.png" alt=""></img>
                <div className="iteminner">
                    <h3>Edit profile</h3>
                </div>
            </div>
        </div>
    </div>
  )
}
