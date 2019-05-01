const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../../models/User");
const Person = require("./../../models/Person");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.json({ status: 401, email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,

        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser)
            .then(user => res.json({ success: "Thank you for Register" }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    console.log(user);
    if (!user) {
      return res.json({
        status: 401,
        errors: "Email and Password does not match."
      });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        req.session.name = {
          id: user._id,
          firstName: user.firstName
        };

        res.send({
          token: req.session.name.id,
          firstName: req.session.name.firstName
        });
      } else {
        return res.json({
          status: 401,
          errors: "Password incorrect"
        });
      }
    });
  });
});

router.post("/checkUser", (req, res) => {
  const email = req.body.email;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.json({ status: 401, email: "Email already exists" });
    } else {
      return res.json({ status: 200 });
    }
  });
});

router.post("/checkPerson", (req, res) => {
  const email = req.body.email;
  console.log(email);
  Person.findOne({ email }).then(person => {
    console.log(person);
    if (person) {
      return res.json({ status: 401, email: "Email already exists" });
    } else {
      return res.json({ status: 200 });
    }
  });
});

router.get("/currentuser", (req, res) => {
  if (req.session.name) {
    return res.json({
      token: req.session.name.id,
      firstName: req.session.name.firstName
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  if (!req.session) {
    return res.json({
      status: "success"
    });
  }
});

router.get("/:search", (req, res) => {
  if (req.session.name) {
    if (req.params.search != "undefined") {
      Person.find({
        $or: [
          { firstName: { $regex: new RegExp(req.params.search, "i") } },
          { lastName: { $regex: new RegExp(req.params.search, "i") } },
          { email: { $regex: new RegExp(req.params.search, "i") } }
        ],
        uid: req.session.name.id
      })
        .then(result => {
          console.log(result);
          res.json(result);
        })
        .catch(err => {
          res.json({
            errors: err
          });
        });
    } else {
      Person.find({
        uid: req.session.name.id
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json({
            errors: err
          });
        });
    }
  } else {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

router.post("/addUser", (req, res) => {
  if (req.session.name) {
    Person.findOne({ email: req.body.email }).then(person => {
      if (person) {
        return res.json({ status: 200, email: "Email already exists" });
      } else {
        const newPerson = new Person({
          uid: req.session.name.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone
        });

        Person.create(newPerson)
          .then(person => res.json({ success: "Record added successfully" }))
          .catch(err => console.log(err));
      }
    });
  } else {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

router.get("/getUser/:id", function(req, res) {
  if (req.session.name) {
    Person.findById(req.params.id).then(person => {
      if (!person) {
        return res.json({ status: 200, errors: "User not Found" });
      } else {
        return res.json(person);
      }
    });
  } else {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

router.get("/searchUser/:search", function(req, res) {
  if (req.session.name) {
    console.log(req.params.search);
    Person.find({ firstName: req.params.search }).then(person => {
      console.log(person);
      /* if (!person) {
        return res.json({ status: 200, errors: "User not Found" });
      } else {
        return res.json(person);
      } */
    });
  } else {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

router.put("/editUser/:id", function(req, res) {
  if (req.session.name) {
    Person.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
      },
      (err, person) => {
        if (err) return res.json({ errors: "there is errors" });
        res.json(person);
      }
    );
  } else {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

router.delete("/deleteUser/:id", function(req, res) {
  if (req.session.name) {
    Person.findByIdAndRemove(req.params.id, (errors, person) => {
      if (errors) return res.status(500).send(errors);

      const response = {
        success: "Record deleted successfully"
      };
      return res.status(200).send(response);
    });
  } else {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

router.get("/checkAuth", (req, res) => {
  if (!req.session) {
    return res.json({
      status: 401,
      errors: "User is not Authorize"
    });
  }
});

module.exports = router;
