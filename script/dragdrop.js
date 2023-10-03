let dragdrop_box_outer = document.querySelector("#out");
let dragdrop_box_inner = document.querySelector("#in");
let dragdrop_lists = document.querySelectorAll(".list");
let dragdrop_wrapPage = document.querySelectorAll(".wrap article");
// console.log(dragdrop_wrapPage);
let selected = null;
let selected2 = null;

for(let el of dragdrop_lists) {
    el.addEventListener("dragstart",(e) => {
        selected = e.target;
        console.log(selected);
        selected2 = e.target.id;
        console.log(selected2);
    })
    dragdrop_box_inner.addEventListener("drop",() => {
        dragdrop_box_inner.append(selected);
        startEvent(selected2);
        window.scrollTo({left: 0, top: 1900 , behavior:"smooth"});
    })
    dragdrop_box_inner.addEventListener("dragover",(e) => {
        e.preventDefault();
    })
    dragdrop_box_outer.addEventListener("drop",() => {
        dragdrop_box_outer.append(selected);
        stopEvent(selected2);
    })
    dragdrop_box_outer.addEventListener("dragover",(e) => {
        e.preventDefault();
    })
}

let strong;
function startEvent(id) {
    strong = id.substr(4,1);
    let pages = document.querySelector(".page" + strong);
    pages.style.transform = "scale(1)";

    for(let i = 0; i < dragdrop_wrapPage.length; i++){
        if (dragdrop_wrapPage[i].classList.contains("page" + strong)) {
            dragdrop_wrapPage[i].classList.add("on");
        } else {
            dragdrop_wrapPage[i].classList.remove("on");
        }
    }
}

function stopEvent(id) {
    strong = id.substr(4,1);
    let pages = document.querySelector(".page" + strong);
    pages.style.transform = "scale(0)";

    for(let i = 0; i < dragdrop_wrapPage.length; i++){
        if (dragdrop_wrapPage[i].classList.contains("page" + strong)) {
            dragdrop_wrapPage[i].classList.remove("on");
        }
    }
}

