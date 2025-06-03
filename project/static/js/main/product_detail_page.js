/* product detail page - JS */

document.addEventListener("DOMContentLoaded", function () {
    const lowerBtn = document.getElementById("lower");
    const upperBtn = document.getElementById("upper");
    const quantityEl = document.getElementById("quantity");
    const priceEl = document.getElementById("price");

    const resetButton = document.querySelector('.header-message-right');
    const totalCountEl = document.getElementById('totalCount');

    // HTML에서 data-price 값을 가져오기
    const unitPriceElement = document.getElementById("unitPrice");
    const unitPrice = parseInt(unitPriceElement.dataset.price.replace(/[^0-9]/g, ""), 10);

    let quantity = 0;


  // 가격 업데이트 함수
  function updateTotalPrice() {
    const totalPrice = unitPrice * quantity;
    priceEl.textContent = totalPrice.toLocaleString() + "원";
  }

  // 수량 증가
  upperBtn.addEventListener("click", function () {
    quantity++;
    quantityEl.textContent = quantity;
    updateTotalPrice();
  });

  // 수량 감소 (0 미만 불가)
  lowerBtn.addEventListener("click", function () {
    if (quantity > 0) {
      quantity--;
      quantityEl.textContent = quantity;
      updateTotalPrice();
    }
  });

  // 초기 총 가격 설정
  updateTotalPrice();
  
});

