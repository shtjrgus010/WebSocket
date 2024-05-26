const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

//front end
// 서버 연결 및 window.location.host: 현재 서버 위치
// app.js의 socket은 서버로의 연결을 뜻함
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}


function handleOpen() {
    console.log("Connected to Server. ✅");
}

socket.addEventListener("open", handleOpen);

// front -> backend message send
socket.addEventListener("message", (message) => 
{
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
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
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}


messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
