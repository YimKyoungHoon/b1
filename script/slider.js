const marvel = document.querySelector(".marvel");
const articles = marvel.querySelectorAll("article");
const opens = marvel.querySelectorAll(".open");
const closes = document.querySelectorAll(".close");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

for (let i = 0; i < 2; i++) { marvel.prepend(marvel.lastElementChild); }


next.addEventListener("click", () => {
    marvel.append(marvel.firstElementChild);
})


prev.addEventListener("click", () => {
    marvel.prepend(marvel.lastElementChild);
})


opens.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        e.target.closest("article").classList.add("on");

        for (let ele of articles)
            !ele.classList.contains("on") && ele.classList.add("hide");
    })
})

closes.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        e.target.closest("article").classList.remove("on");
        for (let el of articles) el.classList.remove("hide");
    })
})



