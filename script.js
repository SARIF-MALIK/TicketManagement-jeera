const addBtn = document.querySelector('.addTicket'); 
const container = document.querySelector('.container'); 
const textArea = document.querySelector('.textarea-cont'); 
const rmvBtn = document.querySelector('.removeTicket'); 
const priorityColor = document.querySelectorAll('.priority-color'); 
let mainCont = document.querySelector('.main-cont'); 
let addFlag = false; 
let removeFlag = false; 

let colors = ["lightpink", "lightblue", "lightgreen", "black"]; 
let containerPriorityColor = colors[colors.length-1];
// console.log(priorityColor); 
Array.from(priorityColor).forEach((colorElem) => {
    console.log(colorElem); 
    colorElem.addEventListener('click', (e)=>{
        priorityColor.forEach((priorityColorElem, idx)=>{
            priorityColorElem.classList.remove('border'); 
        })
        colorElem.classList.add('border'); 
        containerPriorityColor = colorElem.classList[0]; 
    })
 });

addBtn.addEventListener('click', function(e){
    addFlag = !addFlag; 
    addFlag? container.style.display = "flex"  : container.style.display = "none"
})
rmvBtn.addEventListener('click', function(e){
    removeFlag = !removeFlag; 
})

container.addEventListener('keydown', (e)=>{
    let key = e.key; 
    let ticketColor = containerPriorityColor; 
    let ticketTask = textArea.value; 
    let ticketId = generateShortId(8);
    if(key ==='Shift' || key==='Enter'){
        addTicket(ticketColor, ticketTask, ticketId); 
        container.style.display = "none"
        textArea.value = ""; 
    }   
})

function addTicket(ticketColor, ticketTask, ticketId){
    let ticketCont = document.createElement('div'); 
    ticketCont.setAttribute('class', 'ticket-cont'); 
    ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}">
    </div>
    <div class="ticket-id"> 
        #${ticketId}
    </div>
    <div class="task-cont">
        ${ticketTask}
    </div>
    <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
</div>`;  
    mainCont.appendChild(ticketCont); 
    handleRemoval(ticketCont); 
    handleLock(ticketCont); 
}

function handleRemoval(ticketCont){
    if (removeFlag) ticketCont.remove(); 
}

let lock = 'fa-lock'
let openLock = 'fa-lock-open'
function handleLock(ticketCont){
    let ticketLockElem = ticketCont.querySelector('.ticket-lock'); 
    let ticketLock = ticketLockElem.children[0]; 
    
    ticketLock.addEventListener('click', (e)=>{
        if(ticketLock.classList.contains(lock)){
            ticketLock.classList.remove(lock); 
            ticketLock.classList.add(openLock); 
        }else{
            ticketLock.classList.remove(openLock); 
            ticketLock.classList.add(lock); 
        }
    })
}