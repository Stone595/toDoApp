
//to do 
//make it so they can edit the task when they want to 
//make it so that you can delete the tasks 

//Data selectors
const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListName = document.querySelector('[data-new-list-name]');
const taskBody = document.querySelector('[data-tasks]');
const newTask = document.querySelector('[data-create-task]');
const deleteListButton = document.querySelector('[data-delete-list-btn]');
const displayContainer = document.querySelector('[data-display-container]');
const listTitle = document.querySelector('[data-list-title]');
const listCount = document.querySelector('[data-list-count]');
const listTasks = document.querySelector('[data-tasks');
const taskElement = document.getElementById('taskTemplate');

//Local Storage Variables
const LOCALSTORAGELISTKEY = "LISTSKEY";
const LOCALSTORAGESELECTELIST = "SELECTIEDLIST";
let templists = localStorage.getItem(LOCALSTORAGELISTKEY)
let lists = JSON.parse(templists) || [];
let selectedList = JSON.parse(localStorage.getItem('LOCALSTORAGESELECTELIST'));

//Event Listeners
listContainer.addEventListener('click', x => {
  if(x.target.tagName.toLowerCase() === 'li'){
    selectedList = x.target.dataset.listId;
    save();
    render();
  }
})

newListForm.addEventListener('submit', x => {
  x.preventDefault(); 
  const listName = newListName.value;
  if(!listName || listName == ""){
    return
  } else {
    const list = createNewList(listName);
    newListName.value = null; 
    lists.push(list)
    render();
    save();
  }
})

deleteListButton.addEventListener('click', () => {
  displayContainer.style.display = null;
  console.log(selectedList)
  lists = lists.filter(list => list.id !== selectedList);
  console.log(lists);
  listTitle.innerText = '';
  render();
  save();
})

//Create a randomly generated id 
let createId = (function(){
  let finishedIds =[];
  
  function randomId(){
    let number = Math.random().toFixed(4) ;
    if(finishedIds.includes(number)){
      randomId()
    }else{
      finishedIds.push(number);
      return number;
    }
  }
  return randomId; 
})();

//Create Elements
function createNewList(name) {
  return {id: createId(), name: name, tasks: []}
}

function createTask(name){
  return {id: createId(), name: name, completed: false}
}

function addNewTasks() {
  let selectedListObj = lists.find(list => list.id === selectedList);
  const taskName = newTask.value;
  console.log(newTask.value)
  if(!taskName || taskName == ""){
    console.log('failed')
    return
  } else {
    let task = createTask(taskName);
    selectedListObj.tasks.push(task)
    newTask.value =''; 
    render();
    save();
  }
}

//Save function
function save() {
  localStorage.setItem(LOCALSTORAGELISTKEY, JSON.stringify(lists));
  localStorage.setItem(LOCALSTORAGESELECTELIST, selectedList)
}

//Render Functions 
function render(){
  renderLists();
  let selectedListObj = lists.find(list => list.id === selectedList);
  if(selectedList == null){
    displayContainer.style.display = 'none'; 
  } else {
    displayContainer.style.display = '';
    listTitle.innerHTML = '<h2 data-list-title >'+ selectedListObj.name + '</h2>';
    renderTasks(selectedListObj);
  }
}

function renderLists() {
  clearElemnts(listContainer);

  lists.forEach((list) => {
    const listHTML = document.createElement('li');
    listHTML.dataset.listId = list.id; 
    listHTML.classList.add('listName');
    listHTML.innerText = list.name;
    listContainer.appendChild(listHTML)
    if(list.id === selectedList){
      listHTML.classList.add('activeList')
    }
  })
  clearElemnts(taskBody);
  
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task =>{
    let taskHtml = document.importNode(taskElement.content, true)
    let actCheckBox = taskHtml.querySelector('input');
    actCheckBox.id = task.id; 
    actCheckBox.checked = task.completed;

    let taskLabel = taskHtml.querySelector('label');
    taskLabel.htmlfor = task.id; 

    let deleteLabel = taskHtml.querySelector('[data-delete-id]');
    deleteLabel.id = task.id; 

    if(actCheckBox.checked === false){
      taskLabel.append(task.name);
      taskBody.appendChild(taskHtml)
    } 
  })
}

// Alter Tasks 
taskBody.addEventListener('click', e => {
  if( e.target.tagName.toLowerCase() === 'input'){
   let selectedListObj = lists.find(list => list.id === selectedList);
   console.log(e.target.id)
   let selectedTask = selectedListObj.tasks.find(task => task.id === e.target.id);
   console.log(selectedTask)
   selectedTask.completed = true; 
   save();
  }

})
taskBody.addEventListener('click', e => {
  console.log(e.target.id)
  if( e.target.tagName.toLowerCase() === 'button'){
   console.log('got in')

   let selectedListObj = lists.find(list => list.id === selectedList);
   console.log(selectedListObj);
   
   console.log(e.target.id)
   let selectedTask = selectedListObj.tasks.find(task => task.id === e.target.id);
   console.log(selectedTask);
   //splice the task 
   selectedListObj.tasks = selectedListObj.tasks.filter(task => task.id !== selectedTask.id)
  //render
   save();
   render();
  } else{
    console.log('failed')
  }

})

//Need to do
//
//
function editATask(taskId) {
  //get task id
  let selectedListObj = lists.find(list => list.id === selectedList);
  let selectedTask = selectedListObj.find(task => tasks.id === selectedTaskId)
  //get content from that task

  // delete the task 

  //Put content into the input bar at the bottom 


}
function deleteATask(taskId) {
  //get task id
  
  //splice that from the array 

  //render entire list again 

}
function clearCompletedTasks() {
  //Get the selected list 
  let selectedListObj = lists.find(list => list.id === selectedList);
  //search though the array of tasks to find which have the value of completed and push them to the array
  selectedListObj.tasks = selectedListObj.filter(tasks => !tasks.completed)
  //render
  save();
  render();
}




function clearElemnts(element) {
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}

render();








