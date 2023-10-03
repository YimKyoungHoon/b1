const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList"
const method2 = "flickr.photos.search";
const key = "6878426cd6ebdd9852a2d74ab328fbdc";
const per_page = 100;
const format = "json";

const main = document.querySelector("main");
const input = document.querySelector(".search>input");

const list = document.querySelector("#list");

list.addEventListener("click", (e)=>{
    e.preventDefault();
    
    if(e.target == list) return;

    let target = e.target.closest(".item").querySelector(".thumn");

    if(e.target == target){
        let imgSrc = target.parentElement.getAttribute("href");
        let pop = document.createElement("aside");
        pop.innerHTML = `
        <img src="${imgSrc}">
            <span class="close">CLOSE</span>
        </img>
        `;
        main.append(pop);
    }else{
        return;
    }
});

main.addEventListener("click",(e)=>{
    let pop = main.querySelector("aside");
    if(pop != null){
        let close = pop.querySelector(".close");
        if(e.target == close) pop.remove();
    }
});

input.addEventListener("keypress", (e)=>{
   if(e.keyCode == 13){
      const tags = input.value;
      const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tags}&privacy_filter=1`;

      if(tags == ""){
         list.innerHTML = "";
         alert("검색어를 입력해주세요");
   
      }
      else if(tags != ""){
         list.innerHTML = "";
         callData(url);
      }
   }
})

function callData(url){
   list.innerHTML = "";
   list.classList.remove("on"); 
   fetch(url)
      .then((data)=>{
         let result = data.json();   
         return result;
      })
      .then((json)=>{
         let items = json.photos.photo;
         creatList(items);
      })
}
function creatList(items){
   let htmls = "";

   items.map((el,index)=>{
         let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
         let BigImgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

         htmls += `
            <li class="item">
               <div>
                     <a href="${BigImgSrc}">
                        <img src="${imgSrc}" class="thumn" alt="">
                     </a>
               </div>
            </li>
         `;
         list.innerHTML = htmls;
         delayLoading();

   });
}

function iso(){
   list.classList.add("on");
   new Isotope("#list",{ 
      itemSelection : ".item",
      columnWidth: ".item",
      transitionDuration: "0.5s"
   });
}

function delayLoading(){
   const imgs = list.querySelectorAll("img");
   const len = imgs.length;
   let count = 0;
   for(let el of imgs){
      el.addEventListener("load",()=>{
         count++
         if(count == len){
               iso();
         }
      });
      el.addEventListener("error", (e)=>{
         e.currentTarget.closest(".item").querySelector("img").setAttribute("src", "img/k1.jpg");
      })
   }
}

