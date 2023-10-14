const clearbtn = document.querySelector(".clear");
const todolist = document.querySelector("#list");
const todoInput = document.querySelector("#input");
const todoAddBtn = document.querySelector(".fa-plus-circle");


const checkBtn = "fa-check-circle";
const lineThrough = "line-through";
const uncheckBtn = "fa-circle-thin";


let todoContainer , id ;


let todoData = localStorage.getItem("to-do-item");
if(todoData)
{
    todoContainer = JSON.parse(todoData);
    id = todoContainer.length;
    loadToDoContainer(todoContainer);
}
else
{
    todoContainer = [];
    id = 0;
}

function loadToDoContainer(array){
    array.forEach(function(item){
        addtodo(item.Name ,item.id , item.done ,item.trash);
    })
}

clearbtn.addEventListener("click" , function(){
    localStorage.clear();
    location.reload();
})

function addtodo(todo , id , done , trash)
{
    if(trash) return;

    const todoDone = done? checkBtn :uncheckBtn ;
    const todoLine = done? lineThrough:"";
    const item = `
                 <li class="item">
                 <i class ="fa ${todoDone} complete" status = "complete" id ='${id}'></i>
                 <p class ="text ${todoLine} ">${todo}</p>
                 <i class ="fa fa-trash-o delete" status="delete" id='${id}'></i>
                 </li>
                 `
    const todoItemPosition = "beforeend";
    todolist.insertAdjacentHTML(todoItemPosition , item);             

}

// addtodo("good Morning" , 0 ,true,false);

document.addEventListener("keyup" , todoDisplay);

todoAddBtn.addEventListener("click" , todoDisplay);

function todoDisplay(e)
{
    if(e.keyCode === 13  ||  e.target.classList.value === "fa fa-plus-circle")
    {
        const todo = todoInput.value;
        if(todo)
        {
            addtodo(todo , id ,false , false);
            todoContainer.push({
                Name : todo,
                id : id ,
                done : false ,
                trash : false ,
        })
 
        localStorage.setItem("to-do-item" , JSON.stringify(todoContainer));

        id++;
        
        };
        todoInput.value = "";
    }
}

todolist.addEventListener("click" , function(e){

    if(e.target.localName === "li" || e.target.localName === "p"  || e.target.localName ==="ul" )
    {
        return;
    }

    const todoItem = e.target;
    
    const todoStatus = todoItem.attributes.status.value ;
   

   if(todoStatus === "complete")
   {
    completeToDO(todoItem);
   }
   else if(todoStatus === "delete")
   {
    removeToDo(todoItem);
   }

   localStorage.setItem("to-do-item" , JSON.stringify(todoContainer));
})

function completeToDO(todoItem)
{
    todoItem.classList.toggle(checkBtn);
    todoItem.classList.toggle(uncheckBtn);
    todoItem.parentNode.querySelector(".text").classList.toggle(lineThrough);
    todoContainer[todoItem.id].done = todoContainer[todoItem.id].done?false:true;
}

function removeToDo(todoItem)
{
    todoItem.parentNode.parentNode.removeChild(todoItem.parentNode);
    todoContainer[todoItem.id].trash = true;
}