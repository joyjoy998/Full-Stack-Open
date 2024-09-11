import { useState } from "react";

const Button = (props) => (
  <button onClick={props.onClick}>{props.value}</button>
);

const StatisticLine = (props) => {
  return (
    <tr>
      <td style={{ paddingRight: "10px", textAlign: "left" }}>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistic = (props) => {
  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine
            text="all"
            value={props.good + props.neutral + props.bad}
          />
          <StatisticLine
            text="average"
            value={(
              (props.good - props.bad) /
              (props.good + props.neutral + props.bad)
            ).toFixed(1)}
          />
          <StatisticLine
            text="positive"
            value={`${(
              (100 * props.good) /
              (props.good + props.neutral + props.bad)
            ).toFixed(1)}%`}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} value="good">
          good
        </Button>
        <Button onClick={() => setNeutral(neutral + 1)} value="neutral">
          neutral
        </Button>
        <Button onClick={() => setBad(bad + 1)} value="bad">
          bad
        </Button>
      </div>
      {good + neutral + bad === 0 ? (
        <div>No feedback given</div>
      ) : (
        <div>
          <h1>statistics</h1>
          <Statistic good={good} neutral={neutral} bad={bad} />
        </div>
      )}
    </>
  );
};

export default App;
