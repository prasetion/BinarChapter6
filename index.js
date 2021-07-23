  const { response } = require("express")
  const express = require("express")
  const app = express()
  const port = 3000

  //   route
  const score = require("./routes/score")
  const user = require("./routes/user")
  const api = require("./api/api")

  //   model
  const db = require("./models")
  let loginState = false;

  // set view engine
  app.set('view engine', 'ejs');

  app.use("/public", express.static(__dirname + "/public"));

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use("/dashboard/score", score)
  app.use("/dashboard/register", user)
  app.use("/api/v1/users", api)

  // login
  app.get("/login", (request, response) => {
      loginState = false;
      response.render("login")
  })

  app.post('/login', (req, res) => {
      const { username, password } = req.body;
      db.user_game.findOne({
          where: { user_name: username, user_pass: password, admin: true }
      }).then(result => {
          if (result) {
              console.log("success login");
              loginState = true;
              res.redirect('/dashboard')
              return;
          } else {
              console.log("fail login");
              loginState = false;
              res.render('login', {
                  message: 'Invalid username or password',
              });
          }
      })

  });

  let allUsers = [];

  //   dashboard
  app.get("/dashboard", (req, res) => {
      //   if (loginState)
      db.user_game.findAll({
          where: { admin: false },
          include: [db.user_history, db.user_biodata]
      }).then(result => {
          allUsers = Array.from(result);
          res.render("dashboard", {
              allUsers
          })
      });

      //   else
      //       res.redirect('/login');
  })

  //   dashboard
  app.post("/dashboard", (req, res) => {

      db.user_game.findAll({
          include: [db.user_history, db.user_biodata]
      }).then(result => {

          let users = [];

          result.forEach(user => {
              if (req.body.fullname === user.user_biodatum.full_name) {
                  users.push(user);
                  console.log("add user " + user.user_name);
              }
          });

          allUsers = Array.from(users);
          res.render("dashboard", {
              allUsers
          })

      });

  })

  //   //   test
  app.get("/test", (req, res) => {
      db.user_game.findAll({
          where: {
              admin: false
          },
          include: [db.user_history, db.user_biodata]
      }).then(result => {
          res.send(result);
          console.log(result);
      })
  })

  // kalau misal endpoint gak ada
  app.use(function(req, res) {
      res.status(404);
      res.send({
          status: "page gak ada bro!!",
      })
  });

  // error handling, kalau dari apps ada error
  app.use(function(err, req, res, next) {
      console.log("ada error");
      res.status(500).send({
          status: "fail",
          error: err.message
      })
  })

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))