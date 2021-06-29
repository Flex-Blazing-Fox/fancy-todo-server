const express = require('express');
const routers = require('./routers');
const app = express()
const PORT = 3000;


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routers)

app.listen(PORT,()=>{
    console.log(`app listen to port ${PORT}`);
})