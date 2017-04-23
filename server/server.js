var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var cors = require('cors')

var port = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'../dist')));



var server = app.listen(port,()=>{
    console.log('server started on port '+ port);
})

//socket-io
var io = require('socket.io').listen(server);

module.exports = {
    io: io , 
    http : http , 
};

var login = require('./routers/login');
var ioTimer = require('./timer/rasp_timer');
var api = require('./routers/rasp_index');
app.use('/',api.router);
app.use('/login',login.router);

app.use(redirectUnmatched);



// redirecting to home if there is no router
function redirectUnmatched(req, res) {
  res.redirect('/');
}
