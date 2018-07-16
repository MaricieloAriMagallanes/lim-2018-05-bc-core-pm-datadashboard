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

const cohortsLink = '../data/cohorts.json';
const usersLink = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressLink = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

let  options = {
  cohort: [],
  cohortData: {
    users: [],
    progress: {}
  },
  orderBy: "",
  orderDirection: "",
  search: ""
};

window.usersWithStats = []
const getData = (callData) => {
  fetch(usersLink)
    .then((responseUser) => {
      fetch(progressLink)
        .then((responseProgress) => {
          fetch(cohortsLink)
            .then((responseCohort) => {
              Promise.all([responseUser.json(), responseProgress.json(), responseCohort.json()])
                .then(dataArray => {
                  [window.users, window.progress, window.cohorts] = dataArray; 
                  callData(users, progress, cohorts);
                })
            })
        })
    })
}
const callGetData = (users, progress, cohorts) => {
  cohortChose(cohorts);

  const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  window.usersWithStats = computeUsersStats(users, progress, courses)
}

getData(callGetData); // promise.all de los fetch con datos

let combo1 = document.getElementById('cedeCombo'); // JS y HTML
combo1.length = 0;
let defaultCede = document.createElement('option'); //define la opcion por defecto
defaultCede.text = 'Selecciona una sede';
combo1.add(defaultCede);
combo1.selectedIndex = 0;

const cedeSelector = (optionC) => { // combo para seleccionar 
  let cede = [
    { value: "lim", text: "Lima" },
    { value: "scl", text: "Santiago" },
    { value: "cdm", text: "Ciudad de México" },
    { value: "spl", text: "Sao Paulo" }
  ];

  cede.forEach(item => {
    optionC = document.createElement('option');
    optionC.text = item.text;
    optionC.value = item.value;
    combo1.add(optionC);
  })
};
cedeSelector(combo1);

let combo = document.getElementById('cohortsCombo'); //Asociando JS y HTML

const cohortChose = (cohort) => {
  combo.length = 0;
  let defaultOption = document.createElement('option'); //Definiendo el option por defecto
  defaultOption.text = 'Selecciona el Grupo';
  
  combo.add(defaultOption);
  combo.selectedIndex = 0;

  for (let i = 0; i < cohort.length; i++) {
    option = document.createElement('option');
    option.text = cohort[i].id;
    option.value = cohort[i].id;
    combo.add(option);
  }
}
//FIN DROPDOWN COHORTS

cedeOnChange = () => {
  let cohortFilter = window.cohorts.filter(item => (item.id.slice(0, 3) == combo1.value));
  cohortChose(cohortFilter);
}

//PINTA USUARIOS DE LIM PRECORE 2018
function dataUsers() { //Detecta cohort de preadmisión y pinta sus users en el HTML
  let lim = document.getElementById('cohortsCombo').value;
  if (lim === "lim-2018-03-pre-core-pw") {
     
    let tableCont = document.createElement('div');
    tableCont.classList = "contenedortable"
    tableCont.id = "contenedor"
    let tb = document.createElement('table');
    tb.classList = "tb";
    let tHead = document.createElement('tr');
    tHead.classList = "tHead";
    tHead.innerHTML += '<th>Alumnas</th><th>%Completitud general</th><th>%Ejercicios</th><th>%Lecturas<th>% Quizzes</th>';
    tb.appendChild(tHead);

    window.usersWithStats.forEach(user => {
      // console.log(user);
      let tbRow = document.createElement('tr');
      tbRow.innerHTML += '<td>' + user.name + '</td>';
      tbRow.innerHTML += '<td>' + user.stats.percent + '</td>';
      tbRow.innerHTML += '<td>' + user.stats.exercises.percent + '</td>';
      tbRow.innerHTML += '<td>' + user.stats.reads.percent + '</td>';
      tbRow.innerHTML += '<td>' + user.stats.quizzes.percent + '</td>';
      tb.appendChild(tbRow);

    })

    tableCont.appendChild(tb);
    six.appendChild(tableCont);

  }

}
//Aqui comienza el filter
// Aqui declaramos variables para el filter
  const searchUser = document.getElementById("boxSearch");
  const studentsOrderBy = document.getElementById('orderBy');
  const studentsOrderDirection = document.getElementById('orderDirection');

  searchUser.addEventListener('keyup', (event) => {
    //carga nuevamente la data de usuarios cada vez que se teclea
    let dataUsuarios = computeUsersStats(window.users, window.progress, window.cohorts);
    mostrarVista(dataUsuarios);
    
  });

// Aqui empieza en ordenar por ... en direccion a ....
function ordenar(){
  //envia el array generado actualmente
  let dataUsuarios = window.usersWithStats;
  mostrarVista(dataUsuarios);

}

//arma la tabla, recibe el array de usuarios
function mostrarVista(dataUsuarios){

  let criterio = searchUser.value;  
  let orderBy = studentsOrderBy.value;
  let direction = studentsOrderDirection.value;

    //reasigna el objeto options con los nuevos valores
    options.cohort = window.cohorts;
    options.cohortData.users = dataUsuarios;
    options.cohortData.progress = window.progress;
    options.orderBy = orderBy;
    options.orderDirection = direction;
    options.search = criterio;
    
    //reasigna el valor del array usuarios
    window.usersWithStats = processCohortData(options);
    var el = document.getElementById('contenedor');
    el.remove();
    dataUsers();

}


