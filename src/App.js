import React, { useState, useEffect } from "react";
import { SortableContainer } from "react-sortable-hoc";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import ShoppingForm from "./Form";
import ErrorMessage from "./ErrorMessage";
import ShoppingList from "./ListGroup";
import AddQuantityModal from "./AddQuantityModal";
import { FaUndo, FaRedo } from "react-icons/fa";

//hello
function App() {
  const defaultItems = [
    { id: 1, name: "Example Item 1", quantity: 1 },
    { id: 2, name: "Example Item 2", quantity: 1 },
    { id: 3, name: "Example Item 3", quantity: 1 },
  ];

  const [items, setItems] = useState(defaultItems);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [existingItem, setExistingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [history, setHistory] = useState([]);
  const [pointer, setPointer] = useState(-1);

  useEffect(() => {
    // Only update history if the new state is different from the current state
    if (history[pointer] !== items) {
      const newHistory = [...history.slice(0, pointer + 1), items];
      setHistory(newHistory);
      setPointer(pointer + 1);
    }
  }, [items]);

  const undo = () => {
    if (pointer > 0) {
      setPointer((prevPointer) => prevPointer - 1); // Move pointer to the previous state in history
      setItems(history[pointer - 1]); // Set items to the previous state
    }
  };

  const redo = () => {
    if (pointer < history.length - 1) {
      setPointer((prevPointer) => prevPointer + 1); // Move pointer to the next state in history
      setItems(history[pointer + 1]); // Set items to the next state
    }
  };

  const addItem = (name, quantity) => {
    console.log("Add is called");
    if (name.trim() !== "" && parseInt(quantity) > 0) {
      const existingItem = items.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );
      if (existingItem) {
        setExistingItem(existingItem);
        setNewQuantity(parseInt(quantity));
        setShowModal(true);
      } else {
        const newItem = {
          id: Date.now(), // Generate unique id for each item
          name: name.charAt(0).toUpperCase() + name.slice(1),
          quantity: parseInt(quantity),
        };
        setItems([...items, newItem]);
      }
    }
    // else if (quantity <= 0) {
    //   setErrorMessage("Please fill out all required fields.");
    //   setTimeout(() => setErrorMessage(""), 3000);
    // }
  };

  const handleAddQuantity = () => {
    const updatedItems = items.map((item) =>
      item === existingItem
        ? { ...item, quantity: parseInt(item.quantity) + newQuantity }
        : item
    );
    setItems(updatedItems);
    setShowModal(false);
  };

  const handleCancelAddQuantity = () => {
    setShowModal(false);
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const onEdit = (id, name, quantity) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name, quantity } : item
    );
    setItems(updatedItems);
  };

  const onDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const SortableList = SortableContainer(({ items }) => {
    return <ShoppingList items={items} onEdit={onEdit} onDelete={onDelete} />;
  });

  return (
    <div className="App" style={{ backgroundColor: "white", height: "100vh" }}>
      <Header />
      <Container style={{ marginTop: "100px" }}>
        <main>
          <ErrorMessage
            message={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <SortableList items={items} useDragHandle={true} />
        </main>
        <AddQuantityModal
          show={showModal}
          itemName={existingItem ? existingItem.name : ""}
          quantity={newQuantity}
          onConfirm={handleAddQuantity}
          onCancel={handleCancelAddQuantity}
        />
        <ShoppingForm addItem={addItem} errorMessage={errorMessage} />

        <button
          onClick={undo}
          disabled={pointer === 0}
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor: pointer === 0 ? "#ccc" : "#562664",
            border: "none",
            cursor: pointer === 0 ? "not-allowed" : "pointer",
            margin: "0 10px",
          }}
        >
          <FaUndo style={{ fontSize: "24px", color: "#fff" }} />
        </button>

        <button
          onClick={redo}
          disabled={pointer === history.length - 1}
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor:
              pointer === history.length - 1 ? "#ccc" : "#562664",
            border: "none",
            cursor: pointer === history.length - 1 ? "not-allowed" : "pointer",
            margin: "0 10px",
          }}
        >
          <FaRedo style={{ fontSize: "24px", color: "#fff" }} />
        </button>
      </Container>
    </div>
  );
}

export default App;
