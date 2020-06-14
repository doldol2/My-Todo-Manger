const form = document.querySelector(".add-list__form"),
  inputN = form.querySelector(".add-todo__name"),
  inputP = form.querySelector(".add-todo__place"),
  inputT = form.querySelector(".add-todo__time"),
  submitBtn = form.querySelector(".submit-add-todo");

function savePending(obj) {
  let pendingLS = localStorage.getItem("PENDING");
  let pendingList = [];
  if (pendingLS != null) {
    pendingList = JSON.parse(pendingLS);
  }
  pendingList.push(obj);
  localStorage.setItem("PENDING", JSON.stringify(pendingList));
  location.href = "todo.html";
}

function submitClick() {
  if (inputN.value == "" || inputP.value == "" || inputT.value == "") {
    alert("There is a empty blank!");
  } else {
    const obj = {
      content: inputN.value,
      id: new Date().getTime(),
      className: "pending",
      place: inputP.value,
      time: inputT.value,
    };
    savePending(obj);
  }
}

function handleSubmit(event) {
  event.preventDefault();
}

function init() {
  form.addEventListener("submit", handleSubmit);
  submitBtn.addEventListener("click", submitClick);
}
init();
