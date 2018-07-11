
window.computeUsersStats=(users,progress,courses)=>{

    
}
window.sortUsers=(users,orderBy,orderDirection)=>{

}
window.filterUsers=(users,search)=>{
    let usersFilter = users.filter(
        user =>
        user.name.toLowerCase().indexOf(options.search.toLowerCase()) > -1 
      )
    return usersFilter
}
window.processCohortData=(options)=>{
    //console.log(options.cohortData.users);
    //return options.cohortData.users;
    let usersFilter = filterUsers(options.cohortData.users, options.search);
    return usersFilter;
  
}