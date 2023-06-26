import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    const updatedAll = all + 1;
    setGood(updatedGood);
    setAll(updatedAll);
    setAverage((updatedGood + bad * -1) / updatedAll);
    setPositive((updatedGood / updatedAll) * 100);
  };
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    const updatedAll = all + 1;
    setNeutral(updatedNeutral);
    setAll(updatedAll);
    setAverage((good + bad * -1) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    const updatedAll = all + 1;
    setBad(updatedBad);
    setAll(updatedAll);
    setAverage((good + updatedBad * -1) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

export default App;
