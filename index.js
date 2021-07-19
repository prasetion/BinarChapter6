  const { response } = require("express")
  const express = require("express")
  const app = express()
  const port = 3000
      //   const api = require("./api/user")

  //   route
  const score = require("./api/score")

  //   model
  const { user_game } = require('./models')

  let loginState = false;

  // set view engine
  app.set('view engine', 'ejs');

  app.use("/public", express.static(__dirname + "/public"));

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // api
  //   app.use("/api/v1", api)

  //   score
  app.use("/dashboard/score", score)

  // login
  app.get("/login", (request, response) => {
      loginState = false;
      response.render("login")
  })

  app.post('/login', (req, res) => {
      const { username, password } = req.body;
      user_game.findOne({
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

  //   dashboard
  app.get("/dashboard", (req, res) => {
      if (loginState)
          user_game.findAll({
              where: { admin: false }
          }).then(result => {
              res.render("dashboard", {
                  result
              })
          });

      else
          res.redirect('/login');
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