
const express=require('express');
const User=require('./models/User')

const mongoose=require('mongoose');
const methodOverride=require('method-override')
const path=require ('path');
const ejsMate=require ('ejs-mate');

const app=express();
const PORT=4000;

const URL='mongodb://127.0.0.1:27017/User'
main().then(()=>{
    console.log("connection success");

}).catch((e)=>{
    console.log(e);

})

async function main(){
    await mongoose.connect(URL);

}
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')));

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}))



app.use(methodOverride('_method'));
app.get('/', async (req, res) => {
    try {
        
        let listing = await User.find(); 

        res.render('index', { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching user data');
    }
});


app.get('/contacts', (req, res) => {
    res.render('new-user.ejs');
    
});

app.post('/contacts',async(req,res)=>{
    try{
    let newUser=new User(req.body.User);
    console.log(newUser)
    await newUser.save()
    res.redirect('/')
    }
    catch(e){
        res.send("somthing went wrong",e)
    }

})

app.get('/contacts/:id', async (req, res) => {
    try {
        const {id}  = req.params;
        const user = await User.findById(id);
        console.log(user)

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render('edit.ejs', { user });
    } catch (err) {
        console.error(err);  
        res.status(500).send("Error fetching user for edit.");
    }
});

app.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, company, jobTitle } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, email, company, jobTitle },
            { new: true } 
        );

       

        console.log("User updated successfully:", user);
        res.redirect('/'); 
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user");
    }
});



app.delete('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.redirect('/'); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
});









app.listen(PORT,()=>{
    console.log(`app is listen on port ${PORT}`)
})