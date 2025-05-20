document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="scales"]');
  const selectedBar = document.querySelector('.selected-category-bar');
  const resetButton = document.querySelector('.header-message-right');
  const totalCountEl = document.getElementById('totalCount');

  // 선택 바 업데이트 함수
  function updateSelectedBar() {
    selectedBar.innerHTML = '';
    let total = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const messageSpan = checkbox.parentElement.querySelector('.option-bar-message');
        const categoryName = messageSpan.textContent.trim();

        const numberSpan = checkbox.parentElement.querySelector('.option-bar-number');
        const count = parseInt(numberSpan.textContent.trim(), 10) || 0;
        total += count;

        const selectedItem = document.createElement('span');
        selectedItem.className = 'selected-item';
        selectedItem.setAttribute('data-label', categoryName);
        selectedItem.innerHTML = `
          ${categoryName}
          <img src="/static/assets/icons/close.svg" alt="닫기" class="close-icon">
        `;

        // X 버튼 클릭 시 체크 해제 및 업데이트
        selectedItem.querySelector('.close-icon').addEventListener('click', () => {
          checkbox.checked = false;
          updateSelectedBar();
        });

        selectedBar.appendChild(selectedItem);
      }
    });

    if (totalCountEl) {
      totalCountEl.textContent = total > 0 ? `총 ${total}건` : '총 0건';
    }
  }

  // 체크박스 변경 시
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedBar);
  });

  // 초기화 버튼 클릭 시
  resetButton.addEventListener('click', function () {
    checkboxes.forEach(cb => cb.checked = false);
    updateSelectedBar();
  });

  // 초기 상태에서도 한 번 동기화
  updateSelectedBar();

  /**
   * 상품 카드 클릭 시 상품 상세 페이지로 이동
   */
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', function (event) {
      const productId = this.getAttribute('data-id');

      // 특정 요소(e.g., "담기" 버튼) 클릭 시 이동을 막고 싶다면 예외처리
      if (event.target.closest('.inner-shop')) {
        console.log('담기 버튼 클릭 - 이동하지 않음');
        return;
      }

      if (productId) {
        console.log(`Navigating to product/${productId}/`);
        window.location.href = `/product/${productId}/`;
      } else {
        console.warn('Product ID not found for this card:', this);
      }
    });
  });

});
