//phil welsby - 22 sept 2021 - guitar.routes.js

const {Router} = require("express");
const helloRouter = Router();
const {listUsers, addUser, updateUser, deleteUser, login, tokenLogin} = require("../user/user.controllers")
const {hashPassword, decryptPassword, createToken, decodeToken} = require("../middleware")

helloRouter.get("/user", decodeToken, tokenLogin)
helloRouter.get("/user/list", listUsers)
helloRouter.post("/user", hashPassword, createToken, addUser);
helloRouter.post("/user/login", decryptPassword, createToken, login);
helloRouter.put("/user/update", hashPassword, updateUser)
helloRouter.delete("/user/:email", deleteUser)

module.exports = helloRouter;

