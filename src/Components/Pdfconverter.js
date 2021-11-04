import React,{useState} from "react";
import {Redirect} from "react-router-dom"

function Pdfconverter(){
    const [post,setPost]=useState(null);
return(
    
    <div>
        <h1>{post.title}</h1>
    </div>
);
}

export default Pdfconverter;

