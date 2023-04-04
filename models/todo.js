// //models/todo.js
// "use strict";
// const { Model, DATE } = require("sequelize");
// const { Op } = require("sequelize");
// const todoList = require("../Index");
// const db = require(".");
// const Todo = require("../TodoModel");
// const date = new Date();
// const today = date.toLocaleDateString("en-CA");
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static addTodo({title,dueDate}){
//       return this.create({title:title,dueDate: dueDate,completed:false})
//     }
//     markedAsComplete({Id}){
//       //const tod =  Todo.findByPk(request.params.id)
//       return this.update({ completed: true },
//         {
//           where: {

//               _id: Id,

//           },
//         });
//     }
//     static async addTask(params) {
//       return await Todo.create(params);
//     }
//     static async showList() {
//       console.log("My Todo list \n");

//       console.log("Overdue");
//       console.log(await this.overdue());
//       // FILL IN HERE
//       console.log("\n");

//       console.log("Due Today");
//       console.log(await this.dueToday());
//       // FILL IN HERE
//       console.log("\n");

//       console.log("Due Later");
//       console.log(await this.dueLater());
//       // FILL IN HERE
//     }

//     static async overdue() {
//       try {
//         const over = await Todo.findAll({
//           where: {
//             dueDate: { [Op.lt]: today },
//           },
//         });
//         const todoList = over
//           .map((todo) => todo.displayableString())
//           .join("\n");
//         console.log(todoList);
//       } catch (error) {
//         console.log(error);
//       }
//       // FILL IN HERE TO RETURN OVERDUE ITEMS
//     }

//     static async dueToday() {
//       try {
//         const over = await Todo.findAll({
//           where: {
//             dueDate: today,
//           },
//         });
//         const todoList = over
//           .map((todo) => todo.displayableString())
//           .join("\n");
//         console.log(todoList);
//       } catch (error) {
//         console.log(error);
//       }
//       //FILL IN HERE TO RETURN ITEMS DUE tODAY
//     }

//     static async dueLater() {
//       try {
//         const over = await Todo.findAll({
//           where: {
//             dueDate: { [Op.gt]: today },
//           },
//         });
//         const todoList = over
//           .map((todo) => todo.displayableString())
//           .join("\n");
//         console.log(todoList);
//       } catch (error) {
//         console.log(error);
//       }
//       //FILL IN HERE TO RETURN ITEMS DUE LATER
//     }

//     static async markAsComplete(id) {
//       // FILL IN HERE TO MARK AN ITEM AS COMPLETE
//       try {
//         await db.Todo.update(
//           { completed: true },
//           {
//             where: {
//               id: id,
//             },
//           }
//         );
//         const todoList = todos
//           .map((todo) => todo.displayableString())
//           .join("\n");
//         console.log(todoList);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     static associate(models) {
//       // define association here
//     }
//     displayableString() {
//       let checkbox = this.completed ? "[x]" : "[ ]";
//       return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
//     }
//   }
//   Todo.init(
//     {
//       title: DataTypes.STRING,
//       dueDate: DataTypes.DATEONLY,
//       completed: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "Todo",
//     }
//   );
//   return Todo;
// };
// // //run();
"use strict";
const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }
    static async remove(id) {
      return this.destroy({ where: { id } });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
