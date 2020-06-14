const form = document.querySelector(".ask-pending-form"),
  userName = localStorage.getItem("USER_LS"),
  wellComeName = document.querySelector(".well-come__name"),
  pendingLi = document.querySelector(".pending-list"),
  finishedLi = document.querySelector(".finished-list"),
  proPend = document.querySelector(".pending__count"),
  proFin = document.querySelector(".finished__count"),
  proPer = document.querySelector(".progress-per"),
  toDate = document.querySelector(".date");

let pendingList = [],
  finishedList = [],
  btnC = false,
  innerLock = false;

function monthToEng(mon) {
  if (mon == 1) {
    return "Jan";
  } else if (mon == 2) {
    return "Feb";
  } else if (mon == 3) {
    return "Mar";
  } else if (mon == 4) {
    return "Apr";
  } else if (mon == 5) {
    return "May";
  } else if (mon == 6) {
    return "Jun";
  } else if (mon == 7) {
    return "Jul";
  } else if (mon == 8) {
    return "Aug";
  } else if (mon == 9) {
    return "Sep";
  } else if (mon == 10) {
    return "Oct";
  } else if (mon == 11) {
    return "Nov";
  } else {
    return "Dec";
  }
}

function getDate() {
  const x = new Date(),
    y = x.getFullYear(),
    MN = x.getMonth() + 1,
    m = monthToEng(MN),
    d = x.getDate();
  toDate.innerText = `${m} ${d}, ${y}`;
}

function progress() {
  const PL = pendingList.length,
    FL = finishedList.length,
    PP = Math.floor((FL / (FL + PL)) * 100);
  proPend.innerText = PL;
  proFin.innerText = FL;
  if (PL == 0 && FL > 0) {
    proPer.innerText = "100% done";
  } else if (FL == 0 && PL > 0) {
    proPer.innerText = "0% done";
  } else if (FL == 0 && PL == 0) {
    proPer.innerText = "Add list ^.^";
  } else if (PP == 100) {
  } else {
    proPer.innerText = `${PP}% done`;
  }
}

function switchBtn(e) {
  const li = e.target.parentNode.parentNode.parentNode,
    ulPd = document.querySelector(".pending-list"),
    ulFn = document.querySelector(".finished-list");
  backTodo(e);
  if (li.className == "pending") {
    li.classList.remove("pending");
    li.classList.add("finished");
    ulPd.removeChild(li);
    const filted = pendingList.filter(function (pending) {
      return pending.id != li.id;
    });
    const obj = pendingList.filter(function (pending) {
      return pending.id == li.id;
    });
    pendingList = filted;
    savePendList();
    listEditor(
      obj[0].content,
      obj[0].id,
      "finished",
      obj[0].place,
      obj[0].time
    );
  } else {
    li.classList.remove("finished");
    li.classList.add("pending");
    ulFn.removeChild(li);
    const filted = finishedList.filter(function (finished) {
      return finished.id != li.id;
    });
    const obj = finishedList.filter(function (finished) {
      return finished.id == li.id;
    });
    finishedList = filted;
    saveFinList();
    listEditor(obj[0].content, obj[0].id, "pending", obj[0].place, obj[0].time);
  }
  btnC = false;
  progress();
}

function backTodo(e) {
  const inner = e.target.parentNode,
    liRight = inner.parentNode,
    li = liRight.parentNode,
    time = liRight.querySelector(".time"),
    place = li.querySelector(".place"),
    name = li.querySelector(".to-do-name");

  newInner = document.createElement("div");
  newInner.classList.add("li-inner");
  newInner.addEventListener("click", liClicked);
  liRight.appendChild(newInner);
  time.classList.remove("no-show");
  place.classList.remove("no-show");
  name.classList.remove("center");
  liRight.removeChild(inner);

  btnC = false;
  innerLock = true;
}

