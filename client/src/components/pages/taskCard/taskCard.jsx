import axios from "axios";
import { useContext } from "react";
import { AppStateContext } from "../../appState/appState.context";
import "./taskCard.css";

export const TaskCard = ({ card, listId }) => {
  const { _id, title, description } = card;
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;

  const handleCardRemove = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.delete(
      `http://localhost:5001/card/removeCard/${_id}`,

      { data: { listId } },

      headers
    );

    console.log(res.data);

    dispatch({ type: "REMOVE_CARD", value: res.data });
  };

  const handleCardInput = async (e) => {
    const res = await axios.put(`http://localhost:5001/card/cardInput`, {
      [e.target.name]: e.target.value,
      _id,
      listId,
    });

    console.log(res.data);

    dispatch({ type: "CARD_INPUT", value: res.data });
  };

  const onDragStart = (e, taskObj) => {
    // console.log(e);
    e.dataTransfer.setData("obj", taskObj.id);
    e.dataTransfer.setData("cardId", _id);
    e.dataTransfer.setData("cardListId", listId);
  };
  return (
    <div
      className="task-card"
      onDragStart={(e) => onDragStart(e, card)}
      draggable>
      <button className="card-remove-btn" onClick={handleCardRemove}>
        X
      </button>
      <br></br>
      <label>Title</label>
      <input
        name="title"
        onChange={handleCardInput}
        className="task-title"
        value={title}
        placeholder="title"
      />
      <br></br>
      <label>Description</label>
      <textarea
        rows="4"
        cols="15"
        name="description"
        onChange={handleCardInput}
        className="task-description"
        value={description}
        placeholder="description"></textarea>
      <br></br>
    </div>
  );
};
