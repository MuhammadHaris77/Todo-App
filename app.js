
var b = document.getElementById('myInput');  
var a = document.getElementById('main');

firebase.database().ref('todos').on('child_added',function(data){


       if( data.val().value == "" ){
        swal("Opps!", "First Write Todo In Input?", "warning");
    
       } else{
    
        
    var a = document.getElementById('main');
    var newElement = document.createElement('P');
    newElement.setAttribute('class','para')
    var text = b.value.toLocaleUpperCase();
    text = document.createTextNode(data.val().value);
    newElement.appendChild(text);
      a.appendChild(newElement) 
    
    
    var editBtn = document.createElement('BUTTON');
    var editText = document.createTextNode('Edit');
     editBtn.appendChild(editText);
     editBtn.appendChild(editText);
     editBtn.setAttribute('class','editBtn')
     editBtn.setAttribute('id',data.val().key)
     editBtn.setAttribute('onclick','editTodo(this)')

     newElement.appendChild(editBtn)
    
    
     var dltBtn = document.createElement('BUTTON');
     var dltText = document.createTextNode('Delete');
     dltBtn.appendChild(dltText);
     dltBtn.setAttribute('class','dltBtn')
     dltBtn.setAttribute('id',data.val().key)
     dltBtn.setAttribute('onclick','deleteTodo(this)')
     newElement.appendChild(dltBtn);
     swal("Good Job!", "You Are Added Todo!", "success");
    }  
    
})

function input() {
var database = firebase.database().ref('todos')
var key = database.push().key
var todo = {
  value : b.value,
  key : key
}
database.child(key).set(todo)
b.value = " " ;
}


function deleteTodo(e) {
  firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
    swal("Good Job!", "Your Todo Delete Succesfully!", "success");

}
  
function editTodo(e) {
    var  val = prompt("Enter your new Todo?",e.parentNode.firstChild.nodeValue)
    var updateTodo = {
        value : val,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(updateTodo)
    e.parentNode.firstChild.nodeValue = val  
    swal("Good Job!", "Your Todo Edited Succesfully!", "success");

    }

     
function deleteAll(){
    firebase.database().ref('todos').remove()
    a.innerHTML = ""
    swal("Good Job!", "Your All Todo Delete Succesfully!", "success");

 }