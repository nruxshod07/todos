let form = document.forms.todo;
let container = document.querySelector(".container");
let todos = [];
let modalBg = document.querySelector(".modalBG");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector(".closeModal");
let save = document.querySelector(".save");
let inp = document.querySelector(".modal .newTitle");
let checkbox = document.querySelector(".isDone");
let inps = document.querySelectorAll(".text");
let error = false;
let modalForm = document.forms.modalForm;
let id;
let regex = /^[a-z ,.'-]+$/i;

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
inps.forEach((input) => {
  input.onkeyup = () => {
    if (regex.test(input.value) === true) {
      input.style.border = "2px solid green";
      error = false;
    } else {
      input.style.border = "2px solid red";
      error = true;
    }
  };
});
function reload(arr) {
  container.innerHTML = "";

  for (let item of arr) {
    console.log(todos);
    let mainDiv = document.createElement("div");
    let topDiv = document.createElement("div");
    let title = document.createElement("span");
    let removeBtn = document.createElement("button");
    let timeSpan = document.createElement("span");
    let checked = false;

    mainDiv.classList.add("item");
    topDiv.classList.add("top");
    timeSpan.classList.add("time");

    title.innerHTML = item.title;
    removeBtn.innerHTML = "x";
    timeSpan.innerHTML = item.time;

    mainDiv.append(topDiv, timeSpan);
    topDiv.append(title, removeBtn);
    container.append(mainDiv);

    mainDiv.ondblclick = () => {
      let newName = prompt("enter new name");
      if (newName.length === 0) {
        newName = prompt("enter the name again");
      } else {
        title.innerHTML = newName;
      }
    };
    closeModal.onclick = () => {
      modalBg.style.display = "none";
    };
    checkbox.onclick = () => {
      if (checkbox.checked) {
        checked = true;
        item.isDone = true;
        console.log("checked");
      } else {
        checked = false;
        item.isDone = false;
        console.log("not checked");
      }
    };
    save.onclick = () => {
      if (checked === true) {
        item.isDone = true;
        console.log("hi");
        title.classList.toggle("lineThrough", item.isDone);
      } else {
        item.isDone = false;
      }
      if (error === true) {
        console.log("error");
      } else {
        item.title = inp.value;
        console.log(item.title, inp.value);
        modalBg.style.display = "none";
        console.log("false");
      }
    };
    mainDiv.ondblclick = () => {
      modalBg.style.display = "block";
      inp.value = item.title;
      inp.setAttribute("placeholder", item.title);
    };
    mainDiv.onclick = () => {
      if (item.isDone) {
        item.isDone = false;
      } else {
        item.isDone = true;
      }
      console.log(checkbox.checked);
      if (title.classList.contains("lineThrough")) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
      modalForm.onsubmit = (e) => {
        e.preventDefault();

        const { target } = e;
        let finded = todos.find((item) => item.id === id);

        let fm = new FormData(target);

        fm.forEach((value, key) => {
          finded[key] = value;
        });

        modalBg.style.display = "none";
        reload(todos);
      };
      title.classList.toggle("lineThrough", item.isDone);
    };
    title.classList.toggle("lineThrough", item.isDone);
    removeBtn.onclick = () => {
      todos = todos.filter((todo) => todo.id !== item.id);
      console.log(todos);
      mainDiv.remove();
    };
  }
}

reload(todos);
