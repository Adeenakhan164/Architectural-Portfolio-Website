import { useEffect, useState } from "react";
function Car(props) {
  // const [myCar, setMyCar] = useState(props.newCar);


  // const {newCar} = props;
  const myCar = props.newCar;

  useEffect(
    () => {
    console.log("Component mounted or updated");
    // You can perform side effects here, such as fetching data or updating the DOM.
    }
  , []
  ); // The effect will run after the intial render

  // console.log(myCar);

  // const myCar = {
  //   brand: "Ford",
  //   model: "Mustang",
  //   year: 1964
  // };

  const myAppCSSAttribyte = "App";

  function handleClick() {
    // alert("You clicked the button!");
    // setMyCar(previousState => ({
    //   ...previousState,
    //   model: "Hello"
    // }));
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
  );
}

export default Car;