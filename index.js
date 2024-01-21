const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended : true}));

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname , 'public')));

const port = 8080;

app.listen(port , ()=>{
    console.log(`this app is running on port ${port}`);
})

let posts = [
    {    
        id: uuidv4(),
        username: 'deepakgoswami',
        content: 'Working on exciting projects today!',
        gole: 'Becoming a proficient MERN full-stack developer and bringing success to my projects.',
    },
    {
        id: uuidv4(),
        username: 'rajpalgoswami',
        content: 'Collaborating with amazing colleagues.',
        gole: 'Providing a better life for my family through hard work and dedication.',
    },
    {
        id: uuidv4(),
        username: 'aditya rathod',
        content: 'Exploring new opportunities in college.',
        gole: 'Making the most out of every moment and enjoying life to the fullest.',
    }
];


app.get('/' , (req,res)=>{
     res.send(`welcome to our posts webisite`);
});

app.get('/posts' , (req,res)=>{
    // res.send(`welcome to our posts webisite`);
    res.render('index.ejs' , { posts });
});

app.get('/posts/new' , (req , res) =>{
    res.render('newpost.ejs');
})


app.get('/posts/:id' , (req,res)=>{
   let {id} = req.params;
   console.log(id);
   let post = posts.find((p)=> id === p.id)
   console.log(post);
   res.render('show.ejs' , {post})
});

app.get('/posts/:id/editpost' , (req , res) =>{

    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('editpost.ejs' , {post});
})

app.delete('/posts/:id' , (req , res) =>{

    let {id} = req.params;
     posts = posts.filter((p)=> id !== p.id);
   console.log(posts);
   res.redirect('/posts');

})

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let newgole = req.body.gole;
    
    console.log(req.body); // Log the entire body object
    console.log(id);   
        // Log the post ID
    let post = posts.find((p)=> id === p.id)
    if(post == undefined){
    console.log(`post is undefined`);
    }
    else{
        post.content = newcontent;
        post.gole = newgole;
        console.log(post);

    }
   

    res.redirect('/posts');
});



app.post('/posts' , (req , res) =>{
    console.log(req.body);
    let {username , content , gole }=req.body;
     let id = uuidv4();
    posts.push({ id ,username , content , gole });
    res.redirect('/posts');
    // res.send(`post reqest is accepted`);
})

