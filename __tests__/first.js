const  todoList=require('../index');
const {all, markAsComplete, add} = todoList();
describe("Todolist test case",()=>{
    beforeAll(()=>{
        add({
            title:"testy todo",
            completed:false,
            dueDate:new Date().toLocaleDateString("en-CA")
        });
    })
    test("should add new todo",()=>{
        const count=all.length;
         add({
            title:"testy todo",
            completed:false,
            dueDate:new Date().toLocaleDateString("en-CA")
        });
        expect(all.length).toBe(count+1);

    })
    test("should mark as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
})
