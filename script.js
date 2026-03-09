let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function predictPriority(task, date){

let today = new Date();
let deadline = new Date(date);

let diffDays = (deadline - today) / (1000 * 60 * 60 * 24);

task = task.toLowerCase();

if(diffDays <= 1 || task.includes("exam") || task.includes("project") || task.includes("submission"))
{
return "high";
}

else if(diffDays <= 3)
{
return "medium";
}

else
{
return "low";
}

}

function addTask(){

let taskInput = document.getElementById("taskInput");
let deadline = document.getElementById("deadline");

let taskText = taskInput.value;

if(taskText === "" || deadline.value === "")
{
alert("Please enter task and deadline");
return;
}

let priority = predictPriority(taskText, deadline.value);

let task = {

text:taskText,
date:deadline.value,
priority:priority,
done:false

};

tasks.push(task);

saveTasks();

taskInput.value="";
deadline.value="";

displayTasks();

}

function displayTasks(){

let taskList = document.getElementById("taskList");

taskList.innerHTML="";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

if(task.done)
{
li.classList.add("taskDone");
}

li.innerHTML = `
<div class="taskLeft">
${task.text} <small>(${task.date})</small>
<span class="priority ${task.priority}">
${task.priority}
</span>
</div>

<span class="delete" onclick="deleteTask(${index})">
Delete
</span>
`;

taskList.appendChild(li);

});

}

function toggleDone(index){

tasks[index].done = !tasks[index].done;

saveTasks();

displayTasks();

}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();

displayTasks();

}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

displayTasks();