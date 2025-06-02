const mongoose =  require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password : String,
    name : String,

})

const Todos = new Schema({
    description : String,
    userId : ObjectId
})

const UserModel = mongoose.model("users", User); //(Collection, Schema)
const TodoModel = mongoose.model("todos", Todos);

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}