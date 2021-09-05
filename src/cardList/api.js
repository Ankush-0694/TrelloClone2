const express = require("express");
const CardList = require("../../model/CardList");
const router = express.Router();

router.get("/getLists", async (req, res) => {
  const data = await CardList.find({});
  res.send(data);
});

router.post("/addList", async (req, res) => {
  const { title, cards } = req.body;

  try {
    const newList = new CardList({
      title,
      cards,
    });

    const data = await newList.save();
    // console.log(data);

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/removeList/:id", async (req, res) => {
  const listid = req.params.id;
  // console.log(listid);

  try {
    const data = await CardList.findByIdAndDelete(listid);
    res.send(data);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/listTitleUpdate", async (req, res) => {
  const { title, _id } = req.body;

  try {
    const data = await CardList.findByIdAndUpdate(
      _id,
      { $set: { title } },
      { new: true }
    );

    // console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/addCard", async (req, res) => {
  const { _id, title, description } = req.body;

  try {
    const requiredList = await CardList.findById(_id);

    requiredList.cards.push({ title, description });

    const data = await requiredList.save();
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/cardInput", async (req, res) => {
  const { _id, listId, title, description } = req.body;

  try {
    let data = await CardList.updateOne(
      { _id: listId, "cards._id": _id },
      {
        $set: { "cards.$.title": title, "cards.$.description": description },
      }
    );

    const dataToUpdate = await CardList.findById(listId);
    // console.log(dataToUpdate);

    res.send(dataToUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/removeCard/:id", async (req, res) => {
  const cardId = req.params.id;

  const listIdObj = req.body;

  const listId = listIdObj.listId;

  try {
    let data = await CardList.findByIdAndUpdate(
      listId,
      {
        $pull: { cards: { _id: cardId } },
      },
      { new: true, upsert: true }
    ).exec();

    // console.log(data);

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/moveTask", async (req, res) => {
  const { cardId, sourceListId, destinationListId } = req.body;

  try {
    let cardToMove = await CardList.findOne(
      { _id: sourceListId },
      {
        cards: { $elemMatch: { _id: cardId } },
      }
    );

    let cardObject = cardToMove.cards[0];
    // console.log(cardObject);

    // deleting that card from the list
    await CardList.findByIdAndUpdate(
      sourceListId,
      {
        $pull: { cards: { _id: cardId } },
      },
      { new: true, upsert: true }
    );

    // adding that card to dest list

    const destinationList = await CardList.findByIdAndUpdate(
      destinationListId,
      {
        $push: { cards: { $each: [cardObject], $position: 0 } },
      }
    );

    // console.log(destinationList);

    const finalData = await CardList.find({});
    // console.log(finalData);

    res.send(finalData);
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

module.exports = router;
