import React from "react";

const Navigation=({onRouteChange, routePage})=>{
    if(routePage==='home'){
    return(
        <nav style={{display:'flex', background:'aqua'}}>
            <p onClick={()=>onRouteChange('signin')} style={{marginLeft:'auto'}}className="pr3 link dim black pointer underline f4">Sign out</p>
        </nav>
    )
    }
    else{
    return(
        <nav style={{display:'flex', justifyContent:"flex-end", background:'aqua'}}>
            <p onClick={()=>onRouteChange('signin')} className="pr3 link dim black pointer underline f4">Sign in</p>
            <p onClick={()=>onRouteChange('Register')} className="pr3 link dim black pointer underline f4">Register</p>
        </nav>
    )
    }
}

export default Navigation;