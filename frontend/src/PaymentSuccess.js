import React from 'react'
import {Link} from "react-router-dom"

export default function PaymentSuccess(){
    return(
        <>
        <h1 style ={{color:"green"}}>Payment successful</h1>
        <div style ={{margin:"2px 10px",cursor:"pointer"}}>
            <Link to ="/">Home</Link>
        </div>
        </>
    )
}