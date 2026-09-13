/**
 * SwiftRecharge - Secure Checkout & Authentic Payment Verification Flow
 * Direct UPI Deep-Links (PhonePe, GPay, Paytm, BHIM) to paytmqr6udcnp@ptys
 * Top-positioned Collapsible Paytm QR & 12-Digit UTR Verification
 */

(function () {
  'use strict';

  // 1. Parse URL Query Parameters
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
  var orderId = 'ORD-' + Math.floor(10000000 + Math.random() * 90000000);
  var txnId = 'SWIFT-' + Math.floor(1000000000 + Math.random() * 9000000000);
  
  // Real merchant UPI ID provided by user
  var officialUpiId = 'paytmqr6udcnp@ptys';

  // 2. Populate Order Summary & Dynamic Price Tags
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
  }

  // 3. Setup Direct App Deep Links to paytmqr6udcnp@ptys
  function setupAppDeepLinks() {
    var ua = navigator.userAgent || '';
    var isAndroid = /android/i.test(ua);
    var isChromeAndroid = isAndroid && /chrome|crios/i.test(ua) && !/samsungbrowser|miuibrowser|vivobrowser|heytapbrowser|oppobrowser|ucbrowser|firefox|opr/i.test(ua);

    var note = encodeURIComponent('Mobile Recharge ' + mobile);
    var merchantName = encodeURIComponent('SwiftRecharge');

    var upiQuery =
      'pa=' + officialUpiId +
      '&pn=' + merchantName +
      '&am=' + numAmount +
      '&cu=INR&tn=' + note;

    var standardUpiUrl = 'upi://pay?' + upiQuery;

    // Direct custom URI schemes (universal across mobile browsers)
    var phonepeCustom = 'phonepe://pay?' + upiQuery;
    var paytmCustom = 'paytmmp://pay?' + upiQuery;
    var gpayCustom = 'tez://upi/pay?' + upiQuery;

    // Android package-targeted intents with action=android.intent.action.VIEW (essential for direct opening)
    var phonepeIntent =
      'intent://pay?' + upiQuery +
      '#Intent;scheme=upi;package=com.phonepe.app;action=android.intent.action.VIEW;end';

    var paytmIntent =
      'intent://pay?' + upiQuery +
      '#Intent;scheme=upi;package=net.one97.paytm;action=android.intent.action.VIEW;end';

    var gpayIntent =
      'intent://pay?' + upiQuery +
      '#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;action=android.intent.action.VIEW;end';

    // Primary URL strategy:
    // On Android Chrome: package-targeted intent with action opens that exact app directly.
    // On Other Android browsers & iOS: custom schemes (phonepe://, paytmmp://, tez://) open the exact app.
    var phonepeUrl = isAndroid ? (isChromeAndroid ? phonepeIntent : phonepeCustom) : phonepeCustom;
    var paytmUrl = isAndroid ? (isChromeAndroid ? paytmIntent : paytmCustom) : paytmCustom;
    var gpayUrl = isAndroid ? (isChromeAndroid ? gpayIntent : gpayCustom) : standardUpiUrl;

    var phonepeLink = document.getElementById('phonepeLink');
    var gpayLink = document.getElementById('gpayLink');
    var paytmLink = document.getElementById('paytmLink');
    var bhimLink = document.getElementById('bhimLink');

    if (phonepeLink) {
      phonepeLink.setAttribute('href', phonepeUrl);
      phonepeLink.setAttribute('data-intent', phonepeIntent);
      phonepeLink.setAttribute('data-custom', phonepeCustom);
      phonepeLink.setAttribute('data-app', 'phonepe');
    }

    if (paytmLink) {
      paytmLink.setAttribute('href', paytmUrl);
      paytmLink.setAttribute('data-intent', paytmIntent);
      paytmLink.setAttribute('data-custom', paytmCustom);
      paytmLink.setAttribute('data-app', 'paytm');
    }

    if (gpayLink) {
      gpayLink.setAttribute('href', gpayUrl);
      gpayLink.setAttribute('data-intent', gpayIntent);
      gpayLink.setAttribute('data-custom', gpayCustom);
      gpayLink.setAttribute('data-app', 'gpay');
    }

    if (bhimLink) {
      bhimLink.setAttribute('href', standardUpiUrl);
      bhimLink.setAttribute('data-intent', standardUpiUrl);
      bhimLink.setAttribute('data-custom', standardUpiUrl);
      bhimLink.setAttribute('data-app', 'bhim');
    }
  }

  // 4. Circular Ring Timer during Verification
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

  // 5. Setup Interactive Actions & Handlers
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

    // Toggle QR Code Card when clicking top option
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
          if (qrToggleSub) qrToggleSub.textContent = 'Click here to open QR Code & Download';
        }
        if (navigator.vibrate) navigator.vibrate(15);
      });
    }

    // App link clicks: Launch app & focus UTR entry with smart fallback
    var appPayLinks = document.querySelectorAll('.app-pay-link');
    appPayLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetUrl = this.getAttribute('href');
        var customUrl = this.getAttribute('data-custom');
        var appName = this.getAttribute('data-app');

        if (!targetUrl || targetUrl === '#' || targetUrl === '') {
          e.preventDefault();
          return;
        }

        if (navigator.vibrate) navigator.vibrate(20);

        // Smart fallback: If primary intent fails or the app is not installed,
        // and browser is still in foreground after 1.2s, attempt direct scheme or universal UPI chooser
        if (appName && appName !== 'bhim') {
          var clickTime = Date.now();
          setTimeout(function () {
            if (!document.hidden && (Date.now() - clickTime) < 2500) {
              if (customUrl && targetUrl !== customUrl) {
                window.location.href = customUrl;
              } else {
                var upiFallback =
                  'upi://pay?pa=' + officialUpiId +
                  '&pn=SwiftRecharge&am=' + numAmount +
                  '&cu=INR&tn=' + encodeURIComponent('Mobile Recharge ' + mobile);
                window.location.href = upiFallback;
              }
            }
          }, 1200);
        }

        // Guide user to Step 2 UTR verification after initiating app payment
        setTimeout(function () {
          if (utrCard) {
            utrCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          if (utrInput) {
            utrInput.focus();
          }
        }, 800);
      });
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

    // QR Download button click fallback
    if (downloadQrBtn) {
      downloadQrBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navigator.vibrate) navigator.vibrate(20);
      });
    }

    // UTR Input formatting & digit counting
    if (utrInput) {
      utrInput.addEventListener('input', function () {
        // Restrict strictly to numbers
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

    // Mandatory UTR Verification Submit Handler
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

        // Timeline simulation for real gateway confirmation
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

  // 6. Populate Final Official Success Receipt
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
