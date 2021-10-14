//phil welsby - 22 sept 2021 - user.controllers.js

const bcrypt = require("bcryptjs/dist/bcrypt");
const {User} = require("../user/user.model");

  //PUT        /notification
  exports.addNotification = async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { $push: { notifications: req.body.secure_url } }
      );
      res.status(200).send("notification sent");
    } catch (error) {
      res.status(500).send({ err: error});
    }
  };


  //GET      /user/list
  exports.listUsers = async (req, res) => {
    try {
        const list = await User.find({});
        res.status(200).send({allUsers: list});
    } catch (error) {
        res.status(500).send({ err: error})
    }
}

  //POST      /user
  exports.addUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(200).send({ user, token: req.token, message: "User added success"});
    } catch (error) {
      res.status(500).send(error);
    }
  }

  ///PUT       /user/update
  exports.updateUser = async (req, res) => {
    try {
      await User.updateOne(
        { email: req.body.email},
        {$set: {[req.body.key]: req.body.update } }  //THIS DIDN'T WORK???? ASK ANDY
        // {$set: { password: req.body.password} }
      );
      res.status(200).send({ message: "Successfully Updated..."})
    } catch (error) {
      res.status(500).send(error);
    }
  }

  //DELETE      /user/[user email]
  exports.deleteUser = async (req, res) => {
    try {
      const email = req.params.email //THIS LINE MISSING IN VIDEO???
      await User.deleteOne({email: req.params.email});
      res.status(200).send({message: `${email} deleted`})
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // POST       /user/login
  exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send({ user, message: "Log In Successful" });
            console.log(`${user.name} has logged in`) //output to terminal
        } else {
            throw new Error();
        }
    } catch (error) {
        res.status(500).send({error, MESSAGE: "AN ERROR HAS OCCURED IN login BACKEND - CHECK USERNAME AND PASSWORD"});
    }
};

  //GET      /user
  exports.tokenLogin = (req, res) => {
    try {
      res.status(200).send(req.user) //NOTE: req.user came from decodeToken in middleware
    } catch (error) {
      res.status(500).send(error)
    }
  }

  
