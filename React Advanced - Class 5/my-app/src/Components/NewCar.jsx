import Garage from "./Garage";
function NewCar(props) {

    const {brand, model, ...rest} = props;
    const bgColor = {
        backgroundColor: "black",
        color: "white"
    }

    return (
        <div style={bgColor} className="App">
            <h2>My new car is a {brand} {model} from {rest.year}.</h2>
            <Garage />
        </div>
    )
}

export default NewCar;