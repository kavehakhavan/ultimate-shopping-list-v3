import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function AddQuantityModal({ itemName, quantity, show, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Item Already Exists</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The item "{itemName}" is already in the list. Do you want to add{" "}
          {quantity} to the existing quantity?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddQuantityModal;
