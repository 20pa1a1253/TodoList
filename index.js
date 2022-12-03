const todoList = () => {
  all = []

  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    var z = new Date();
    z.setDate(z.getDate() - 1);
    const a = z.toLocaleDateString("en-CA");
    // const a=formattedDate(new Date(new Date().setDate(dateToday.getDate() - 1)));
    let b = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate == a) {
        //console.log(all[i]);
        b.push(all[i]);
      }
    }
    return b;
  };
  const dueToday = () => {
     b=[];
    const a=new Date().toLocaleDateString("en-CA");
      for(let i=0;i<all.length;i++){
          if(all[i].dueDate==a){
              b.push(all[i]);

          }
      }
  return b;
  }
  const dueLater = () => {
    var z = new Date();
    z.setDate(z.getDate() + 1);
    var a = z.toLocaleDateString("en-CA");
    let b = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate == a) {
        //console.log(all[i]);
        b.push(all[i]);
      }
    }
    return b;
  };
  
  const toDisplayableList = (list) => {
    let s=""
    for(let i=0;i<list.length;i++){

      if(list[i].completed==true){
          s=s+"["+"x] ";
      }
      else{
          s=s+"[ "+"] ";
      }
      const a=formattedDate(dateToday);
      const b=formattedDate(new Date(new Date().setDate(dateToday.getDate() + 1)));
      if(list[i].dueDate==a){
          s=s+list[i].title+" "+"\n";
      }
      else{
          if(i==list.length-1 && b==list[i].dueDate){
              s=s+list[i].title+". "+list[i].dueDate+"\n";
          }
          else{
              s=s+list[i].title+" "+list[i].dueDate+"\n";
          }
      }

    }
    return s;
  }

  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
}
module.exports=todoList;

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

