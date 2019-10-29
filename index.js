const express = require('express');
const apiRouter = require('./data/router/router');

const server = express();

server.use(express.json());

server.use('/api/posts', apiRouter)

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
})