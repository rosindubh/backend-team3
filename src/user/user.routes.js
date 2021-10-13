//phil welsby - 22 sept 2021 - guitar.routes.js

const {Router} = require("express");
const helloRouter = Router();
const {listUsers, addUser, updateUser, deleteUser, login, tokenLogin, addNotification} = require("../user/user.controllers")
const {hashPassword, decryptPassword, createToken, decodeToken} = require("../middleware")

helloRouter.get("/user", decodeToken, tokenLogin)
helloRouter.get("/user/list", listUsers)
helloRouter.post("/user", hashPassword, createToken, addUser);
helloRouter.post("/user/login", decryptPassword, createToken, login);
helloRouter.put("/user/update", hashPassword, updateUser)
helloRouter.delete("/user/:email", deleteUser)
helloRouter.put("/user/notification", addNotification)

module.exports = helloRouter;

//User.findOneAndUpdate({username: req.body.username}, {$push: {notifications: req.body.publicID}}) (edited) 