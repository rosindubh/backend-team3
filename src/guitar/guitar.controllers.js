//phil welsby - 22 sept 2021 - guitar.controllers.js

const bcrypt = require("bcryptjs/dist/bcrypt");
const {Guitar, User} = require("../guitar/guitar.models");

exports.listGuitars = async (req, res) => {
    try {
        const list = await Guitar.find({});
        res.status(200).send({allGuitars: list});
    } catch (error) {
        res.status(500).send({ err: error})
    }
}

exports.addGuitar = async (req, res) => {
    try {
        const guitar = new Guitar(req.body);
        await guitar.save();
        console.log(`${guitar} added by user ${req.user}`) //NOTE: req.user comes from middleware/index.js [testMiddle function]
        res.status(200).send({ guitar: guitar, message: "Successfully added guitar"});
    } catch (error) {
        res.status(500).send({ err: error})
    }
}

exports.updateGuitar = async (req, res) => {
    try {
      await Guitar.updateOne(
        { name: req.body.filter },
        { $set: { year: req.body.update } }//NOTE: Don't understand $set in this line of code (Ask Andy)
      );
      res.status(200).send({ message: `Successfully updated ${req.body.filter} to year ${req.body.update}` });
    } catch (error) {
      res.status(500).send(error);
    }
  };

exports.deleteGuitar = async (req, res) => {
    try {
      const name = req.params.name.replaceAll("_", " ")//replace all underscores in address bar with a space
      await Guitar.deleteOne({ name: name });
      res.status(200).send({ message: `successfully deleted ${name}` });
    } catch (error) {
      res.status(500).send(error);
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

  