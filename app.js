const express = require('express');
const morgan =require('morgan');
//express app
const app = express();
//register view engine
app.set('view engine', 'ejs')
//listen for request

app.listen(3000,()=>{
        console.log('the server is starting..');
        
});
//middleware & static file(image,styles....)
app.use(express.static('public'))
app.use(morgan('tiny')) //use this instade of using next parameter
// app.use((req,res,next)=>{
//     console.log('new request mad: ');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     next();
    
// });
//  app.use((req,res,next)=>{
//     console.log('in the next middleware');
   
//     next();
    
// });
  //to read the file
app.get('/',(req,res)=>{
    //res.send('<p>Home pages</p>');
    //res.sendFile('./views/index.html',{root: __dirname})
    res.render('index' ,{title :'Home'})
})

app.get('/about',(req,res)=>{
   // res.send('<p>about pages</p>');
   res.render('about' ,{title :'About'})
});
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title :'Create'})
})
app.use((req,res)=>{
    // res.send('<p>about pages</p>');
     //res.sendFile('./views/404.html',{root: __dirname})
     res.status(404).render('404',{title :'404'})
 });