const fs = require('fs');
const http = require('http');
const url = require('url');
// const textin = fs.readFileSync('./txt/input.txt', 'utf-8')
// const hello = 'Hello world';
// console.log(textin);

// Server
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    // res.end('Hello from the server');
    if (pathName === '/' || pathName === '/overview ') {
        res.end('this is the overview');

    } else if (pathName === '/product') {
        res.end('This is the product page');

    } else if (pathName === '/api') {

    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>page not found</h1>');//browser expects hrml
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to req on port 8000');
});