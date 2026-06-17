import { useState } from "react";

function FavouriteColor({initialColor="red"}) {
  const [color, setColor] = useState(initialColor);

  const colorSettings = {
    color: color,
    backgroundColor: 'green'
  }

  return (
    <>
    <div style={colorSettings}>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
      </div>
    </>
  );
}

export default FavouriteColor;