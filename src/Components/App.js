import { useState } from "react";

const tipPercentage = {
  0: 0,
  1: 5,
  2: 10,
  3: 20,
};

const rating = [
  "Dissatisfied (0%)",
  "It was okay (5%)",
  "It was good (10%)",
  "Absolutly amazing (20%)",
];

function App() {
  const [bill, setBill] = useState(0);
  const [satisfactionPercentage, setSatisfactionPercentage] = useState([0, 0]);

  function handleSelect(e, personIndex) {
    const selectedIndex = e.target.selectedIndex;

    setSatisfactionPercentage((prevPercentages) => {
      const newPercentages = [...prevPercentages];
      newPercentages[personIndex] = tipPercentage[selectedIndex];
      return newPercentages;
    });
  }

  function handleBillInput(billVal) {
    setBill(() => billVal);
  }

  function handleButtonClick() {
    setBill(() => 0);
  }

  return (
    <div className="App">
      <BillInput
        bill={bill}
        onBillInput={(billVal) => handleBillInput(billVal)}
      />
      <ServiceRating
        text="How did you like the service?"
        ratingObj={rating}
        satisfactionP={satisfactionPercentage}
        onSelect={(e) => handleSelect(e, 0)}
        id={0}
      />
      <ServiceRating
        text="How did your friend like the service?"
        ratingObj={rating}
        satisfactionP={satisfactionPercentage}
        onSelect={(e) => handleSelect(e, 1)}
        id={1}
      />
      <TotalPayment bill={bill} satisfactionP={satisfactionPercentage} />
      <Reset onReset={() => handleButtonClick()} />
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={() => onReset()}>Reset</button>;
}

function BillInput({ bill, onBillInput }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        value={bill}
        onChange={(event) => onBillInput(event.target.value)}
      ></input>
    </div>
  );
}

function ServiceRating({ text, ratingObj, onSelect, id, bill }) {
  return (
    <div>
      <span>{text}</span>
      <select
        value={bill < 0 ?? ratingObj[0]}
        onChange={(e) => onSelect(e, id)}
      >
        {ratingObj.map((rating, index) => (
          <option key={index}>{rating}</option>
        ))}
      </select>
    </div>
  );
}
function TotalPayment({ bill, satisfactionP }) {
  function TipCalculation() {
    const [a, b] = [satisfactionP[0], satisfactionP[1]];
    const average = (a + b) / 2;

    const tipValue = (average * bill) / 100;
    return tipValue;
  }

  return (
    <div>
      {bill > 0 ? (
        <h3>
          You pay ${Number(bill) + TipCalculation()} (${bill} +{" "}
          {TipCalculation()})
        </h3>
      ) : null}
    </div>
  );
}

export default App;
