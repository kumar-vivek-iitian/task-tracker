import { existsSync, readFileSync, writeFileSync } from "fs";

const FILE = "tasks.json";
let tasks = [];

function writeContents() {
  try {
    writeFileSync(FILE, JSON.stringify(tasks));
  } catch (err) {
    console.log(`Error writing contents to ${FILE}.`);
  }
}

function initTasks() {
  if (!existsSync(FILE)) {
    writeFileSync(FILE, JSON.stringify([]), (err) => {
      if (err) {
        console.log(`Error creating ${FILE}.`);
        process.exit(0);
      }
    });
  }

  try {
    const data = readFileSync(FILE, "utf-8");
    tasks = JSON.parse(data);
  } catch (err) {
    console.log(`Error parsing ${FILE}.`);
    process.exit(0);
  }
}

function printDetails(element, idx) {
  console.log(idx + 1);
  console.log("Description: ", element.description);
  console.log("Status: ", element.status);
  console.log(
    "Created At: ",
    new Date(element.createdAt).toString().slice(0, 24)
  );
  console.log(
    "Updated At: ",
    new Date(element.updateAt).toString().slice(0, 24)
  );
}

function listTasks(status) {
  initTasks();
  if (tasks.length === 0) {
    console.log("No task added yet.");
    return;
  }
  if (status) {
    tasks.forEach((element, idx) => {
      if (element.status == status) printDetails(element, idx);
    });
  } else {
    tasks.forEach((element, idx) => {
      printDetails(element, idx);
    });
  }
}

function addTask(description) {
  initTasks();
  let taskid = tasks.length + 1;
  const time = new Date().getTime();
  tasks.push({
    id: taskid,
    description: description,
    status: "todo",
    createdAt: time,
    updateAt: time,
  });
  writeContents();
  console.log(`Task added successfully (ID: ${taskid})`)
}

function updateTask(id, description) {
  initTasks();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].description = description;
      break;
    }
  }
  writeContents();
}

function deleteTask(id) {
  initTasks();
  tasks = tasks.filter((task) => task.id != id);
  writeContents();
}

function markDone(id) {
  initTasks();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].status = "done";
      break;
    }
  }
  writeContents();
}

function markProgress(id) {
  initTasks();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].status = "in-progress";
      break;
    }
  }
  writeContents();
}

export { listTasks, addTask, deleteTask, updateTask, markDone, markProgress };
