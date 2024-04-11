import React, { useState } from "react";
import { SortableContainer } from "react-sortable-hoc";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import ShoppingForm from "./Form";
import ErrorMessage from "./ErrorMessage";
import ShoppingList from "./ListGroup";
import AddQuantityModal from "./AddQuantityModal";

function App() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [existingItem, setExistingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  const addItem = (name, quantity) => {
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
      <Container>
        <main>
          <ShoppingForm addItem={addItem} errorMessage={errorMessage} />
          <ErrorMessage
            message={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <SortableList items={items} useDragHandle={true} />
        </main>
      </Container>
      <AddQuantityModal
        show={showModal}
        itemName={existingItem ? existingItem.name : ""}
        quantity={newQuantity}
        onConfirm={handleAddQuantity}
        onCancel={handleCancelAddQuantity}
      />
    </div>
  );
}

export default App;
