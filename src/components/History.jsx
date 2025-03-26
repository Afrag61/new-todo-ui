import HistoryItem from "./HistoryItem";

const History = ({ history, todoTitle }) => {
  return (
    <div className="history-container">
      <h1>history of {todoTitle}</h1>
      <ul className="history-list">
        {history.map((historyItem, index) => (
          <HistoryItem key={index} historyItem={historyItem} /> 
        ))}
      </ul>
    </div>
  );
};

export default History;
