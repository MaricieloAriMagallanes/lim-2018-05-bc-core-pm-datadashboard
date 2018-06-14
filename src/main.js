//Declaramos las variables
let output=document.getElementById('selector');
let users=document.getElementById('users');
output.length=0;

var defaultOption=document.createElement('opcion');
defaultOption.text='Elije tu grupo';

output.appendChild(defaultOption);
output.selectedIndex = 0;

//Aqui aplicamos el fetch 

fetch('http://127.0.0.1:5500/data/cohorts.json')

  .then(
    function(cohorts) {
    if (cohorts.status !== 200){
      console.warn('Observa hay un problema en el estado del codigo'+ cohorts.status);
      return;
    }
    
    cohorts.json().then(function(myData){
      let opcion;

      for(var i=0; i< myData.length; i++){
      option= document.createElement('option');
      option.text=myData[i].id;
      option.value=myData[i].id;
      output.add(option);
      }
    });
  }
  )
  .catch(function(err){
    console.error('fetch error-', err);
  });

  function myFunction(){
    var x= document.getElementById('selector').value;
    console.log(x);
    if(x === "lim-2018-03-pre-core-pw")
    {
      fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json')
      .then(function(users) {
        return users.json();
      })
      .then((myDataUser)=>{
        for(var i=0;i<myDataUser.length;i++){
          const p=document.createElement('p');
          p.innerText=myDataUser[i].name;
          users.appendChild(p);
        }
      }
     )
    }
  }
