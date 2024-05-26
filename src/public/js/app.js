const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

//front end
// 서버 연결 및 window.location.host: 현재 서버 위치
// app.js의 socket은 서버로의 연결을 뜻함
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
    console.log("Connected to Server. ✅");
}

socket.addEventListener("open", handleOpen);

// front -> backend message send
socket.addEventListener("message", (message) => 
{
    console.log("New message: ", message.data)
});

socket.addEventListener("close", ()=> {
    console.log("Disconnected from Server ❎");
});
/*
setTimeout(() => {
    socket.send("hello from the browser!")
}, 10000);
*/

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
