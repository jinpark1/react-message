require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const pgSession = require('connect-pg-simple')(session);
const http = require('http');
//Route files 
const userRoutes = require('./routes/userRoutes');
const thirdPartyAPIRoutes = require('./routes/thirdPartyAPIRoutes');
// const workspaceRoutes = require('./routes/workspaceRoutes');
// const groupRoutes = require('./routes/groupRoutes');
// const channelRoutes = require('./routes/channelRoutes');
//Define your port 
const PORT = 4000;
const app = express();
//SOcket server
const io = require('socket.io')(http.Server(app));
//import channelClass from the channelClass...js file 
const { Channel } = require('./helper/channelClass');
//import your sockets

massive(process.env.CONNECTION_STRING).then(database => {
    //Set your database to your app
    app.set('db', database);
}).catch(err => console.log('Database Connection Error-------------', err));

//Mounts your routes using app.use with base route and routes
app.use('/user', userRoutes);
app.use('/api', thirdPartyAPIRoutes);
// app.use('/workspaces', workspaceRoutes);
// app.use('/groups', groupRoutes);
// app.use('/channels', channelRoutes);

//Define your app-level middleware 
app.use(bodyParser.json());


app.use(session({
    store: new pgSession({
        conString: process.env.CONNECTION_STRING,
        tableName: "session"
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))


require('./socket/socket')(io, Channel);
///Now listen on that port.
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));