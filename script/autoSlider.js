const slider = document.querySelector(".panel");
const panels = document.querySelectorAll(".panel li");
const roll = document.querySelector(".rolling");
const len = panels.length - 1;
let num = 0;
let timer = null;

const interval = 5000;

startRolling();
function startRolling() {
    setTimeout(moving, 0);
    active(num);
    timer = setInterval(rolling, interval);
}

function active(index) {
    slider.append(slider.firstElementChild);
    num = index;
    roll.style.fontSize = "0px";
}

function rolling() {
    if (num < len) {
        num++;
    } else {
        num = 0;
    }
    active(num);
    moving();
}

function moving() {
    const init = parseInt(roll.style.fontSize) || 0;
    const unit = "%";
    const startTime = performance.now();
    function animate(time) {
        const realTime = time - startTime;
        const prog = realTime / interval;
        const currentValue = init + 850 * prog;
        roll.style.fontSize = `${currentValue}${unit}`;
        if (prog < 1) {
            requestAnimationFrame(animate)
        } else if (prog >= 1) {
            roll.style.fontSize = "0px"
        }
    }
    requestAnimationFrame(animate);

}