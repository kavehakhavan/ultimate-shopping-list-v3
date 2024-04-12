import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveMutable } from "array-move";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const SortableItem = sortableElement(
  ({ items, item, index, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [itemName, setItemName] = useState(item.name);
    const [itemQuantity, setItemQuantity] = useState(item.quantity);
    const [itemID, setItemID] = useState(item.id);
    //const [listItems, setListItems] = useState([]);

    const startEditing = () => {
      setItemName(item.name);
      setItemQuantity(item.quantity);
      setItemID(item.id);
      setEditing(true);
    };

    // const saveEditing = () => {
    //   onEdit(item.id, itemName, itemQuantity);
    //   setEditing(false);
    // };

    const saveEditing = () => {
      //e.preventDefault();

      const isItemExist = items.some(
        (listItem) =>
          listItem.name.toUpperCase() === itemName.toUpperCase() &&
          listItem.quantity === itemQuantity &&
          listItem.id === itemID
      );

      const isItemExist2 = items.some(
        (listItem) =>
          listItem.name.toUpperCase() === itemName.toUpperCase() &&
          !(listItem.id === itemID)
      );

      if (isItemExist) {
        // Display alert if the item already exists
        //alert("Item already exists in the list!");
        //} else if () {
        //alert("Please11111!");
        setEditing(false);
      } else if (isItemExist2) {
        alert("Item already exists in the list!");
      } else {
        // Save the item if it does not exist
        if (itemName.trim() && itemQuantity > 0) {
          if (!Number.isInteger(parseFloat(itemQuantity))) {
            alert("Please enter a valid Number!");
          } else {
            onEdit(
              item.id,
              itemName.charAt(0).toUpperCase() + itemName.slice(1),
              parseInt(itemQuantity)
            );
            //alert("Please!");
            setEditing(false);
          }
        } else if (!itemName.trim() && !itemQuantity.trim()) {
          alert("Please enter valid Item Name and Quantity!");
        } else if (!itemName.trim()) {
          alert("Item name cannot be empty!");
        } else if (!itemQuantity.trim()) {
          alert("Quantity cannot be empty!");
        } else if (parseFloat(itemQuantity) <= 0) {
          alert("Number must be equal or greater than 1.");
        }
      }
    };

    const cancelEditing = () => {
      setEditing(false);
    };

    const deleteEditing = () => {
      onDelete(item.id);
      setEditing(false);
    };

    return (
      <ListGroup.Item
        className="d-flex align-items-center"
        style={{
          backgroundColor: editing ? "#dddddd" : "#895997",
          color: editing ? "black" : "white",
        }}
      >
        {editing ? (
          <>
            <Form.Control
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{ width: "60%" }}
            />
            <Form.Control
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              style={{ width: "40%" }}
              min={1}
            />

            <Button
              variant="success"
              onClick={() => saveEditing(index, itemName, itemQuantity)}
              style={{ width: "100px" }}
            >
              <FaSave />
            </Button>
            <Button
              variant="danger"
              onClick={deleteEditing}
              style={{ width: "100px" }}
            >
              <FaTrash /> {/* This will render the trash icon */}
            </Button>
            <Button
              variant="secondary"
              onClick={cancelEditing}
              style={{ width: "100px" }}
            >
              <FaTimes /> {/* This will render the cancel icon */}
            </Button>
          </>
        ) : (
          <>
            <Row style={{ width: "100%" }}>
              <Col
                xs={6}
                style={{
                  borderRight: "1px solid #ddd",
                  width: "80%",
                  paddingRight: "10px",
                }}
              >
                {item.name}
              </Col>
              <Col xs={6} style={{ width: "20%", paddingRight: "10px" }}>
                {`${item.quantity}`}
              </Col>
            </Row>
            <Button
              variant="outline-light"
              onClick={() => startEditing(index)}
              style={{
                backgroundColor: "#e68e36",
                color: "white",
                opacity: 1,
                marginLeft: "auto",
              }}
            >
              Edit
            </Button>
          </>
        )}
      </ListGroup.Item>
    );
  }
);

const SortableContainer = sortableContainer(({ children }) => {
  return <ListGroup>{children}</ListGroup>;
});

function ShoppingList({ items, onEdit, onDelete }) {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (items) {
      setListItems(items);
    }
  }, [items]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setListItems((prevItems) => {
      const newItems = [...prevItems];
      arrayMoveMutable(newItems, oldIndex, newIndex);
      return newItems;
    });
  };

  return (
    <div className="px-4" style={{ width: "70%" }}>
      <div className="d-flex flex-column">
        <ListGroup
          style={{ backgroundColor: "#562664", width: "100%", height: "100px" }}
        >
          <ListGroup.Item
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#562664",
              color: "white",
              fontSize: "24px",
            }}
          >
            My Shopping List
          </ListGroup.Item>
          <ListGroup.Item
            className="d-flex"
            style={{
              backgroundColor: "#562664",
              color: "white",
              width: "100%",
            }}
          >
            <Row style={{ width: "100%", fontSize: "20px" }}>
              <Col xs={6} style={{ width: "80%" }}>
                Item
              </Col>
              <Col xs={6} style={{ width: "20%" }}>
                Quantity
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <SortableContainer onSortEnd={onSortEnd}>
          {listItems &&
            listItems.map((item, index) => (
              <SortableItem
                key={`item-${item.id}`}
                items={listItems}
                index={index}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </SortableContainer>
      </div>
    </div>
  );
}

export default ShoppingList;
