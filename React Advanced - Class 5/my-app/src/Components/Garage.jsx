function Garage({brand="Mercedes"}) {

    const bgColor = {
        backgroundColor: "brown",
        color: "black"
    }

    return (
        <div style={bgColor}>
            <h2>Child within a child Component</h2>
            <p>Brand name is: {brand}</p>
        </div>
    )
}

export default Garage;