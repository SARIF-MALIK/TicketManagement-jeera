const addBtn = document.querySelector('.addTicket'); 
const container = document.querySelector('.container'); 
const textArea = document.querySelector('.textarea-cont'); 
const rmvBtn = document.querySelector('.removeTicket'); 
const priorityColor = document.querySelectorAll('.priority-color'); 
let mainCont = document.querySelector('.main-cont'); 
let addFlag = false; 
let removeFlag = false; 
const navClr = document.querySelectorAll('.clr'); 
let ticketArr = []; 

if( localStorage.getItem('jiraTickets')){
    ticketArr = JSON.parse(localStorage.getItem("jiraTickets")); 
    ticketArr.forEach((ticketObj)=>{
        addTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId);
    })
} 

let colors = ["lightpink", "lightblue", "lightgreen", "black"]; 
let containerPriorityColor = colors[colors.length-1];
// console.log(priorityColor); 
Array.from(priorityColor).forEach((colorElem) => {
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
    console.log(removeFlag); 
})

container.addEventListener('keydown', (e)=>{
    let key = e.key; 
    let ticketColor = containerPriorityColor; 
    let ticketTask = textArea.value; 
    if(key==='Enter'){
        setContainerDefault(); 
        addTicket(ticketColor, ticketTask); 
    }   
})

function addTicket(ticketColor, ticketTask, ticketId){
    let id = ticketId || generateShortId(8); 
    let ticketCont = document.createElement('div'); 
    ticketCont.setAttribute('class', 'ticket-cont'); 
    ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}">
    </div>
    <div class="ticket-id"> 
        #${id}
    </div>
    <div class="task-cont">
        ${ticketTask}
    </div>
    <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
</div>`;  
    mainCont.appendChild(ticketCont); 

    if(!ticketId){
        ticketArr.push({ticketColor, ticketTask, ticketId: id}); 
        localStorage.setItem("jiraTickets", JSON.stringify(ticketArr));
    }
    
    // console.log(ticketArr); 
    handleRemoval(ticketCont, id); 
    handleLock(ticketCont, id); 
    handleColor(ticketCont, id); 
}

function handleRemoval(ticketCont, id){
    let ticketIdx = getTicketIdx(id); 
    ticketCont.addEventListener("click", (e) =>{
        if (!removeFlag) return; 
        
        ticketArr.splice(ticketIdx, 1); 
        localStorage.setItem("jiraTickets", JSON.stringify(ticketArr))
        ticketCont.remove(); 
    })
}

let lock = 'fa-lock'
let openLock = 'fa-lock-open'
function handleLock(ticketCont, id){
    let ticketLockElem = ticketCont.querySelector('.ticket-lock'); 
    let ticketTask = ticketCont.querySelector('.task-cont'); 
    let ticketLock = ticketLockElem.children[0]; 
    let ticketIdx = getTicketIdx(id); 

    ticketLock.addEventListener('click', (e)=>{
        if(ticketLock.classList.contains(lock)){
            ticketLock.classList.remove(lock); 
            ticketLock.classList.add(openLock); 
            ticketTask.setAttribute('contenteditable', 'true'); 

        }else{
            ticketLock.classList.remove(openLock); 
            ticketLock.classList.add(lock); 
            ticketTask.setAttribute('contenteditable', 'false'); 
        }
        // modify for local storage 
        ticketArr[ticketIdx].ticketTask = ticketTask.innerText; 
        localStorage.setItem("jiraTickets", JSON.stringify(ticketArr))
    })
}

function handleColor(ticketCont, id){
    let ticketColor = ticketCont.querySelector('.ticket-color'); 
    // get ticket index for localstorage update
    let ticketIdx = getTicketIdx(id); 
    ticketColor.addEventListener('click', function(e){
        let currentTicketColor = ticketColor.classList[1]; 
        // get ticket color index in array 
        let currentTicketColorIndex = colors.findIndex((color) => {
            return currentTicketColor=== color; 
        })
        currentTicketColorIndex++;
        currentTicketColorIndex %= colors.length; 
        ticketColor.classList.remove(currentTicketColor); 
        ticketColor.classList.add(colors[currentTicketColorIndex]); 

        // Modify data in localStorage
        ticketArr[ticketIdx].ticketColor = colors[currentTicketColorIndex]; 
        localStorage.setItem("jiraTickets", JSON.stringify(ticketArr))
    })
}

function getTicketIdx(id){
    let ticketIdx = ticketArr.findIndex((ticketObj)=>{
        return ticketObj.ticketId === id; 
    })
    return ticketIdx; 
}

Array.from(navClr).forEach(elem =>{
     
    elem.addEventListener('click', function(e){
        let currNavClr = elem.classList[1];  
        // console.log(ticketArr) ;

        let filteredTickets = ticketArr.filter((ticketObj, idx)=>{
            return currNavClr === ticketObj.ticketColor; 
        })  

        // remove prv tickets 
        let allTicketsCont = document.querySelectorAll(".ticket-cont"); 
        Array.from(allTicketsCont).forEach(elem => {
            elem.remove(); 
        })

        // display new filtered tickets 
        filteredTickets.forEach((ticketObj, idx)=>{
            addTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId); 
        })
        
    })
    elem.addEventListener('dblclick', (e)=>{
          // remove prv tickets 
          let allTicketsCont = document.querySelectorAll(".ticket-cont"); 
          Array.from(allTicketsCont).forEach(elem => {
              elem.remove(); 
          })

          ticketArr.forEach((ticketObj, idx)=>{
            addTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId); 
        })

    })

})

function setContainerDefault(){

    container.style.display = "none"
    textArea.value = ""; 
    containerPriorityColor = colors[colors.length-1]; 
    priorityColor.forEach((priorityColorElem, idx)=>{
        priorityColorElem.classList.remove('border'); 
    })
    priorityColor[priorityColor.length-1].classList.add('border'); 
}