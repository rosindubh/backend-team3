//phil welsby - 22 sept 2021 - guitar.routes.js

const {Router} = require("express");
const helloRouter = Router();
const {listGuitars, addGuitar, deleteGuitar, updateGuitar, listUsers, addUser, updateUser, deleteUser, login, tokenLogin} = require("../guitar/guitar.controllers")
const {testMiddle, hashPassword, decryptPassword, createToken, decodeToken} = require("../middleware")

helloRouter.get("/guitar", listGuitars);
helloRouter.post("/guitar", testMiddle, addGuitar);//Note: testMiddle is middleware
helloRouter.put("/guitar", updateGuitar);
helloRouter.patch("/guitar", updateGuitar);
helloRouter.delete("/guitar/:name", deleteGuitar)

helloRouter.get("/user", decodeToken, tokenLogin)
helloRouter.get("/user/list", listUsers)
helloRouter.post("/user", hashPassword, createToken, addUser);
helloRouter.post("/user/login", decryptPassword, createToken, login);
// helloRouter.post("/user/login", login);
helloRouter.put("/user/update", hashPassword, updateUser)
helloRouter.delete("/user/:email", deleteUser)

module.exports = helloRouter;

