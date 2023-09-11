let form = document.forms.todo;
let container = document.querySelector(".container");
let todos = [];

form.onsubmit = (e) => {
  e.preventDefault();

  const { target } = e;

  let todo = {
    id: Math.round(Math.random() * 100),
    title: target.firstElementChild.value,
    isDone: false,
    time: new Date().getHours() + ":" + new Date().getMinutes(),
  };

  if (todo.title) {
    todos.push(todo);
    form.reset();
    reload(todos);
  } else {
    alert("Титул не может быть пустым!");
  }
};

function reload(arr) {
  container.innerHTML = "";

  for (let item of arr) {
    console.log(todos);
    let mainDiv = document.createElement("div");
    let topDiv = document.createElement("div");
    let title = document.createElement("span");
    let removeBtn = document.createElement("button");
    let timeSpan = document.createElement("span");

    mainDiv.classList.add("item");
    topDiv.classList.add("top");
    timeSpan.classList.add("time");

    title.innerHTML = item.title;
    removeBtn.innerHTML = "x";
    timeSpan.innerHTML = item.time;

    mainDiv.append(topDiv, timeSpan);
    topDiv.append(title, removeBtn);
    container.append(mainDiv);

    mainDiv.onclick = () => {
      item.isDone = true;
      reload(todos);
    };
    title.classList.toggle("lineThrough", item.isDone);
    removeBtn.onclick = () => {
      todos = todos.filter((todo) => todo.id !== item.id);
      console.log(todos);
      mainDiv.classList.add("hidden");
    };
  }
}

reload();
