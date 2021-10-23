const express = require('express')
const app = express();
var cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('This is Node and Exploring Node Mon')
})

const users = [
    {id:1,name:'rakib',email:'arakib42@yahoo.com',phone:0178888888},
    {id:2,name:'Rajib',email:'arakib42@yahoo.com',phone:0178888888},
    {id:3,name:'rohim',email:'arakib42@yahoo.com',phone:0178888888},
    {id:4,name:'rejun',email:'arakib42@yahoo.com',phone:0178888888},
    {id:5,name:'razzak',email:'arakib42@yahoo.com',phone:0178888888},
    {id:6,name:'rupali',email:'arakib42@yahoo.com',phone:0178888888}
]

app.get('/users',(req,res)=>{
    const search = req.query.search;
    if (search){
        const searchResult = users.filter(user=>user.name.toLocaleLowerCase().includes(search))
        res.send(searchResult);
    }else{
        res.send(users)
    }
})
// Post Data
app.post('/users',(req,res)=>{
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);

    console.log('hitting the post',req.body);
    // res.send('inside post')
    res.json(newUser)
})







app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const user = users[id]
    res.send(user);
})

app.get('/fruits',(req,res)=>{
    res.send(['mango','orange','banana'])
})

app.get('/fruits/mango/fazli',(req,res)=>{
    res.send('Yemmy Yemmy Fojli')
})

app.listen(port,()=>{
    console.log('Listing to port', port);
})