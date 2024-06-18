let slider=document.querySelector('.slider')
let sliderValue=document.querySelector('.sliderValue')
let copyBtn=document.querySelectorAll('.copyBtn')
let password=document.querySelector('.password')
let checkBoxes=document.querySelectorAll('input[type="checkbox"]')
let generateBtn=document.getElementById('generate')
let strengthIndicator=document.getElementById("strength")
let passCollect=""
let included=[]
let strength=0
let history=[]
if(localStorage.history){
    history=JSON.parse(localStorage.history)
}
else{
    history=[]
}
let historyBtn=document.getElementById("historyBtn") 
let historySec=document.querySelector(".historySec")
let overlay=document.querySelector(".overlay")
let closeBtn=document.getElementById('closeBtn')
let historyCont=document.querySelector('.historyCont')
///////////////////////////////////////////////////////////////////


disSliderValue()


copyBtn.forEach((copyBtn)=>{
    copyBtn.addEventListener('click',()=>{copyPass(copyBtn,password.innerHTML)})
})
generateBtn.addEventListener('click',generate)

checkBoxes.forEach((box)=>{
    box.addEventListener('click',()=>checkChange(box))
})

checkBoxes[0].click()
checkBoxes[1].click()
checkBoxes[2].click()
displayHistory(history)


historyBtn.addEventListener('click',()=>{
    document.body.classList.add("dis")
})
closeBtn.onclick=()=>{
    document.body.classList.remove("dis")
}




//main functions


function disSliderValue(){
    slider.oninput=()=>{
        sliderValue.innerHTML =slider.value
        
    }
}

function copyPass(copyBtn,password){
    navigator.clipboard.writeText(password)
    copyBtn.innerHTML="copied!"
    copyBtn.classList.remove("fa-solid")
    copyBtn.classList.remove("fa-copy")
    setTimeout(()=>{
        copyBtn.classList.add("fa-solid")
        copyBtn.classList.add("fa-copy")
        copyBtn.innerHTML=""
    },2000)
}
    




function generate(){
    if(included.length==0){
        window.alert("you should at least include one element")
    }
    else{
        passCollect=""
        for(let i=0;i<slider.value;i++){
            passCollect+= randomChar(randomChar(included))
        }
        password.innerHTML=passCollect
        strengthCalc()
        addToHistory(passCollect)
        
        
        
    }
}


function randomChar(set){
    return set[Math.floor(Math.random()*set.length)]
}


function checkChange(box){
    if(box.dataset.checked=="false"){
        box.dataset.checked="true"
        included.push(box.dataset.char)
    }
    else{
        box.dataset.checked="false"
        included=included.filter((item)=>item!==box.dataset.char)
    }
}

function strengthCalc(){
    strength=0
    if(/[A-Z]/.test(passCollect)){
        strength+=1
    }
    if(/[a-z]/.test(passCollect)){
        strength+=1
    }
    if(/\d/.test(passCollect)){
        strength+=1
    }
    if(/[~!@#$%^&*_+|:'?/.,]/.test(passCollect)){
        strength+=1
    }
    if(passCollect.length<8){
        strength+=0
    }
    else if(passCollect.length<12){
        strength+=1
    }
    else if(passCollect.length<16){
        strength+=2
    }
    else{
        strength+=3
    }

    if(strength < 5){
        strengthIndicator.innerHTML="weak"
        strengthIndicator.className="weak"
    }
    else if(strength < 7){
        strengthIndicator.innerHTML="medium"
        strengthIndicator.className="medium"
    }
    else{
        strengthIndicator.innerHTML="strong"
        strengthIndicator.className="strong"
    }
}

function addToHistory(pass){
    history.push(pass)
    if(history.length>10){
        history.shift()
    }
    localStorage.history=JSON.stringify(history)
    displayHistory(history)
    
}

function displayHistory(history){
    historyCont.innerHTML=""
    if(history.length==0){
        historyCont.innerHTML="Empty"
    }
    for(let i=history.length-1;i>=0;i--){
        let div=document.createElement("div")
        div.className='passCont'
        let pass=document.createElement("p")
        pass.innerHTML=history[i]
        let copyBtn=document.createElement("i")
        copyBtn.className="fa-solid fa-copy copyBtn"
        copyBtn.onclick=()=>{copyPass(copyBtn,pass.innerHTML)}
        div.append(pass,copyBtn)
        historyCont.appendChild(div)
    }
}