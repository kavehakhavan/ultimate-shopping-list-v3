import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function ShoppingForm({ addItem, errorMessage }) {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && parseInt(itemQuantity) > 0) {
      addItem(itemName, itemQuantity);
      setItemName(""); // Clear input fields after submitting
      setItemQuantity("");
    } else if (!itemName.trim() && !itemQuantity.trim()) {
      alert("Please enter valid Item Name and Quantity!");
    } else if (!itemName.trim()) {
      alert("Item name cannot be empty!");
    } else if (!itemQuantity.trim()) {
      alert("Quantity cannot be empty!");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup
        className="mb-3 align-items-start d-flex px-4 my-5"
        style={{ width: "70%", height: "60px" }}
      >
        <Form.Control
          aria-label="Item Name"
          placeholder="Enter Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ width: "50%", backgroundColor: "white" }}
        />
        <Form.Control
          type="number"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          min={1}
          style={{ width: "30%", backgroundColor: "white" }}
        />
        <Button
          variant="outline-secondary"
          type="submit"
          style={{ width: "20%", backgroundColor: "#562664", color: "white" }}
        >
          Add
        </Button>
      </InputGroup>
      {errorMessage && (
        <div
          style={{ textAlign: "center", marginBottom: "10px", color: "red" }}
        >
          {errorMessage}
        </div>
      )}
    </Form>
  );
}

export default ShoppingForm;
