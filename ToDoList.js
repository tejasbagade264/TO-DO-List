

let tasks = [];
const tasksList= document.getElementById('list');
const addtaskInput =document.getElementById('add');
const tasksCounter = document.getElementById('task-counter');





function addTaskToDom(task) {
  const li = document.createElement('li');

  li.innerHTML = `
   
    <label for="${task.id}">${task.text}</label>
    <i class="fa-regular fa-trash-can delete" data-id="${task.id}"></i>
  `;
  tasksList.append(li);
}



 function renderList(){
	tasksList.innerHTML= '';
	for( let i=0; i<tasks.length; i++){
           addTaskToDom(tasks[i]);
	}
	tasksCounter.innerHTML = tasks.length;  
}



function markTaskComplete(taskId){	 
	const task = tasks.filter(function(task){
   	return task.id===taskId;
   });
	if(task.length>0){
		const currtask=task[0];
		currtask.done =! currtask.done;
		renderList()
		showNotification('task done successfully');
		return;
	}
	if(!targetElement){
		showNotification('task cannot found');
		return;
	}
	}



function deleteTask(taskId){
   const newTask = tasks.filter(function(newTask){
   	return newTask.id!==taskId;
   })
   tasks = newTask;
   renderList()
		showNotification('Are you sure wants to delete the task ?');
	}


function addtask(task){
	if(task){
		tasks.push(task);
		renderList()
		showNotification('task added successfully');
		return;
	}
	if(!task){
		showNotification('task cannot be added');
	}
}



function showNotification(text){
 alert(text);
}



function handleInputkeypress(e){
    if(e.key == 'Enter'){
    	 const text = e.target.value;
    if(!text){ 
    	showNotification('Task text cannot be empty');
    	return;
    }
    let task={
    	text,
     	id: Date.now().toString(),
    	done :false
    }
     e.target.value='';
     addtask(task);
}
}



function handleInputClick(e){
	const target=e.target;
	console.log(target);
 if (target.classList.contains('fa-trash-can')) {
    const taskId = target.getAttribute('data-id');
    deleteTask(taskId);
    return;
}
}


addtaskInput.addEventListener('keyup' , handleInputkeypress);

document.addEventListener('click', handleInputClick);

