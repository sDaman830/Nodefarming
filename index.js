const fs = require('fs');
const http = require('http');
const url = require('url');
// const textin = fs.readFileSync('./txt/input.txt', 'utf-8')
// const hello = 'Hello world';
// console.log(textin);

// Server
const replateTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIP%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, `not-organic`);
    return output;
}
const data = fs.readFileSync('./dev-data/data.json', 'utf-8', (err, data) => {


});
const tempOverview = fs.readFileSync(`/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-overview.html`, `utf-8`);

const tempcard = fs.readFileSync(`/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-overview.html`, `utf-8`);
const tempProduct = fs.readFileSync(`/Users/damanpreetsinghghatoura/Desktop/Nodefarming/templates/template-product.html`, `utf-8`);
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    // res.end('Hello from the server');
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replateTemplate(tempcard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        console.log(tempOverview);
        res.end(output);

    } else if (pathName === '/product') {
        res.end('This is the product page');

    } else if (pathName === '/api') {

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(productData));


        //res.end('API');
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