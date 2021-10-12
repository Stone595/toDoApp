
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

const LOCALSTORAGELISTKEY = "LISTSKEY";
const LOCALSTORAGESELECTELIST = "SELECTIEDLIST";
let templists = localStorage.getItem(LOCALSTORAGELISTKEY)
let lists = JSON.parse(templists) || [{id: 'tests', name :'testing'}];
let selectedList = JSON.parse(localStorage.getItem('LOCALSTORAGESELECTELIST'));

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

function createNewList(name) {
  return {id: createId(), name: name, tasks: []}
}

function save() {
  localStorage.setItem(LOCALSTORAGELISTKEY, JSON.stringify(lists));
  localStorage.setItem(LOCALSTORAGESELECTELIST, selectedList)
}

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
function addNewTasks() {
  let selectedListObj = lists.find(list => list.id === selectedList);
  const taskName = newTask.value;
  console.log(newTask.value)
  if(!taskName || taskName == ""){
    console.log('failed')
    return
  } else {
    let task = createTask(taskName);
    // const selectedList1 = lists.find(list => list.id === selectedListObj.name);
    
    selectedListObj.tasks.push(task)
    newTask.value =''; 
    render();
    // renderTasks(selectedListObj);
    save();
  }
}
function renderTasks(selectedList) {
  selectedList.tasks.forEach(task =>{
    let taskHtml = document.importNode(taskElement.content, true)
    let actCheckBox = taskHtml.querySelector('input');
    actCheckBox.id = task.id; 
    actCheckBox.checked = task.completed;
    let taskLabel = taskHtml.querySelector('label');
    taskLabel.htmlfor = task.id; 
    taskLabel.append(task.name);
    taskBody.appendChild(taskHtml)
  })

}

function createTask(name){
  return {id: createId(), name: name, completed: false}
}

function clearElemnts(element) {
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}

deleteListButton.addEventListener('click', () => {
  console.log(selectedList)
  lists = lists.filter(list => list.id !== selectedList);
  
  console.log(lists)
  render();
  save();
})

render();








