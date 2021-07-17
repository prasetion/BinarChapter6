  const express = require("express")
  const app = express()
  const port = 3000
  const user = require("./api/user")

  // set view engine
  app.set('view engine', 'ejs');

  app.use("/public", express.static(__dirname + "/public"));

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // api
  app.use("/api/v1", user)

  // home
  app.get("/", (request, response) => response.render("index"))

  // app.post('/login', (req, res) => {
  //     const { username, password } = req.body;
  //     const user = users.find(i => {
  //         return i.username == username && i.password == password
  //     });

  //     console.log(user);

  //     if (user) {
  //         console.log("success login");
  //         res.redirect('/');
  //         return;
  //     } else {
  //         console.log("fail login");
  //         res.render('login', {
  //             message: 'Invalid username or password',
  //         });
  //     }
  // });

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