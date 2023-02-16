import React from 'react'

export default function Displblock({currchat}) {
  return (
    <div class="displblock">
            <div class="displblocktop">
                <div class="biginfo">
                    <img class="circular-img-main" src="./images/forest.jpg" />
                    <div class="inf">
                        <span class="bigname">{currchat.name}</span>
                        <span class="whensee">{currchat.status}</span>
                    </div>
                </div>
                <div class="sett"></div>
            </div>
            <div class="messchat">
                <div class="messchatall">
                    <div class="message-own">
                        <p>Lorem ipsum dolor sit, amet convitae officiis! Eligendi delectus quas unde voluptatem dolore corporis repellat.</p>
                    </div>
                    <div class="message-other">
                        <p>Lorem ipsum dolor sit, amet convitae officiis! Eligendi delectus quas unde voluptatem dolore corporis repellat.</p>
                    </div>   
                </div>
                <div class="writeblock">
                    <input type="text" class="writem" placeholder="Message"></input>
                    <input type="button" class="sendbttn" value="&#10148;"></input>
                </div>
            </div>
        </div>
  )
}
