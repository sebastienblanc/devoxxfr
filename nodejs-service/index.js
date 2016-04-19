var Keycloak = require('keycloak-connect');
var express = require('express');
var session = require('express-session');
var cors = require('cors');

var app = express();

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use( session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
} ))

app.use(cors());

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloak = new Keycloak({
  store: memoryStore
});

// Install the Keycloak middleware.
//
// Specifies that the user-accessible application URL to
// logout should be mounted at /logout
//
// Specifies that Keycloak console callbacks should target the
// root URL.  Various permutations, such as /k_logout will ultimately
// be appended to the admin URL.

app.use( keycloak.middleware( {
  logout: '/logout',
  admin: '/',
} ));


app.get('/product', keycloak.protect(), function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('["iphone","ipad","ipod"]');
});


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
