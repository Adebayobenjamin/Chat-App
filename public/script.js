const socket = io();
// query the DOM
var handleBox = document.getElementById('handle-box');
var messageBox = document.getElementById('message-box');
var sendBtn = document.getElementById('send-btn');
var chatsDiv = document.getElementById('chats');
var isTypingDiv = document.getElementById('is-typing-div');

// create an send message event 

sendBtn.addEventListener('click', e =>{
    if(handleBox.value && messageBox.value){
       socket.emit('chat', {
        handle: handleBox.value,
        message: messageBox.value
    });
    }
    messageBox.value = '';
});

messageBox.addEventListener('input', e =>{
  if(handleBox.value){
    socket.emit('is typing', handleBox.value);
  }
})

// create Event Listeners
socket.on('chat', (data)=>{
    chatsDiv.innerHTML += ` <p><b class="handle">${data.handle}</b> <span id="message">${data.message}</span></p>`;
    isTypingDiv.innerHTML = '';
    
});

socket.on('is typing', handle=>{
    isTypingDiv.innerHTML = `  <p id="is-typing">${handle} is typing.....</p>
    `;
})

       