/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { error } = require("console");
const express = require("express");
const { request, response } = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const { Todo } = require("./models");
const { where } = require("sequelize");
const { Pool } = require("pg");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser("ssh!some secret string"));
app.use(csrf({ cookie: true }));

// app.get("/", (request, response) => {
//   response.render("index"); // new refers to new.ejs
// });

app.get("/alltodos", async (request, response) => {
  var datak = [];
  var datas = [];
  var datass = [];
  var datash = [];
  var date = new Date();
  var z = date.toLocaleDateString("en-CA");
  var rel = await Todo.findAll().then((data) => {
    data.map((tod) => {
      if (tod.dataValues.completed == true) {
        datash.push(tod.dataValues);
      }
      if (tod.dataValues.dueDate < z) {
        datak.push(tod.dataValues);
        // console.log(data);
      } else if (tod.dataValues.dueDate == z) {
        datas.push(tod.dataValues);
      } else if (tod.dataValues.dueDate > z) {
        datass.push(tod.dataValues);
      }
    });
    if (request.accepts("html")) {
      response.render("todo", {
        task: datash,
        task1: datak,
        task2: datas,
        task3: datass,
        csrfToken: request.csrfToken(),
      }); // index refers to index.ejs
    } else {
      response.json({
        task: datash,
        task1: datak,
        task2: datas,
        task3: datass,
        csrfToken: request.csrfToken(),
      });
    }
  });

  console.log(datash);
});
app.get("/today", async (request, response) => {
  var datas = [];
  var rel = await Todo.findAll({
    where: {
      dueDate: new Date().toISOString(),
    },
  }).then((docs) => {
    if (docs) {
      docs.forEach((doc) => {
        datas.push(doc);
      });
      console.log(datas);
      response.render("todo", { tasks: datas });
    } else {
      response.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`,
      });
    }
  });
});
app.get("/tmrw", async (request, response) => {
  var datas = [];
  var date = new Date();
  var z = date.toLocaleDateString("en-CA");
  var rel = await Todo.findAll().then((data) => {
    data.map((tod) => {
      if (tod.dataValues.dueDate > z) {
        datas.push(tod.dataValues);
      }
    });
    console.log(datas);
    response.render("todo", { tasks: datas });
  });
});

app.get("/todo", function (request, responseponse) {
  console.log("Hello World");
});
app.post("/todos", async (request, response) => {
  console.log("created list", request.body);

  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.redirect("/alltodos");
  } catch {
    return responseponse.status(422).json(error);
  }
  //console.log("created list",request.body);
});
// app.put('/todos/:id/MarkAsComplete',async(request,responseponse)=>{
//     console.log("updated list with id",request.params.id)
//     const tod = await Todo.findByPk(request.params.id)
//     console.log(tod)
//     // const update= await Todo.markedAsComplete();

//     //     return responseponse.json(update)
//     try {
//         console.log("entered1")
//         const update= await Todo.update({ completed: true },
//             {
//               where: {

//                   id: request.params.id,

//               },
//             });
//             console.log(update)
//             console.log("updated succesfully");
//         return responseponse.json(update);

//     }catch (error) {
//         console.log("error")
//         return responseponse.status(422).json(error)

//     }
// })
app.put("/todos/:id/markAsCompleted", async (req, res) => {
  console.log("We have to update a todo with ID:", req.params.id);
  const todo = await Todo.findByPk(req.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  console.log("Delete a todo by ID: ", req.params.id);
  // try {
  //   await Todo.remove(req.params.id);
  //   return console.log("succes")
  // } catch (error) {
  //   return res.status(422).json(error);
  // }
  const todoId = req.params.id;
  Todo.destroy({
    where: {
      id: todoId,
    },
  })
    .then((deleted) => {
      if (deleted) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(422).json(error);
    });
});
// app.listen(3000,()=>{
//   console.log("server started running at port 3000");
// })
module.exports = app;
