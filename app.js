const express = require('express');
const morgan =require('morgan');
const mongoose= require('mongoose')
const Blog = require('./models/blogs');
const { title } = require('process');
//express app
const app = express();
// connect to mongodb
const dbURI='mongodb+srv://Abush:dbu1401145@nodetutor.qdvhs.mongodb.net/desu?retryWrites=true&w=majority&appName=nodetutor';
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=> console.log('connected to db'))
.catch((err)=>console.log(err))
// const dbURI = 'mongodb+srv://<db_username>:<db_password>@nodetutor.qdvhs.mongodb.net/?retryWrites=true&w=majority&appName=nodetutor';
// mongoose.connect(dbURI)
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log('Database connection error:', err));
//register view engine
app.set('view engine', 'ejs')
//listen for request

app.listen(3000,()=>{
        console.log('the server is starting..');
        
});
//middleware & static file(image,styles....)
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}));
app.use(morgan('div')) //use this instade of using next parameter
/*
//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
   const blog = new Blog({
      title: 'new blog2',
      snippet: 'about my new blog',
      body: 'more about my blogs'
   });
   blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
        
    });
})

//used to display all the blogs store in mongodb 
app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});

//used to display single blogs by id
app.get('/single-blog',(req,res)=>{
    Blog.findById('6790fd77f0ae6fa55032f7fc')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
});  */


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
/*
  //to read the file
app.get('/',(req,res)=>{
    //res.send('<p>Home pages</p>');
    //res.sendFile('./views/index.html',{root: __dirname})
    res.render('index' ,{title :'Home'})
}) */
app.get('/',(req,res)=>{
    // res.send('<p>about pages</p>');
    res.redirect('/blogs')
 });

app.get('/about',(req,res)=>{
   // res.send('<p>about pages</p>');
   res.render('about' ,{title :'About'})
});

//blog routes
app.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index' , {title: 'All Blogs',blogs: result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

//used to add the file or create the file in the data base
app.post('/blogs',(req,res)=>{
     const blog = new Blog(req.body);

//used to save in the data base
     blog.save()
     .then((result)=>{
        res.redirect('/blogs')

     })
     .catch((err)=>{
        console.log(err);
        
     })
})
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  


app.get('/blogs/create',(req,res)=>{
    res.render('create',{title :'Create'})
})

app.use((req,res)=>{
    // res.send('<p>about pages</p>');
     //res.sendFile('./views/404.html',{root: __dirname})
     res.status(404).render('404',{title :'404'})
 });