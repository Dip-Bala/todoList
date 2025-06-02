const express = require("express")
const path = require('path');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { z } = require("zod/v4")
const {UserModel, TodoModel} = require("./db")
const app = express()
const secret = "iykyk"

mongoose.connect("mongodb+srv://dipanwitabala02:GYG645JwxwDP2GuW@cluster0.1o4mm2o.mongodb.net/todo-app-database")

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

function auth(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, secret);

    if(decoded){
    //    const user = await mongoose.findOne(decoded.userId);
       req.userId = decoded.userId;
       next()
    }
    else{
        res.status(403).json({
            "message" : "incorrect credentials"
        })
    }

}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../public/index.html")
})

app.post("/signup", async(req, res) => {
    console.log("ok")
    const requiredBody = z.object({
        email : z.email(),
        password : z.string().min(4).max(32).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$'), {
            message:
                'Password must be at least 4 characters and contain an uppercase letter, lowercase letter, and number'
        }),
        name: z.string().min(3).max(100)
    })

    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        // res.json("incorrect format")
        // console.log(parsedData.error.message)
        return res.send(parsedData.error.message)
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, saltRounds=5)
    try{
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        // console.log("you are signed up")
        res.status(200).json("you are signed up")
    }
    catch(e){
        // console.log("Email already signed up")
        res.status(403).json({
            "message": "Email already signed up"
        })
    }


})

app.post("/signin", async(req, res) => {
    const requiredBody = z.object({
        email : z.email(),
        password : z.string().min(4).max(32).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$'), {
            message:
                'Password must be at least 4 characters and contain an uppercase letter, lowercase letter, and number'
        })
    })

    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        return res.send(parsedData.error.message)
    }

    const email = req.body.email;
    const password = req.body.password;


    const user = await UserModel.findOne({
        email: email
    })
    if(!user){
        res.json({
            "messsage" : "Email not found"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
        const token = jwt.sign({
            userId : user._id  //Harkirat has used toString on  user._id to parse the obj to string, i have not but it's working fine
        }, secret);
        res.json({token: token})
    }
    else{
        res.status(403).json({
            message: "Incorrect password"
        })
    }

})
app.get("/todo.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/todo.html"));
});

app.post("/todo", auth, async(req, res) => {
    const userId = req.userId;
    const description = req.body.description;
    if(description){
        await TodoModel.create({
            userId,
            description
        })
        res.json({
            "message" : "done"
        })

    }else{
        res.status(403).send("Can not add black task")
    }
})

app.get("/todos", auth, async(req, res) => {
    const userId = req.userId;
    const data = await TodoModel.find({userId : userId});
    
    res.json({
        data 
    })
})

app.delete("/delete-todo", auth, async (req, res) => {
  const userId = req.userId;
  const description = req.query.description; // safer to send via query in DELETE

  try {
    const result = await TodoModel.deleteOne({ description: description, userId: userId });
    if (result.deletedCount === 0) {
      return res.status(404).send("Todo not found or unauthorized");
    }
    res.status(200).send("Delete Successful");
  } catch (e) {
    res.status(500).send("Server error");
  }
});


app.listen(3000)