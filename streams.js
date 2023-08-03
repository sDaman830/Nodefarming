const fs = require('fs');
const server = require('http').createServer();
server.on('request', (req, res) => {
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });
    const readable = fs.createReadStream('test-file.txt')
    //readable stream emmits a data event so we can listen for it
    readable.on('data', chunk => {
        res.write(chunk);
        //chunck is a writable stream sending data chunk by chunk
    })
    readable.on('end', () => {
        res.end();//signifies no more data will be written to this stream
    })
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening...")
})