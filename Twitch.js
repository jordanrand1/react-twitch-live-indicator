import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const pulse = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
`

const bounce = keyframes`
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
`

const TwitchText = styled.p`
  color: white;
  padding-left: 50px;
  display: none;
  transition: 1s;
`

const TwitchContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 20px;
  background-color: #9146FF;
  width: auto;
  height: 100px;
  border-radius: 75px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-around;
  &:hover ${TwitchText} ${RedDot} {
    display: block;
    transition: 1s;
  }
  $:hover ${RedDot} {
    top: 10px; 
    right: 190px !important;
  }
`

const RedDot = styled.div`
  width: 20px;
  height: 20px; 
  background-color: red; 
  border-radius: 50%; 
  position: absolute; 
  top: 10px; 
  right: 15px;
  animation: ${bounce} 1s infinite;
`

const Twitch = () => {

  const [isTwitchOnline, setIsTwitchOnline] = useState(false);
  const [twitch, setTwitch] = useState();
  
  const syncTwitch = (data) => {
      setIsTwitchOnline(data.length > 0);
      setTwitch(data)
  }

  setInterval(async () => {
      let response = await axios.get('https://api.twitch.tv/helix/streams?user_id=ENTER_YOUR_CHANNEL_ID', {
      headers: {
          "Client-Id": "ENTER_YOUR_CLIENT_ID"
      }
      }).then((res) => syncTwitch(res.data.data))
      .catch((err) => console.log(err))
      return response
  }, 10000)

  return (
    <>
      <TwitchContainer>

        <i class="fab fa-twitch" style={{fontSize: '80px', textAlign: 'center', color: 'white', padding: '5px'}}>
          {isTwitchOnline ?
            <RedDot></RedDot>
            :<></>}
        </i>
        <TwitchText>Blerp is {isTwitchOnline ? 'Online' : 'Offilne'}</TwitchText>
      </TwitchContainer>
    </>
  )
}

export default Twitch;
