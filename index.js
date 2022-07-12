// take the add button by getElement by id
let Add_btn= document.getElementById('submit_note');

// apply click events on button to save he notss dataq
Add_btn.addEventListener('click',(e)=>{
    let titles= document.getElementById('title');       //take titke from text area
    let contants= document.getElementById('contant');   // take contant from text area
    if (titles.value==""||contants.value=="")
     return alert("You can't add without entering the title and contant");
           
    
       
    let notes= localStorage.getItem("notes");           // fetch store data in the localstorage
    if(notes==null){                                     // check it is empty or not
        Obj=[];
    }else{
        Obj=JSON.parse(notes);                     
    }
    let data={                                        //create an object for user input notes details
        title:titles.value,
        contant:contants.value
    }
   Obj.push(data);                                //insetr the object on notobject
   localStorage.setItem("notes",JSON.stringify(Obj));  //sotre Object in localstorage
   titles.value="";                                       //set title in UI empty
   contants.value="";                                      // set contant in UI empty

   displayNotes();                                    //call display function to shoe the notes

}) ;

// Show function to display  the notes which is stored in the localstorage

function displayNotes(){
    let notes= localStorage.getItem("notes");       // fetch store data in the localstorage\
    
    if(notes==null){
        Obj=[];
    }else{
        Obj=JSON.parse(notes);
    }
    let htm="";                                      
    Obj.forEach(function(element, index)   // take all the store notes in localstorage by using foreach loop
    {             
        htm +=`<div class="doc">
        <h4 class="t">${element.title}</h4>
        <p class="doc1">${element.contant}</p>
        <button id="${index}" onclick="delete_fun(this.id)" class="delete">Delete note</button>
        <button id="${index}" onclick="edit_fun(this.id)" class="edit">Edit Note</button>
        </div>`;
     });
   
    let note=document.getElementById("notes");
    if(Obj.length!=0)
      note.innerHTML=htm;                       // display in UI
    else
      note.innerHTML="NO notes Avaliable";

}

// Delete the note which is store in the localstorage.

function delete_fun(index){
    let conf_delete=confirm("Are you want ro delete the notes!")
    if(conf_delete==true)
    {
    let notes= localStorage.getItem("notes");
    if(notes==null){
        Obj=[];
    }else{
        Obj=JSON.parse(notes);
    }
    Obj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(Obj));
    displayNotes();

    }
}

//Edit the store notes 

function edit_fun(index){
    let notes=localStorage.getItem("notes");             // fetaching data feom localstrage
    let titles= document.getElementById('title');
    let contants= document.getElementById('contant');
    
    if(notes==null){
        Obj=[];
    }else{
        Obj=JSON.parse(notes);
    }
    Obj.findIndex((element, index)=>{   //set localstorage  notes data in to the UI
        titles.value=element.title;
        contants.value=element.contant;
    })
    Obj.splice(index,1);                        //splice function to delete the old nots in paraticual index
    localStorage.setItem("notes",JSON.stringify(Obj)); // set nuw valeue on the particular index

    displayNotes();          // after editing calling the display functon
}

displayNotes();      // default the display function call
