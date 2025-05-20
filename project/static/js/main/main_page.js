document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="scales"]');
  const selectedBar = document.querySelector('.selected-category-bar');
  const resetButton = document.querySelector('.header-message-right');
  const totalCountEl = document.getElementById('totalCount');

  // 클릭한 순서대로 저장할 배열
  let selectedOrder = [];

  // 선택 바 업데이트 함수
  function updateSelectedBar() {
    selectedBar.innerHTML = '';
    let total = 0;

    selectedOrder.forEach((label) => {
      const checkbox = Array.from(checkboxes).find(cb =>
        cb.parentElement.querySelector('.option-bar-message').textContent.trim() === label
      );

      if (!checkbox || !checkbox.checked) return;

      const numberSpan = checkbox.parentElement.querySelector('.option-bar-number');
      const count = parseInt(numberSpan.textContent.trim(), 10) || 0;
      total += count;

      const selectedItem = document.createElement('span');
      selectedItem.className = 'selected-item';
      selectedItem.setAttribute('data-label', label);
      selectedItem.innerHTML = `
        ${label}
        <img src="/static/assets/icons/close.svg" alt="닫기" class="close-icon">
      `;

      selectedItem.querySelector('.close-icon').addEventListener('click', () => {
        checkbox.checked = false;
        selectedOrder = selectedOrder.filter(item => item !== label);
        updateSelectedBar();
      });

      selectedBar.appendChild(selectedItem);
    });

    if (totalCountEl) {
      totalCountEl.textContent = total > 0 ? `총 ${total}건` : '총 0건';
    }
  }

  // 체크박스 이벤트
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const label = this.parentElement.querySelector('.option-bar-message').textContent.trim();

      if (this.checked) {
        // 새로 체크된 경우, 배열에 없으면 push
        if (!selectedOrder.includes(label)) {
          selectedOrder.push(label);
        }
      } else {
        // 체크 해제 시 배열에서도 제거
        selectedOrder = selectedOrder.filter(item => item !== label);
      }

      updateSelectedBar();
    });
  });

  // 초기화 버튼
  resetButton.addEventListener('click', function () {
    checkboxes.forEach(cb => cb.checked = false);
    selectedOrder = [];
    updateSelectedBar();
  });

  // 최초 상태 반영
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const label = cb.parentElement.querySelector('.option-bar-message').textContent.trim();
      if (!selectedOrder.includes(label)) {
        selectedOrder.push(label);
      }
    }
  });

  updateSelectedBar();

  // 상품 카드 클릭 시 상세 페이지 이동
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', function (event) {
      if (event.target.closest('.inner-shop')) return;
      const productId = this.getAttribute('data-id');
      if (productId) window.location.href = `/product/${productId}/`;
    });
  });
});
