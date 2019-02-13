const express = require('express');

const config = require('./server/config');

// Database connect
require('./database');

// Server listen
const app = config(express());

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});