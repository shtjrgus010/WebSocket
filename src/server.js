import express from "express";
import http from "http";
import {Server} from "socket.io";
//import WebSocket, {WebSocketServer} from "ws";
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
const httpserver = http.createServer(app);
const wsServer = new Server(httpserver);


wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
            done();
    });
});
//websocket 서버 생성
// http와 websockt 서버는 동시에 생성 가능
//const wss = new WebSocketServer({server});

// socket.send => back-end 에서 front-end 로 전달

// function onSocketClose() {
//     console.log("Disconnected from Browser ❎")
// }

// //fake database
// const sockets = [];

// wss.on("connection", (socket) => {
//     // socket: 다른 브라우저를 sockets 배열에 추가 및 저장
//     sockets.push(socket);
//     socket["nickname"] ="Anon";
//     console.log("Connected to Browswer. ✅");
//     socket.on("close", onSocketClose);
//     socket.on("message", (msg) => {
//         msg = msg.toString('utf-8')
//         const message = JSON.parse(msg);
//         switch (message.type){
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }

//     });
// });

httpserver.listen(3000, handleListen);

