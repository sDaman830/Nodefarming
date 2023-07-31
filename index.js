const fs = require('fs');
const http = require('http');
const url = require('url');

// Helper function to replace placeholders in the template
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIP%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, `not-organic`);
    }
    return output;
};

// Read data from data.json and template files
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const tempOverview = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-card.html', 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    console.log(req.url);
    console.log(url.parse(req.url, true))
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);
    } else if (pathName === '/product') {
        res.end('This is the product page');
    } else if (pathName === '/api') {
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
