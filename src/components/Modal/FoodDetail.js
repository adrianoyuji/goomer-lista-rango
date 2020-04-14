import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FoodDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function FoodDetail(props) {
  const [quantity, setQuantity] = useState(1);
  function changeAmount(operator) {
    if (quantity > 1 && operator === "-") {
      setQuantity(quantity - 1);
    } else if (operator === "+") {
      setQuantity(quantity + 1);
    }
  }

  function renderPrice() {
    //renders total amount, checks if product is onSale and if it has a price object

    if (props.onSale) {
      return (
        <>
          <div>R$ {props.food.sales[0].price.toFixed(2)} </div>
          <div className="discounted-price">
            R$ {props.food.price.toFixed(2)}
          </div>
        </>
      );
    } else if (!!props.food.price) {
      return <>R$ {props.food.price.toFixed(2)}</>;
    } else {
      return <>Gratuito!!!</>;
    }
  }

  function rendertotal() {
    //renders total amount, checks if product is onSale and if it has a price object times the quantity
    if (props.onSale) {
      return (
        <>
          <div>R$ {(props.food.sales[0].price * quantity).toFixed(2)} </div>
        </>
      );
    } else if (!!props.food.price) {
      return <>R$ {(props.food.price * quantity).toFixed(2)}</>;
    } else {
      return <>R$ 0.00</>;
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="close-modal" onClick={props.onHide}>
        <FontAwesomeIcon icon={faTimes} size="lg" className="close-icon" />
      </div>

      <Modal.Body>
        <img
          src={props.food.image}
          alt="thumb"
          class="rounded mx-auto d-block"
          width="100%"
          className="modal-image"
        />
        <h4> {props.food.name}</h4>
        <div className="modal-info">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="modal-price">{renderPrice()}</div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <div className="quantity-changer">
          <FontAwesomeIcon
            icon={faMinus}
            size="lg"
            color="black"
            onClick={() => changeAmount("-")}
            className="quantity-operator"
          />
          <div className="quantity-value">{quantity}</div>
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            color="black"
            onClick={() => changeAmount("+")}
            className="quantity-operator"
          />
        </div>
        <div className="confirm-button" onClick={props.onHide}>
          <div className="add-button">Adicionar</div>
          <div className="total-amount">{rendertotal()}</div>
        </div>
      </Modal.Footer>
      <div className="close-modal" onClick={props.onHide}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </div>
    </Modal>
  );
}
