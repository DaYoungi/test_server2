const express = require('express')
// const { Socket } = require('socket.io')
const app = express()

const http =  require('http').createServer(app)
const io = require('socket.io')(http, {cors:{origin:"*"}})

let userInfo = []





io.on('connection',(socket)=>{
    console.log("user connected")

    socket.on('disconnect',()=>{

        const user = userInfo.find(c=>c.id == socket.id)
        console.log(user)
        socket.broadcast.emit('msg',{level:"sys", msg:user.nickName+"님이 퇴장하였습니다"})
    })

    socket.on('login',(nickName)=>{

        const info ={
            nickName:nickName,
            id:socket.id
        } 
        userInfo.push(info)
        io.emit('msg',{level:"sys" ,msg:nickName+"님이 입장하였습니다"})
    })

    socket.on('send',({nickName:nickName, msg:msg1})=>{
        // io.emit('msg',{msg:msg1})
        socket.broadcast.emit('msg',{level:"", msg:msg1, nickName:nickName})
    })
})

http.listen(process.env.PORT || 3000  , ()=>{
    console.log("connected on server port 3000")
}) 