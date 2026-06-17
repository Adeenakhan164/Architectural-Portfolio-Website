import './App.css';
import Car from './Components/Car';
import MyTable from './Components/MyTable';
import Expression from './Components/Expression';
import NewCar from './Components/NewCar';
import Parent from './Components/Parent';
import FavouriteColor from './Components/FavouriteColor';
import MyCar from './Components/MyCar';
import Timer from './Components/Timer';
import PropDrilling from './Components/PropDrilling';
import UseRefComponent from './Components/UseRefComponent';

function App() {
      // const myElement1 = ( 
      //   <h1>React is {5 + 5} times better with JSX</h1>
      // );
      // const myElement2 = (
      //   <ul>
      //     <li>John</li>
      //     <li>Elsa</li>
      //     <li>Anna</li>
      //     <li>Olaf</li> 
      //   </ul>
      // );

      // const myElement3 = <h1>Hello {/* Wonderful */} World </h1>;

      const myNewCar1 = {
        brand: "Honda",
        model: "Civic",
        year: 2020
      };

      const myNewCar2 = {
        brand: "Toyota",
        model: "Grande",
        year: 2021
      };

      const myStyle = {
        color: "black",
        backgroundColor: "yellow",
        padding: "10px",
        borderRadius: "5px"
      };

      const names = ["John", "Elsa", "Tesla"];

  return (
    // What is component in React?
    // A component in React is a reusable piece of code that represents a part of the user interface. 
    // It can be thought of as a building block for creating complex UIs. 
    // Components can be defined as either functional components (using functions) or class components (using ES6 classes). 
    // They can accept inputs called "props" and manage their own state, allowing for dynamic and interactive user interfaces. 
    // Components can be nested within each other to create a hierarchical structure, making it easier to manage and organize the UI of a React application.
    // <div style={myStyle} className="App">
    //   {/* {myElement1}
    //   {myElement2}
    //   {myElement3} */}
    //   <h1>This is a Parent Componenet</h1>
    //   <h2>Welcome to React</h2>
    //   <p>This is my first React App</p>
    <div>

      {/* Call components in another component */}
       {/* <Car newCar={myNewCar1} /> */}
       {/* <Car newCar={myNewCar2} /> */}
       {/* <MyTable names={names} /> 
       <Expression />
       <NewCar brand="BMW" model="M5" year={2020} />
       <Parent />
      <FavouriteColor initialColor='black' /> */}
      {/* <MyCar /> */}
      {/* <Timer /> */}
      {/* <PropDrilling /> */}

      <UseRefComponent />
    </div>
  );
}

export default App;
