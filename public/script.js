const socket = io({autoConnect: false});
socket.connect();
// query the DOM
var handle = document.getElementById('handle')
var messageBox = document.getElementById('message-box');
var sendBtn = document.getElementById('send-btn');
var chatsDiv = document.getElementById('chats');
var isTypingDiv = document.getElementById('is-typing-div');
var leaveBtn = document.getElementById('leavechat');

function sendMessage(){
  if(messageBox.value){
    socket.emit('chat', {
     message: messageBox.value,
     handle: handle.innerHTML
 });
 }
 messageBox.value = '';
}

// create an send message event 
  //when button is clicked
sendBtn.addEventListener('click', e =>{
   sendMessage();
});

// // when enter button is pressed
messageBox.addEventListener('keyup', e =>{
  if (e.keyCode === 13){
    sendMessage();
  }
})
messageBox.addEventListener('input', e =>{
  if(handle.innerHTML){
    socket.emit('is typing', handle.innerHTML);
  }
})

// create connection event
socket.emit('online', handle.innerHTML);

// exit chat
leaveBtn.addEventListener('click', e =>{
  fetch('/leavechat')
  .then(res=>{
    res.json().then(data=>{
      socket.emit('offline', handle.innerHTML )
      if(data.user_status === "logged out"){
        location.assign('/');
      }
    });
  })
  .catch(err=>{
    console.log(err.message)
  })
})
       

// create Event Listeners
socket.on('online', client=>{
  alert(`${client} is online`);
})
socket.on('chat', (data)=>{
    chatsDiv.innerHTML += ` <p><b class="handle">${data.handle}:</b> <span id="message">${data.message}</span></p>`;
    isTypingDiv.innerHTML = '';
    
});

socket.on('is typing', handle=>{
    isTypingDiv.innerHTML = `  <p id="is-typing">${handle} is typing.....</p>
    `;
});

socket.on('offline', client=>{
  alert(`${client} has gone offline`)
})

