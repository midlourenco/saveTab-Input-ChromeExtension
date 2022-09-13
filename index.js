let inputContent = document.getElementById("input-content")
let savedContentList= document.getElementById("saved-content-list")
let inputBtn = document.getElementById("saveInput-btn")
let deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById("saveTab-btn")
let errorMsg=document.getElementById("error-msg")
let nullMsg=document.getElementById("null-msg")

// let tabs=[
//         {
//             url: "https://www.linkedin.com/in/per-harald-borgen/"
//         }
//     ]
let existingSavedContent = JSON.parse(localStorage.getItem("savedList"))
if(existingSavedContent){
        renderSavedContent(existingSavedContent)
}else{
    existingSavedContent=[]
}

inputBtn.addEventListener("click", function(){
    let newInput = inputContent.value
    inputContent.value=""
    clearErrorMsg()


    if(newInput.trim()!=""){
        if(!existingSavedContent.includes(newInput)){
        existingSavedContent.push(newInput)
        localStorage.setItem("savedList",JSON.stringify(existingSavedContent ))
        renderSavedContent(existingSavedContent)
        }else{
            errorMsg.removeAttribute("class","hide")
        }
    }else{
        inputContent.setAttribute("class","errorBorder")
        nullMsg.removeAttribute("class","hide")

    }

})

tabBtn.addEventListener("click", function(){
        chrome.tabs.query({
            active:true,
            currentWindow:true
        }, function(tabs){
            if(!existingSavedContent.includes(tabs[0].url)){
            existingSavedContent.push(tabs[0].url)
            localStorage.setItem("savedList",JSON.stringify(existingSavedContent ))
            renderSavedContent(existingSavedContent)
            }else{
                errorMsg.removeAttribute("class","hide")
            }
            
        })
        clearErrorMsg()

})


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    existingSavedContent=[]
    renderSavedContent(existingSavedContent)
})

function renderSavedContent(existingSavedContent){
    //savedContentList.innerHTML=""
    savedContentList.replaceChildren("")

    existingSavedContent.forEach(element => {
        let li = document.createElement('li');
        let link= document.createElement("a");  
        let linkText = document.createTextNode(element);
        link.setAttribute("href",element);
        link.appendChild(linkText);
        li.appendChild(link);
        savedContentList.appendChild(li);
    });
  
}

function clearErrorMsg(){
    nullMsg.setAttribute("class","hide")
    errorMsg.setAttribute("class","hide")
    inputContent.removeAttribute("class","errorBorder")
}