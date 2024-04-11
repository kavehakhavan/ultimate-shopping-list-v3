// EditItem.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EditItem({ item, onSave, onCancel }) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSave = () => {
    onSave(name, quantity);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="edit-item">
      <Row>
        <Col>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </Col>
        <Col>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default EditItem;
