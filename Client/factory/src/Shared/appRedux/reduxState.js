const appState = function(currentState = {jwtToken : "" , isAuth : false,fullName : '',searchBox : "",isAdmin : null} , action)
{
    switch (action.type) {
        case  "UserConnect":
            return {...currentState ,isAdmin : action.payload.isAdmin ,jwtToken : action.payload.jwtToken , isAuth : action.payload.isAuth ,fullName : action.payload.fullName };
        
        case  "Search Action":
            return {...currentState , searchBox : action.payload};
    
        default:
            return null
    }
}

export default appState;