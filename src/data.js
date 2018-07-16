window.processCohortData = (options) => {
    //console.log(options);
    let courses = options.cohort;
    let computeUsers = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    let usersfilter = filterUsers(computeUsers, options.search);
    let sortusers = sortUsers(usersfilter, options.orderBy, options.orderDirection);
    
    return sortusers;
  }
  
  window.computeUsersStats = (users, progress, courses) => {
    let usersWithStats = [];
    let i = 0
    users.forEach(user => {
      // console.log(user.id, progress[user.id])
  
      let users = user;
      users.progress = progress[user.id]
      users.stats = {
        percent: 0,
        exercises: {
          total: 0,
          completed: 0,
          percent: 0
        },
        quizzes: {
          total: 0,
          completed: 0,
          percent: 0,
          scoreSum: 0,
          scoreAvg: 0,
        },
        reads: {
          total: 0,
          completed: 0,
          percent: 0
        }
      }
  
      if (users.progress['intro'] && users.progress['intro']['units'] && users.role === "student") {
        let unitsUser = Object.keys(users.progress['intro']['units'])
        // console.log(unitsUser);
        let puntuacion = 0
        let unitsUserMap = [];
        unitsUser.forEach(unit => {
          // console.log(newUser.progress['intro']['units'][unit]);
          unitsUserMap[unit] = users.progress['intro']['units'][unit];
          // console.log(unitsUserMap[unit]);
          let unitParts = Object.keys(unitsUserMap[unit]['parts']);
          // console.log(unitParts);
          let partsMap = [];
  
          unitParts.forEach(part => {
            partsMap[part] = unitsUserMap[unit]['parts'][part];
            // AQUI CALCULAS EL STATS POR CADA USUARIO
            if (partsMap[part].type === "practice") {
              users.stats.exercises.total++
              if (partsMap[part].completed == 1) {
                users.stats.exercises.completed++
              }
              
              users.stats.exercises.percent = Math.round((users.stats.exercises.completed * 100) / users.stats.exercises.total)
            }
            // para porcentaje de lecturas
            if (partsMap[part].type === "read") {
              users.stats.reads.total++
              if (partsMap[part].completed == 1) {
                users.stats.reads.completed++
              }
              users.stats.reads.percent = Math.round((users.stats.reads.completed * 100) / users.stats.reads.total)
            }
            // para porcentaje de quizzes
            if (partsMap[part].type === "quiz") {
              users.stats.quizzes.total++
  
              if (partsMap[part].completed == 1) {
                users.stats.quizzes.completed++
                puntuacion += partsMap[part].score
              }
              users.stats.quizzes.percent = Math.round((users.stats.quizzes.completed * 100) / users.stats.quizzes.total)
               // console.log(users.stats.quizzes)
            }
          })
          unitsUserMap[unit]['parts'] = partsMap
        })
  
        users.stats.quizzes.scoreSum = puntuacion; // todas las puntuacion
        users.stats.quizzes.scoreAvg = Math.round(puntuacion / users.stats.quizzes.completed);  // todas las puntiacion / el total de quizzes completados
  
  
        users.progress['intro']['units'] = unitsUserMap;
        users.stats.percent = users.progress['intro'].percent
      }
      usersWithStats[i] = users
      i++
    })
    // console.log(usersWithStats)
    return usersWithStats
  }
  
  window.filterUsers = (users, search) => {
    let usersFilter = users.filter(
      user =>
        user.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    )
    return usersFilter
   }
  
  window.sortUsers = (users, orderBy, orderDirection) => {
    let usersSort = users.sort((a, b) => {
      if (orderBy === "name") {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      else if (orderBy === "percent") {
        if (a.stats[orderBy] > b.stats[orderBy]) {
          return 1;
        }
        if (a.stats[orderBy] < b.stats[orderBy]) {
          return -1;
        }
        return 0;
        
      }
      else if (orderBy === "porLecCom") {
        if (a.stats.reads.percent > b.stats.reads.percent) {
          return 1;
        }
        if (a.stats.reads.percent < b.stats.reads.percent) {
          return -1;
        }
        return 0;
        
      }
      else if (orderBy === "ejeAuto") {
        if (a.stats.exercises.percent > b.stats.exercises.percent) {
          return 1;
        }
        if (a.stats.exercises.percent < b.stats.exercises.percent) {
          return -1;
        }
        return 0;
      }
  
      //porQuiz
      else if (orderBy === "porQuiz") {
        if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
          return 1;
        }
        if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
          return -1;
        }
        return 0;
      }
    })
    if (orderDirection === "DESC") {
      usersSort = usersSort.reverse();
    }
    return usersSort;
  }