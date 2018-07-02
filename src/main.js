//Función y condiciones para usuario y contraseña de inicio.html
function validar()
{
var usuario = document.getElementById("usuario").value;
var contraseña = document.getElementById("contraseña").value;

if(usuario== "alejandralaboratoria" && contraseña == "12345")
{
   location.href ="http://127.0.0.1:5500/src/"; //propiedad para direccionar a un link
}
else
{
   alert("Usuario y/o contraseña inválidos. Por favor verifique sus datos.");
}
}
//Declaracion de variables
const sede = document.getElementById("sede");
const year=document.getElementById("year");
const cohort = document.getElementById("cohort");
const users= document.getElementById('name');
let userId = '';
let userName = '';
//Realizamos la tabla // tb=tabla
let tb = '';
      tb += '<tr>';
      tb += '<th> Nombres </th>';
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
      myDataCohorts.forEach(users => {
        const cohortsIds = users.id;
        const splitCohort = cohortsIds.split('-');
        if (splitCohort[0] === sede.value) {
          tb += '<option value="' + cohortsIds + '">' + cohortsIds + '</option>';         
        }
      });  
      cohort.innerHTML = tb;
    })
})
//
cohort.addEventListener('change', () => {
  fetch('../data/cohorts/' + cohort.value + '/users.json')
    .then((response) => response.json())
    .then((myUsers) => {
      fetch('../data/cohorts/' + cohort.value + '/progress.json')
        .then((response) => response.json())
        .then((myDataProgress) => {
           for (let value of myUsers) {  // for (let value of myUsers)
            if (value.role === "student") { // if (value.role .... )
              tb += '<tr>';
              tb += '<td id= "nombrestabla">' + value.name + '</td>';
              if (myDataProgress.hasOwnProperty(value.id)) {
                const progressUser = myDataProgress[value.id];
                if (progressUser.hasOwnProperty('intro')) {
                  const intro = progressUser.intro;
                  const unitIntroduction = intro.units['01-introduction'];
                  const unitVariables = intro.units['02-variables-and-data-types'];
                  const unitUx = intro.units['03-ux-design'];
                  const resultadoExecises = unitVariables.parts['06-exercises'].completed;
                  const resultadoQuiz = unitIntroduction.parts['04-quiz'].completed + unitVariables.parts['05-quiz'].completed + unitUx.parts['03-quiz'].completed;
                  const resultadoLecturas = unitIntroduction.parts['00-welcome-and-orientation'].completed + unitIntroduction.parts['01-growth-mindset'].completed + unitIntroduction.parts['02-why-learn-to-code'].completed + unitIntroduction.parts['03-your-first-website'].completed + unitVariables.parts['00-values-data-types-and-operators'].completed + unitVariables.parts['01-variables'].completed + unitVariables.parts['02-self-learning-MDN'].completed + unitVariables.parts['03-comments'].completed + unitUx.parts['00-development-team'].completed + unitUx.parts['01-ux-design'].completed + unitUx.parts['02-ux-design-vs-ui-design'].completed;
                  if (intro.hasOwnProperty('percent')) {
                    tb += '<td>' + intro.percent + '</td>';
                    tb += '<td>' + resultadoExecises * 100 +'</td>';
                    tb += '<td>' + parseInt(resultadoQuiz * 100 / 3) + '</td>';
                    tb += '<td>' + parseInt(resultadoLecturas * 100 / 11) + '</td>';
                    tb += '</tr>';
                  }
                } else {
                  tb += '<td>Deserto</td>';
                  tb += '<td>Deserto</td>';
                  tb += '<td>Deserto</td>';
                  tb += '<td>Deserto</td>';
                  tb += '</tr>';
                }
              }
            }
          }
    
          users.innerHTML = tb
        })
    })      
})