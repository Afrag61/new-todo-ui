import { useEffect, useState } from "react";
import hideUp from "./../assets/hide.svg";
import showDown from "./../assets/show.svg";

const HistoryItem = ({ historyItem }) => {
  const { actionOn, actionType, field, value } = historyItem;
  const [state, setState] = useState({
    showDetails: false,
    showValue: false,
    valueType: undefined,
    currentValue: undefined,
  });

  useEffect(() => {
    if (actionType === "Create") {
      setState((prevState) => {
        return {
          ...prevState,
          showValue: false,
        };
      });
    }
    if (actionType === "Update") {
      if (field === "isChecked") {
        setState(prevState => {
            return{
                ...prevState,
                showValue: true,
                valueType: 'boolean',
                currentValue: value ? 'Checked' : 'Not Checked'
            }   
        })
      }
    } else if (actionType === "Add") {
    }
  }, [actionType]);

  const handleShowDetails = () => {
    state.showDetails
      ? setState((prevState) => {
          return {
            ...prevState,
            showDetails: false,
          };
        })
      : setState((prevState) => {
          return {
            ...prevState,
            showDetails: true,
          };
        });
  };

  return (
    <li>
      <div
        className="history-item"
        onClick={handleShowDetails}
        style={{ cursor: "pointer" }}
      >
        <h3>{actionType}</h3>
        <div className="buttons">
          <button onClick={handleShowDetails}>
            <img src={state.showDetails ? hideUp : showDown} alt="details" />
          </button>
        </div>
      </div>
      {state.showDetails && (
        <div className="history-details">
          <h4>Action Type: {actionType}</h4>
          <h4>
            {actionType}: {field}
          </h4>
          <h4>
            Date of {actionType}: {actionOn}
          </h4>
          {state.showValue && <h4>Value: {state.currentValue}</h4>}
        </div>
      )}
    </li>
  );
};

export default HistoryItem;
