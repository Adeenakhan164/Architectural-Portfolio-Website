import { useState } from "react";

function MyCar() {
  const [myCar, setMyCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: 1964
  });   

    console.log(myCar);

    const myAppCSSAttribyte = "App";
    function handleClick() {
        alert("You clicked the button!");
        setMyCar(previousState => ({
          ...previousState,
          model: "Hello"
        }));
    }

    const myStyle = {
        color: "blue",
        backgroundColor: "lightgray",
        padding: "10px",
        borderRadius: "5px"
    };      
    if (myCar.year < 2000) {
        myStyle.color = "red";
    }       
    return (
        <div className={myAppCSSAttribyte} style={myStyle}>
            <h1>This is a first Child Component</h1>    
            <h1>This is a Car Component</h1>
            <h2>My car is a {myCar.brand} {myCar.model} from {myCar.year}.</h2>
            <button onClick={handleClick} disabled={false}>Click me</button>
        </div>
    )
}   
export default MyCar;