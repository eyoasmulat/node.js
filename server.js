const http = require('http');
const fs = require('fs');
const _= require('lodash');

const server = http.createServer((req, res) => {

    //lodash
      const num = _.random(0,20);
      console.log(num);

//lodash
const great= _.once(()=>{
    console.log("hello");
})
  great();
  great();

    console.log(req.url, req.method);
    
    let path = './views/';
    
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode= 200; //the code is ok 
            break;
        case '/about':
            path += 'about.html';
            res.statusCode= 200; //the code is ok(sucess code) 
            break;
        default:
            path += '404.html';
            res.statusCode= 404; //the code is not  ok 
            break;   
    }

    // Set the Content-Type header before sending the response
    res.setHeader('Content-Type', 'text/html');

    // Read the HTML file and send the response
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            // res.statusCode=500; //the server has error
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Internal Server Error');
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log("The server is running...");
});
