const express = require('express');
const User = require('./models/User');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const wrapAsync = require('../utility/WrapAsync');

const app = express();
const PORT = 4000;

const URL = 'mongodb://127.0.0.1:27017/User';
main().then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log(e);
});

async function main() {
    await mongoose.connect(URL);
}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', wrapAsync(async (req, res) => {
    let listing = await User.find();
    res.render('index', { listing });
}));

app.get('/contacts', (req, res) => {
    res.render('new-user.ejs');
});

app.post('/contacts', wrapAsync(async (req, res) => {
    let newUser = new User(req.body.User);
    console.log(newUser);
    await newUser.save();
    res.redirect('/');
}));

app.get('/contacts/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.render('edit.ejs', { user });
}));

app.put('/contacts/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, company, jobTitle } = req.body;

    const user = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, email, company, jobTitle },
        { new: true }
    );

    console.log("User updated successfully:", user);
    res.redirect('/');
}));

app.delete('/contacts/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.redirect('/');
}));

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
