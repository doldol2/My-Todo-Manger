const form = document.querySelector(".ask-name-form"),
  input = form.querySelector("input");

function saveName(text) {
  localStorage.setItem("USER_LS", text);
  location.href = "todo.html";
}

function handleSubmit(e) {
  e.preventDefault();
  const text = input.value;
  if (text == "") {
    alert("Please tell me your name T.T");
  } else {
    saveName(text);
  }
}

function askName(e) {
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const userName = localStorage.getItem("USER_LS");
  if (userName == null) {
    askName();
  } else {
    location.href = "todo.html";
  }
}

function init() {
  loadName();
}

init();
