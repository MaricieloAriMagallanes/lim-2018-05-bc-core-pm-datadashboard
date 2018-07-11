//Función y condiciones para usuario y contraseña de inicio.html
function validar() {
  var usuario = document.getElementById("usuario").value;
  var contraseña = document.getElementById("contraseña").value;

  if (usuario == "alejandralaboratoria" && contraseña == "12345") {
    location.href = "http://127.0.0.1:5500/src/"; //propiedad para direccionar a un link
  }
  else {
    alert("Usuario y/o contraseña inválidos. Por favor verifique sus datos.");
  }
}
//Declaracion de variables
const sede = document.getElementById("sede");
const year = document.getElementById("year");
const cohort = document.getElementById("cohort");
const users = document.getElementById('name');
const searchUser = document.getElementById('boxSearch');
let userId = '';
let userName = '';
let cmb='';
//Realizamos la tabla // tb=tabla
let tb = '';
tb += '<tr>';
tb += '<th> Nombres"</th>';
tb += '<th> % General </th>';
tb += '<th> % Ejercicios</th>';
tb += '<th> % Quizzes</th>';
tb += '<th> % Lecturas </th>';
tb += '</tr>' 
//Realizamos los fetchs
sede.addEventListener("change", () => {
  fetch('../data/cohorts.json')
    .then((cohorts) => cohorts.json())
    .then((myDataCohorts) => {
      cmb= '' ;
      myDataCohorts.forEach(users => {
        const cohortsIds = users.id;
        const splitCohort = cohortsIds.split('-');
        if (splitCohort[0] === sede.value) {
        cmb += '<option value="' + cohortsIds + '">' + cohortsIds + '</option>';
        }
      });
      cohort.innerHTML = cmb;
    })
})

const options = {cohort:{},cohortData:{users: [],progress: []},orderBy:"",orderDirection:"",search:""};
//
cohort.addEventListener('change', () => {
  fetch('../data/cohorts/' + cohort.value + '/users.json')
    .then((response) => response.json())
    .then((myUsers) => {
      fetch('../data/cohorts/' + cohort.value + '/progress.json')
        .then((response) => response.json())
        .then((myDataProgress) => {
          options.cohortData.users = myUsers;
          options.cohortData.progress = myDataProgress;
          //console.log(users);
          //const usersWithStats = processCohortData(options);
          // const usersWithStats = computeUserStats(myUsers, myDataProgress, courses
          for(let value of myUsers) {  // for (let value of myUsers)|
            if (value.role === "student") { // if (value.role .... )
              tb += '<td id= "nombrestabla">' + value.name + '</td>';
              //console.log(value.name);
              const nameuser=value.name;
              if (myDataProgress.hasOwnProperty(value.id)) {
                const progressUser = myDataProgress[value.id];
                let course = 'intro';
                if (progressUser.hasOwnProperty(course)) {
                  const userCourseProgress = progressUser[course];
                  //console.log(userCourseProgress);

                  let percentUnits = 0;
                  let units = 0;
                  let parts=0;
                  let totalReads = 0;
                  let exTotal = 0;
                  let exCompleted = 0;
                  let completedReads = 0;
                  let quizTotal =0;
                  let quizCompleted=0;
                  let userStats = {percent:0};
                  
                  Object.values(userCourseProgress.units).forEach((unit) => {
                    //console.log(unit.percent);
                    percentUnits += unit.percent;
                    units++;
                    // for (let part of Object.values(unit.parts)) {                    
                    for (let part of Object.values(unit.parts)){
                      //console.log(part);
                      if (part.type === 'read') { 
                        totalReads++;
                        
                        if (part.completed === 1){
                          completedReads++;
                        }                      
                      }                   
                      if (part.hasOwnProperty('exercises')) {
                        for (let ex of Object.values(part.exercises)){
                          exTotal++;
                        exCompleted = exCompleted + ex.completed
                          //exCompleted += ex.completed
                          //exTotal ++;
                        // console.log(exTotal)
                        }
                      }
                      if (part.type === 'quiz') {
                        quizTotal ++;
                        if (part.completed === 1) {
                          quizCompleted ++;
                        }
                      }
                  }
                  })
                  userStats.percent = percentUnits;
                  //console.log(userStats);
                  let exOut=Math.round(exCompleted * 100 /exTotal);
                    tb += '<td>' + Math.round(percentUnits / units) + '</td>';
                    tb += '<td>' + (isNaN(exOut)? '0':exOut) + '</td>';
                    tb += '<td>' + Math.round((quizCompleted * 100 / quizTotal)) + '</td>';
                    tb += '<td>' + Math.round(completedReads * 100 / totalReads) + '</td>';
                    tb += '</tr>';
                } else{
                  tb += '<td>'+ 0 + '</td>';
                  tb += '<td>'+ 0+'</td>';
                  tb += '<td>'+ 0 + '</td>';
                  tb += '<td>'+ 0 + '</td>';
                  tb += '</tr>';
                }
              }
            }
          }
     //NOTA: FALTAN 2 CAMPOS EN LA TABLA 
          users.innerHTML = tb
          //console.log(tb);
        })
    })
    //Realizamos el filter
searchUser.addEventListener('keyup', (event) => {
  //console.log(options);
  options.search = event.target.value;
  
  //console.log(options.cohortData.users);
  //console.log(options.search);
  //console.log(options);
  //console.log(event.target.value);
  usersFilter = processCohortData(options);
  //let usersFilter = filterUsers(options.cohortData.users, event.target.value);
   console.log(usersFilter)
   
})
})
