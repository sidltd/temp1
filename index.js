const express = require('express');
const { User, Post } = require('./models');

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hi')
});

app.get('/users', async(req, res) => {
    let users = await User.findAll();
    res.send(users)
});

app.post('/users', async (req, res) => {
    const {
        name, email, password
    } = req.body;

    const user = await User.create({name, email, password});

    res.send(user);
});

app.get('/posts', async(req, res)=>{
    const posts = await Post.findAll({})
    res.send(posts)
})

app.post('/posts', async(req, res)=>{
    const {
        title, body, userId
    } = req.body

    const post = await Post.create({title, body, userId});
    res.send(post);
})

app.get('/posts/:userId', async(req, res) => {
    // const user = await User.findOne({ where: { id: req.params.userId } });
    const user = await User.findByPk(req.params.userId)
    const posts = await user.getPosts();

    res.send(posts);
})

module.exports = {
    app
}