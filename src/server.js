import express from "express";
import http from "http";
import WebSocket, {WebSocketServer} from "ws";
import { fileURLToPath } from "url"; 

const __dirname = fileURLToPath(new URL(".", import.meta.url)); 
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on :http://localhost:3000');

//http 서버 생성
const server = http.createServer(app);

//websocket 서버 생성
const wss = new WebSocketServer({server});
// http와 websockt 서버는 동시에 생성 가능

//Event
// sever.js 의 socket은 연결된 브라우저
// function handleConnection(socket) {
//     console.log(socket);
// }

// socket.send => back-end 에서 front-end 로 전달

function onSocketClose() {
    console.log("Disconnected from Browser ❎")
}

//fake database
const sockets = [];

wss.on("connection", (socket) => {
    // socket: 다른 브라우저를 sockets 배열에 추가 및 저장
    sockets.push(socket);
    console.log("Connected to Browswer. ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        sockets.forEach((aSocket) => aSocket.send(message));
        socket.send(message.toString('utf-8'))
    });
});

server.listen(3000, handleListen);