function delList(e) {
  btnC = false;
  innerLock = true;
  const li = e.target.parentNode.parentNode.parentNode,
    ul = li.parentNode;
  ul.removeChild(li);
  if (li.className == "pending") {
    const filted = pendingList.filter(function (pending) {
      return pending.id != li.id;
    });
    pendingList = filted;
    savePendList();
  } else {
    const filted = finishedList.filter(function (finished) {
      return finished.id != li.id;
    });
    finishedList = filted;
    saveFinList();
  }
  progress();
}

function liClicked(e) {
  if (btnC == false && innerLock == false) {
    const liInner = e.target,
      liRight = liInner.parentNode,
      li = liRight.parentNode,
      time = li.querySelector(".time"),
      place = li.querySelector(".place"),
      name = li.querySelector(".to-do-name");

    time.classList.add("no-show");
    place.classList.add("no-show");
    liInner.classList.add("inner-clicked");
    name.classList.add("center");

    const delBtn = document.createElement("button");
    liInner.appendChild(delBtn);
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", delList);

    const back = document.createElement("button");
    liInner.appendChild(back);
    back.innerText = "↩";
    back.addEventListener("click", backTodo);

    if (li.className == "pending") {
      const finBtn = document.createElement("button");
      liInner.appendChild(finBtn);
      finBtn.innerText = "It's Finished!";
      finBtn.addEventListener("click", switchBtn);
    } else {
      const undoBtn = document.createElement("button");
      liInner.appendChild(undoBtn);
      undoBtn.innerText = "Not Finished yet";
      undoBtn.addEventListener("click", switchBtn);
    }
    btnC = true;
  }
  if (innerLock == true) {
    innerLock = false;
  }
}

function savePendList() {
  localStorage.setItem("PENDING", JSON.stringify(pendingList));
}

function saveFinList() {
  localStorage.setItem("FINISHED", JSON.stringify(finishedList));
}

function listEditor(content, ownId, ownCls, ownPlace, ownTime) {
  const li = document.createElement("li");

  const liLeft = document.createElement("div");
  const liRight = document.createElement("div");

  const liInner = document.createElement("div");

  const todoSpan = document.createElement("span");
  const place = document.createElement("span");
  const time = document.createElement("span");

  li.classList.add(ownCls);

  liLeft.classList.add("li__left");
  liRight.classList.add("li__right");

  liInner.classList.add("li-inner");

  todoSpan.classList.add("to-do-name");
  place.classList.add("place");
  time.classList.add("time");

  todoSpan.innerText = content;
  place.innerText = `At ${ownPlace}`;
  time.innerText = ownTime;

  liInner.addEventListener("click", liClicked);

  li.id = ownId;

  li.appendChild(liLeft);
  liLeft.appendChild(todoSpan);
  liLeft.appendChild(place);

  li.appendChild(liRight);
  liRight.appendChild(time);

  liRight.appendChild(liInner);

  const infoObj = {
    content: content,
    id: ownId,
    className: ownCls,
    place: ownPlace,
    time: ownTime,
  };

  if (ownCls == "pending") {
    pendingLi.appendChild(li);
    pendingList.push(infoObj);
    savePendList();
  } else {
    finishedLi.appendChild(li);
    finishedList.push(infoObj);
    saveFinList();
  }
  progress();
}

function loadLS() {
  const pendingLS = localStorage.getItem("PENDING"),
    finishedLS = localStorage.getItem("FINISHED");
  if (pendingLS != null) {
    const pendingListLoacl = JSON.parse(pendingLS);
    pendingListLoacl.forEach(function (p) {
      listEditor(p.content, p.id, p.className, p.place, p.time);
    });
  }
  if (finishedLS != null) {
    const finishedListLocal = JSON.parse(finishedLS);
    finishedListLocal.forEach(function (f) {
      listEditor(f.content, f.id, f.className, f.place, f.time);
    });
  }
}

function loadUN() {
  wellComeName.innerText = userName;
}

function init() {
  loadLS();
  loadUN();
  progress();
  getDate();
}
init();
