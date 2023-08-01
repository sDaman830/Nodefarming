const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/module/replaceTemplate.js');
// Helper function to replace placeholders in the template


// Read data from data.json and template files
const data = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/dev-data/data.json', 'utf-8');
const tempOverview = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-card.html', 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    console.log(req.url);
    console.log(url.parse(req.url, true))

    const { query, pathname } = url.parse(req.url, true);
    console.log(pathname);
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);
    } else if (pathname === '/product') {
        const product = dataObj[query.id];
        console.log(product);
        const output = replaceTemplate(tempProduct, product)
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(productData));
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to req on port 8000');
});
