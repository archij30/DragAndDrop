import "./styles.css";
const DATA = [
  {
    id: "todo",
    tasks: ["task1", "task2"]
  },
  {
    id: "wip",
    tasks: ["task3"]
  },
  {
    id: "done",
    tasks: []
  }
];
const getData = function () {
  return DATA;
};

const addContainers = function (data) {
  let app = document.getElementById("app");
  let boxes = document.createDocumentFragment();
  data.forEach((item) => {
    let boxEle = document.createElement("div");
    let box = document.createDocumentFragment();
    boxEle.classList.add("box");
    addTasks(box, item.tasks);
    boxEle.appendChild(box);
    boxes.appendChild(boxEle);
  });

  app.appendChild(boxes);
};

const addTasks = function (box, tasks) {
  tasks.forEach((task) => {
    let taskEle = document.createElement("div");
    taskEle.classList.add("task");
    taskEle.id = task;
    taskEle.innerHTML = task;
    box.appendChild(taskEle);
  });
};

const addEvents = function () {
  const boxes = Array.from(document.getElementsByClassName("box"));

  boxes.forEach((box) => {
    box.addEventListener("drop", (evnt) => {
      console.log("drop");
      evnt.preventDefault();
      const data = evnt.dataTransfer.getData("text");
      evnt.target.appendChild(document.getElementById(data));
    });
    box.addEventListener("dragover", (evnt) => {
      console.log("dragover");
      evnt.preventDefault();
    });
  });

  const tasks = Array.from(document.getElementsByClassName("task"));

  tasks.forEach((task) => {
    task.draggable = true;
    task.addEventListener("dragstart", (evnt) => {
      console.log("drag");
      evnt.dataTransfer.setData("text", evnt.target.id);
    });
  });
};

const data = getData();
addContainers(data);
addEvents();
