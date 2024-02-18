window.onload = function () {
  main();
};

// global
let maxTicketBuy = 0;

function main() {
  const perTicketPrice = 550;
  const seatClass = "Economy";
  const allSeats = document.getElementsByClassName("seat");
  const couponCodeApplyBtn = document.getElementById("coupon-code-apply-btn");
  const couponCodeInputField = document.getElementById("coupon-code-input");
  const phoneNumberInput = document.getElementById("phone-number");
  console.log(phoneNumberInput.value);
  const nextButton = document.getElementById("next-btn");
  const modal = document.getElementById("modal-show");
  for (const seat of allSeats) {
    seat.addEventListener("click", function (e) {
      // max ticket buy
      maxTicketBuy++;
      if (maxTicketBuy > 4) {
        alert("You can not buy more than 4 ticket!");
      } else {
        //disable sit for buy only one ticket at a time
        setAttributeById(e.target.id);

        // set background on sit
        setBackgroundColorById(e.target.id);

        //update ticket count
        const ticketCount = getInnerText("ticket-count");
        const updatedTicketCount = parseInt(ticketCount) + 1;
        setInnerText("ticket-count", updatedTicketCount);

        //update set left
        const seatLeft = getInnerText("seat-left");
        const updatedSeatLeft = parseInt(seatLeft) - 1;
        setInnerText("seat-left", updatedSeatLeft);

        //update total price
        const totalPrice = getInnerText("total-price");
        const updatedTotalPrice = parseInt(totalPrice) + perTicketPrice;
        setInnerText("total-price", updatedTotalPrice);

        //update seat name class and price
        updateSeatNameAndPrice(e.target.innerText);

        //handle number input field  and next button
        handleNumberField();

        //enable coupon apply button
        if (maxTicketBuy === 4) {
          removeAttributeById("coupon-code-apply-btn");
        }
      }
    });
  }

  //update grand total an discount price
  couponCodeApplyBtn.addEventListener("click", function (e) {
    const couponCode = couponCodeInputField.value
      .split(" ")
      .join("")
      .toUpperCase();

    console.log(couponCode);
    if (couponCode === "NEW15") {
      const totalPrice = parseInt(getInnerText("total-price"));
      const discountPrice = totalPrice * 0.15;
      const grandTotalPrice = totalPrice - discountPrice;
      hideElementById("coupon-code-container");
      showElementById("discount-container");
      setInnerText("discount-price", discountPrice);
      setInnerText("grand-total", grandTotalPrice);
    } else if (couponCode === "COUPLE20") {
      const totalPrice = parseInt(getInnerText("total-price"));
      const discountPrice = totalPrice * 0.2;
      const grandTotalPrice = totalPrice - discountPrice;
      hideElementById("coupon-code-container");
      showElementById("discount-container");
      setInnerText("discount-price", discountPrice);
      setInnerText("grand-total", grandTotalPrice);
    } else {
      alert("Invalid coupon code!");
    }
  });

  // handle next button
  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("top-[60%]");
    modal.classList.remove("scale-0");
  });

  //handle number input field  and next button
  function handleNumberField() {
    const pNumber = phoneNumberInput.value;

    if (pNumber.length > 0 && maxTicketBuy > 0) {
      removeAttributeById("next-btn");
    } else {
      setAttributeById("next-btn");
    }
  }
  phoneNumberInput.addEventListener("keyup", handleNumberField);

  function updateSeatNameAndPrice(seatName) {
    const ticketTitleContainer = document.getElementById(
      "ticket-title-container"
    );
    const div = document.createElement("div");
    div.classList.add("ticket-title");

    const p1 = document.createElement("p");
    p1.innerText = seatName;
    const p2 = document.createElement("p");
    p2.innerText = seatClass;
    const p3 = document.createElement("p");
    p3.innerText = perTicketPrice;

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    ticketTitleContainer.appendChild(div);
  }
  //close modal
  document
    .getElementById("close-modal-btn")
    .addEventListener("click", function () {
      hideElementById("modal-show");
      modal.classList.remove("top-[60%]");
      modal.classList.add("scale-0");
    });
}
