import React, { useEffect } from 'react'

export default function EditProfile({setCurPage, curPage}) {
    useEffect(()=>{
        let a = document.querySelectorAll('.accountblock'); 
        console.log(a)
        if (curPage == 2) {
            a[1].classList.add('on');
        }
        else{
            a[1].classList.remove('on');
        }
        
    }, [curPage])
    return (
            <div className="accountblock">
                <div className="chatstopblock">
                    <button onClick={()=>{setCurPage(1)}} className="back-btn">
                        &#8617;
                    </button>
                    <p>Edit profile</p>              
                </div>
                <div className="editlist">
                    <div className="imgselect">
                        <div className="round">
                            <input type="file" accept="image/png, image/jpeg"></input>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label>Name</label>
                        <input name="name" type="text" className="datainpit" required></input>
                    </div>
                    <div className="input-wrapper ">
                        <label>Login</label>
                        <input name="login" type="text" className="datainpit" required></input>
                    </div>
                    <button>Confirm changes</button>     
                </div>
            </div>
        
    )
}
