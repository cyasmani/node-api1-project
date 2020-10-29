const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json())

const users = [
    {
        id:1,
        name: "Anakin Skywalker",
        bio: "The Chosen One"
    
    },
    {
        id:2,
        name:"Yoda",
        bio:"If so powerful you are, why leave?"
    }
]

//Post request

server.post("/api/users", (req, res) => {
    const user = {
        id: shortid.generate() + 1,
        name: req.body.name,
        bio: req.body.bio
    }

    if(!req.body.name || !req.body.bio){
        res.status(400).send({errorMessage: "Please provide name and bio for the user"})
        return;
    } else if(req.body.name && req.body.bio) {
        res.status(201)
        users.push(user)
        res.send(user)
        return;
    } else{
        res.status(500).send({errorMessage: "There was an error while saving the user to the database"})
        return;
    }

})

//Get Requests

server.get("/api/users", (req, res) => {
    if(!users) {
        res.status(500).send({errorMessage: "The users information could not be retrieved"})
        return;
    } else{
        res.send(users)
        return;
    }

})

server.get("/api/users/:id", (req, res) => {
    const user =  users.find(n => n.id === parseInt(req.params.id))
    if(!user) {
        res.status(404).send({message: "The user with the specified ID does not exist."})
    } else if(user) {
        res.send(user)
    } else {
        res.status(500).send({errorMessage: "The user information could not be retrieved."})
    }

})

//Delete Request
server.delete("/api/users/:id", (req, res) => {

    const user =  users.find(n => n.id === parseInt(req.params.id))
    if(!user) {
        res.status(404).send({message: "The user with the specified ID does not exist."})
        return
    } else if(!users){
        res.status(500).send({errorMessage: "The user could not be removed"})
    }

    const index = users.indexOf(user)
    users.splice(index, 1)
    res.send(users)

})

//Put request

server.put('/api/users/:id', (req, res) => {
    const user =  users.find(n => n.id === parseInt(req.params.id))
    if(!user) {
        res.status(404).send({message: "The user with the specified ID does not exist."})
        return
    } else if(!req.body.name || !req.body.bio){
        res.status(400).send({errorMessage: "Please provide name and bio for the user"})
        return;
    } else if(!users) {
        res.status(500).send({errorMessage: "the user information could not be modified"})
        return
    } else if(user) {
        //Updating the user
        user.name = req.body.name
        user.bio = req.body.bio
        res.status(200)
        res.send(users)
    }

})
server.listen(5000, () => console.log('Listening on port 5000'))

//Did not attempt stretch due to time constraints