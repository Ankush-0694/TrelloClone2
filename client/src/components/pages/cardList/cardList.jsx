import axios from "axios";
import React, { useContext } from "react";
import uuid from "react-uuid";
import { AppStateContext } from "../../appState/appState.context";
import { MyTextInput } from "../../MaterialUiDesign/MyFormFields";
import { TaskCard } from "../taskCard/taskCard";
import "./cardList.css";

export const CardList = ({ cardlist, cardlistIdx }) => {
  const { _id, cards, title } = cardlist;
  const { stateAndDispatch } = useContext(AppStateContext);

  const [appState, dispatch] = stateAndDispatch;

  const handleCardAdd = async () => {
    const res = await axios.post("http://localhost:5001/card/addCard", {
      title: "",
      description: "",
      _id: _id,
    });

    console.log(res.data);

    dispatch({ type: "ADD_CARD", value: res.data });
  };

  const handleListRemove = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.delete(
      `http://localhost:5001/card/removeList/${_id}`,
      headers
    );

    console.log(res.data);

    dispatch({ type: "REMOVE_LIST", value: res.data });
  };

  const handleListTitleChange = async (e) => {
    const res = await axios.put(`http://localhost:5001/card/listTitleUpdate`, {
      title: e.target.value,
      _id,
    });

    console.log(res.data);

    dispatch({ type: "ADD_LIST_TITLE", value: res.data });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e, cardlist) => {
    console.log(e);
    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = e.dataTransfer.getData("cardListId");
    const destinationListId = cardlist._id;
    try {
      const res = await axios.put("http://localhost:5001/card/moveTask", {
        cardId,
        sourceListId,
        destinationListId,
      });
      console.log(res.data);
      dispatch({ type: "MOVE_TASK", value: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="card-list"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, cardlist)}>
      <input
        className="card-list-name"
        onChange={handleListTitleChange}
        placeholder="card list name"
        value={title}
      />
      <button className="listadd-btn" onClick={handleListRemove}>
        Remove List
      </button>
      <span className="card-number">{cards.length}</span>
      <div className="card-list-container">
        {cards.map((card, cardIdx, arr) => (
          <TaskCard key={card._id} card={card} listId={_id} />
        ))}
      </div>
      <button className="card-add-btn" onClick={handleCardAdd}>
        Add Card
      </button>
    </div>
  );
};
