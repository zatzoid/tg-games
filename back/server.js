
const express = require('express');
const cors = require('cors');
const  routes  = require('./routes');
const PORT = 3000;

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', routes);



app.listen(PORT, () => console.log(`server started on port ${PORT}`))


//data: {actionType: string, actionData:{port: number, wss: websocket}}
