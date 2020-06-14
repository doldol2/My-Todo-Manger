const bg = document.querySelector(".top-screen"),
  imgCount = 6;

function ranBG(imgNum) {
  const img = new Image();
  img.src = `img/${imgNum + 1}.jpg`;
  img.classList.add("bg");
  bg.prepend(img);
}

function ranNumGenerator() {
  return Math.floor(Math.random() * imgCount);
}

function init() {
  const ranNum = ranNumGenerator();
  ranBG(ranNum);
}
init();
