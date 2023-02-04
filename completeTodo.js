// completeTodo.js
var argv = require("minimist")(process.argv.slice(2));
const db = require("./models/index");
const markAsComplete = async (id) => {
  try {
    await db.Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const getAllTodos = async () => {
  try {
    const todos = await db.Todo
      .findAll
      //   {
      //   where:{
      //     completed:false
      //   },
      //   order:[
      //     ['id','DESC']
      //   ]
      // }
      ();
    const todoList = todos.map((todo) => todo.displayableString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = argv;
  if (!id) {
    throw new Error("Need to pass an id");
  }
  if (!Number.isInteger(id)) {
    throw new Error("The id needs to be an integer");
  }
  await markAsComplete(id);
  await db.Todo.showList();
  await getAllTodos();
})();
