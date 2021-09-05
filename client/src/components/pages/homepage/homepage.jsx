import axios from "axios";
import { useContext, useEffect } from "react";
import uuid from "react-uuid";
import { AppStateContext } from "../../appState/appState.context";
import { CardList } from "../cardList/cardList";
import "./homepage.css";

const HomePage = () => {
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;

  const { Lists, loading } = appState;
  // console.log(Lists);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/card/getLists");
      dispatch({ type: "GET_LISTS", value: res.data });
    }

    fetchData();
  }, []);

  const handleListAdd = async () => {
    const res = await axios.post("/card/addList", {
      title: "CardList",
      cards: [],
    });

    console.log(res.data);

    dispatch({ type: "ADD_LIST", value: res.data });
  };

  return (
    <div className="homepage-container">
      <button className="listadd-btn" onClick={handleListAdd}>
        Add List
      </button>
      <div className="cardlist-container">
        {!loading &&
          Lists.length > 0 &&
          Lists.map((cardlist, cardlistIdx) => (
            <CardList
              key={cardlist._id}
              cardlist={cardlist}
              cardlistIdx={cardlistIdx}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
