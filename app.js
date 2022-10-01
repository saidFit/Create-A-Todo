console.log('hello word!!')

const container_Global = document.querySelector('.container-Global'),
      input_text       = container_Global.querySelector('.input'),
      Btn_Add          = container_Global.querySelector('.btn-add'),
      icon_show         = container_Global.querySelector('.fa-ellipsis'),
      container_under_input = container_Global.querySelectorAll('.container-under-input p'),
      container_articles = container_Global.querySelector('.container-articles'),
      Btn_clear        = container_Global.querySelector('.btn-clear')

      

    function showDiv(treePoint){
        
    const divUpdat_delete=treePoint.parentElement.querySelector('.container-update-delete')
           divUpdat_delete.classList.add('shaw')
        document.addEventListener('click',e=>{
            if(!e.target.classList.contains('fa-ellipsis')){
                divUpdat_delete.classList.remove('shaw')
            }
        })   
    }
    let idd,contentDefualt

    function UpdateContent(update){

    const parent =    update.parentElement.parentElement.parentElement.parentElement

    idd=parseInt(parent.getAttribute('data-id'))
    console.log(idd)
    const Content =    update.parentElement.parentElement.parentElement.querySelector('.content')
          contentDefualt=Content
          input_text.value=Content.textContent
          parent.classList.add('up')
          console.log(parent)
          Btn_Add.textContent='Update'
          Btn_Add.classList.add('background')
    }

      function removeaCTIVE(){
        container_under_input.forEach(element => {
        element.classList.remove('active')
      });
      }
  container_under_input.forEach(element => {
      
      console.log(element)
      element.addEventListener('click',e=>{
        removeaCTIVE()
        element.classList.add('active')
        console.log(element.textContent)


        if(element.textContent === 'Completed'){
           
           const Allsection = container_articles.querySelectorAll('section')
           console.log(Allsection)
          for(let d=0;d<Allsection.length;d++){
            console.log(Allsection[d].classList.remove('none'));
          }
           Allsection.forEach(items=>{
            const checkbox = items.querySelector('.container-checkbox').querySelector('input')
           if(checkbox.hasAttribute('checked')){
              console.log(checkbox)
           }else{
          const parentNochecked=  checkbox.parentElement.parentElement.parentElement
                parentNochecked.classList.add('none')
           }
           
           })
        }

        if(element.textContent === 'Pending'){
           const Allsection = container_articles.querySelectorAll('section')
           console.log(Allsection)
           for(let i=0;i<Allsection.length;i++){
            console.log(Allsection[i].classList.remove('none'))
           }
           Allsection.forEach(items=>{
            const checkbox = items.querySelector('.container-checkbox').querySelector('input')
           if(!checkbox.hasAttribute('checked')){
              console.log(checkbox)
           }else{
          const parentchecked = checkbox.parentElement.parentElement.parentElement
                parentchecked.classList.add('none')
               
           }
           })
        }

        if(element.textContent === 'All'){
           const Allsection = container_articles.querySelectorAll('section')
           console.log(Allsection)
           for(let i=0;i<Allsection.length;i++){
            console.log(Allsection[i].classList.remove('none'))
           }
          
           
        }

      })
      
  });    



input_text.placeholder= `add a Now task`

getNotes().forEach(element => {
        console.log(element)
        CreateElement(element.id,element.content,element.checked)
});





function getNotes(){
    return JSON.parse(localStorage.getItem('notes')||"[]")
}





function saveNotes(note){
    localStorage.setItem('notes',JSON.stringify(note))
}




function checkboxMY(checkbox){
    console.log(checkbox)
    if(checkbox.checked){
        console.log(true)
    }else{
        console.log(false)
    }
 const parent =checkbox.parentElement.parentElement.parentElement   
 const id= parseInt(checkbox.parentElement.parentElement.parentElement.getAttribute('data-id'))
   updateCheckbox(id,checkbox) 
 }




 function updateCheckbox(id,checkbox){
    console.log(id)
   const Notes = getNotes()
   const getelement =Notes.filter(note => note.id==id )[0];
   if(getelement.checked!==''){
        getelement.checked=''
        console.log(getelement)
        saveNotes(Notes)
        checkbox.removeAttribute('checked','')
        return;
   }else{
    getelement.checked='checked'
    console.log(getelement)
    saveNotes(Notes)
    checkbox.setAttribute('checked','')
    
   }
 
 }
 

function CreateElement(id,content,checked){
    
    const div =`  <section data-id=${id}>
    <hr>

    <div class="container">
    <div class="container-checkbox"><input class=checkbox onclick="checkboxMY(this)" type="checkbox" name="checkbox" ${checked}>
    <p class='content'>${content}</p>
  </div>
    
    <span class="container-abs">
        <i class=" taper fa-solid fa-ellipsis" onclick="showDiv(this)" ></i>
        <div class="container-update-delete">
            <p onclick="UpdateContent(this)">Update</p>
            <p onclick="clickDelete(this)">Delete</p>
        </div>
    </span>  
    </div>
  
</section>`


container_articles.innerHTML+=div   







}


// localStorage.clear()
function addNotes(){
    if(Btn_Add.textContent!=="Update"){

        if(input_text.value!==''){
            const Notes = getNotes();

  let obj = {
      id:Math.floor(Math.random()*1000),
      content:input_text.value,
      checked:''

  }

  Notes.push(obj)
  CreateElement(obj.id,obj.content,obj.checked)
  saveNotes(Notes)
  input_text.value=''
  }
    }else{
        console.log('content:update')
        console.log(contentDefualt)
        UpdateContentt(idd,input_text.value,contentDefualt)

    }
   
    
    
  
}

function UpdateContentt(id,NewContent,contentDefualt){
    console.log(id,NewContent)
    const Notes =getNotes()
    const getNote=Notes.filter(note=>note.id==id)[0];
    console.log(getNote)
    getNote.content=NewContent
    contentDefualt.innerHTML=NewContent
    saveNotes(Notes)
    input_text.value=''
    Btn_Add.innerHTML='Add'
    Btn_Add.classList.remove('background')

}
Btn_Add.addEventListener('click',addNotes)

function clickDelete(btnDelete){
  const parent =btnDelete.parentElement.parentElement.parentElement.parentElement
  const id     =parseInt(parent.getAttribute('data-id'))
  console.log(parent,id)
  deleteElement(id,parent)

}

function deleteElement(id,HTMLelement){
      console.log(id,HTMLelement)

      const Notes = getNotes()//[{},{},{}...]

      const getAllSaufthis = Notes.filter(note=>note.id!==id)
      console.log(getAllSaufthis)
      container_articles.removeChild(HTMLelement)
      saveNotes(getAllSaufthis)
      
}

function removeAll(){
window.localStorage.clear() 
const sectionAll =container_articles.querySelectorAll('section')
for(let i=0;i<sectionAll.length;i++){
    console.log(sectionAll[i].remove())
}

}

Btn_clear.addEventListener('click',removeAll)

