import TagSet from "./TagSet";
import { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const makeItems = () => {
  const items = [];
  for (let i = 0; i < months.length; i++) {
    items.push({
      id: i,
      text: months[i],
    });
  }
  return items;
};

const newItems = makeItems();

const getRandom = () => Math.floor(Math.random() * months.length);

const App = () => {
  const [items, setItems] = useState(newItems);
  const addItem = () => {
    const month = months[getRandom()];
    const newItems = [...items, { id: month, text: month }];
    setItems(newItems);
  };
  return (
    <div className="app">
      <h1>TagSet prototype</h1>
      <div className="container">
        <button onClick={addItem}>add more</button>
        <TagSet items={items} />
      </div>
    </div>
  );
};

export default App;
