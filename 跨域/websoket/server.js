let express=require('express')
let app=express();
let WebSoket=require('ws')
let wss = new WebSoket.Server({port:3000})
wss.on('connection',function(ws){
    ws.on('message',function(data){
        console.log(e.data)
        ws.send(' i love you')
    })
})
