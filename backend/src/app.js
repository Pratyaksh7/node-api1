require("dotenv").config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const connectDB = require('./db/conn')

// Connect to database
connectDB();

const app = express();

const Register = require('./models/registers');

const port = process.env.PORT || 3000;

// const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false})); // urlextended is used to receive the data from the html form whereas in postman it is not required

// app.use(express.static(static_path));
app.set("views", template_path);
app.set("view engine","hbs");
hbs.registerPartials(partials_path);

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

// register a new user from here
app.post('/register', async(req, res) => {
    try {
        const p1 = req.body.password1;
        const p2 = req.body.password2;

        if(p1 === p2) {
            const newUser = new Register({
                username: req.body.username,
                email: req.body.email,
                password1: req.body.password1,
                password2: req.body.password2
            })
            const u1 = await newUser.save();
            res.status(201).render('login');
        }
        else{
            res.send("Password Do not match!")
        }

    } catch(e){
        res.status(400).send(e);
    }
})

app.post('/login', async(req, res) => {
    try{
        const loginEmail = req.body.email;
        const loginPassword = req.body.password;
        const user = await Register.findOne({
            email:loginEmail,
            password1: loginPassword,
        });
        if (user) {
            res.send("User is found");
        } else {
            res.send("User not found");
        }
    } catch(e){
        res.status(404).send(e);
    }
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})