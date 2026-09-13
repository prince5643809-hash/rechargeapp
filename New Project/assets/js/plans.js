/**
 * SwiftRecharge - Real Official Plans Catalog Engine
 * Comprehensive Database for Jio, Airtel, Vi, and BSNL
 */

(function () {
  'use strict';

  // Real Official Indian Telecom Prepaid Plans (Authentic Post-July 2024 Tariffs)
  var OPERATOR_PLANS = {
    jio: [
      {
        id: 'jio_189',
        price: 189,
        validity: '28 Days',
        data: '2.0 GB Total',
        voice: 'Unlimited',
        sms: '300 SMS',
        tag: 'VALUE SAVER',
        tagType: 'value',
        categories: ['recommended'],
        perks: ['📶 JioTV & JioCinema', '☁️ JioCloud Free'],
        desc: 'Most affordable 28-day plan for voice calling and essential data'
      },
      {
        id: 'jio_198',
        price: 198,
        validity: '14 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '5G STARTER',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['⚡ Truly Unlimited 5G', '📱 JioCinema & JioTV'],
        desc: 'Short-term power pack with 28GB high-speed data & free 5G'
      },
      {
        id: 'jio_249',
        price: 249,
        validity: '28 Days',
        data: '1.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'DAILY DATA',
        tagType: 'value',
        categories: ['unlimited'],
        perks: ['📶 28 GB Total Data', '📱 JioCinema Free'],
        desc: 'Daily 1GB high speed internet with non-stop national voice'
      },
      {
        id: 'jio_299',
        price: 299,
        validity: '28 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'POPULAR',
        tagType: 'popular',
        categories: ['recommended', 'unlimited'],
        perks: ['📶 42 GB 4G/5G Data', '☁️ JioCloud Storage'],
        desc: 'Everyday standard pack with balanced 1.5GB daily allowance'
      },
      {
        id: 'jio_349',
        price: 349,
        validity: '28 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'BESTSELLER',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['⚡ Truly Unlimited 5G', '🎬 JioCinema & JioTV'],
        desc: 'Top choice: 56GB high-speed data + Unlimited True 5G network'
      },
      {
        id: 'jio_399',
        price: 399,
        validity: '28 Days',
        data: '2.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HEAVY DATA',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['⚡ Truly Unlimited 5G', '📺 JioTV Suite'],
        desc: '70GB heavy streaming allowance with unrestricted 5G speed'
      },
      {
        id: 'jio_449',
        price: 449,
        validity: '28 Days',
        data: '3.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'ULTRA 3GB/D',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['⚡ Truly Unlimited 5G', '🎥 JioCinema Suite'],
        desc: 'Maximum daily data pack: 84GB high speed + free True 5G'
      },
      {
        id: 'jio_629',
        price: 629,
        validity: '56 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '2 MONTHS',
        tagType: 'value',
        categories: ['recommended', 'unlimited'],
        perks: ['⚡ 84 GB Total Data', '📱 JioCinema & JioTV'],
        desc: 'Smooth 56 days validity without monthly recharge hassles'
      },
      {
        id: 'jio_719',
        price: 719,
        validity: '70 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '70 DAYS 5G',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['⚡ Truly Unlimited 5G', '📶 140 GB High Speed'],
        desc: 'Extended 70-day validity pack with 2GB daily & unlimited 5G'
      },
      {
        id: 'jio_899',
        price: 899,
        validity: '90 Days',
        data: '2.0 GB/d + 20GB',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HERO 90D PACK',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['⚡ Truly Unlimited 5G', '🎁 20GB Extra Bonus Data'],
        desc: 'Quarterly hero pack: 90 days validity with 200 GB total data'
      },
      {
        id: 'jio_1029',
        price: 1029,
        validity: '84 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'PRIME LITE',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['🍿 Amazon Prime Lite 84D', '⚡ Truly Unlimited 5G'],
        desc: '84 days validity with bundled Amazon Prime Lite membership'
      },
      {
        id: 'jio_3599',
        price: 3599,
        validity: '365 Days',
        data: '2.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'ANNUAL 365D',
        tagType: 'popular',
        categories: ['annual', 'special'],
        perks: ['⭐ 1 Full Year Freedom', '⚡ Truly Unlimited 5G'],
        desc: '912.5 GB high-speed data for 365 days with unlimited 5G'
      }
    ],

    airtel: [
      {
        id: 'airtel_199',
        price: 199,
        validity: '28 Days',
        data: '2.0 GB Total',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'SMART VALUE',
        tagType: 'value',
        categories: ['recommended'],
        perks: ['🎵 Free Hellotunes', '🛡️ Wynk Music Free'],
        desc: 'Pocket-friendly 28-day voice calling and basic connectivity pack'
      },
      {
        id: 'airtel_299',
        price: 299,
        validity: '28 Days',
        data: '1.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'DAILY ESSENTIAL',
        tagType: 'value',
        categories: ['unlimited'],
        perks: ['🎵 Wynk Music Free', '🛡️ Free Hellotunes'],
        desc: 'Daily 1GB data pack for seamless browsing and national calling'
      },
      {
        id: 'airtel_349',
        price: 349,
        validity: '28 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'STANDARD PACK',
        tagType: 'popular',
        categories: ['recommended', 'unlimited'],
        perks: ['🎵 Wynk Music', '🛡️ Free Hellotunes'],
        desc: 'Reliable 42GB daily data pack with unlimited national calls'
      },
      {
        id: 'airtel_379',
        price: 379,
        validity: '28 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'UNLIMITED 5G',
        tagType: 'deal',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['⚡ Unlimited 5G Plus', '🎵 Wynk Music Suite'],
        desc: 'Airtel flagship 28-day plan with unlimited 5G Plus speed'
      },
      {
        id: 'airtel_409',
        price: 409,
        validity: '28 Days',
        data: '2.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '5G POWER',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['⚡ Unlimited 5G Plus', '🎬 Airtel Xstream'],
        desc: '70GB heavy streaming allowance with unrestricted 5G Plus'
      },
      {
        id: 'airtel_449',
        price: 449,
        validity: '28 Days',
        data: '3.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HOTSTAR 3M',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['🎬 Disney+ Hotstar 3M', '⚡ Unlimited 5G Plus'],
        desc: '3.0 GB daily data bundled with 3 Months Disney+ Hotstar'
      },
      {
        id: 'airtel_579',
        price: 579,
        validity: '56 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '56 DAYS VALUE',
        tagType: 'value',
        categories: ['recommended', 'unlimited'],
        perks: ['⚡ 84 GB Total Data', '🎵 Wynk Music'],
        desc: 'Two full months of worry-free voice and daily internet'
      },
      {
        id: 'airtel_649',
        price: 649,
        validity: '56 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '56D 5G PLUS',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['⚡ Unlimited 5G Plus', '🛡️ Airtel Thanks Perks'],
        desc: '112 GB data over 56 days with unlimited 5G high speed'
      },
      {
        id: 'airtel_859',
        price: 859,
        validity: '84 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '84 DAYS PACK',
        tagType: 'value',
        categories: ['recommended', 'unlimited'],
        perks: ['⚡ 126 GB Total Data', '🎵 Wynk Music'],
        desc: 'Quarterly voice and internet pack with 84 days validity'
      },
      {
        id: 'airtel_979',
        price: 979,
        validity: '84 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HERO 84D XSTREAM',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['⚡ Unlimited 5G Plus', '📺 Airtel Xstream 22+ OTTs'],
        desc: 'Hero 84-day pack with free access to 22+ premium OTT apps'
      },
      {
        id: 'airtel_1199',
        price: 1199,
        validity: '84 Days',
        data: '2.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'PRIME MEMBERSHIP',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['🍿 Amazon Prime Included', '⚡ Unlimited 5G Plus'],
        desc: '84 days pack with full Amazon Prime subscription included'
      },
      {
        id: 'airtel_3999',
        price: 3999,
        validity: '365 Days',
        data: '2.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'ANNUAL HOTSTAR',
        tagType: 'popular',
        categories: ['annual', 'special'],
        perks: ['⭐ 1 Year Disney+ Hotstar', '⚡ Unlimited 5G Plus'],
        desc: 'Annual 1-year pack with 912.5GB data & 1-year Disney+ Hotstar'
      }
    ],

    vi: [
      {
        id: 'vi_199',
        price: 199,
        validity: '28 Days',
        data: '2.0 GB Total',
        voice: 'Unlimited',
        sms: '300 SMS',
        tag: 'VOICE SPECIAL',
        tagType: 'value',
        categories: ['recommended'],
        perks: ['📶 Unlimited Voice Calling', '📱 Vi App Benefits'],
        desc: 'Budget 28-day voice pack for essential calling and messaging'
      },
      {
        id: 'vi_299',
        price: 299,
        validity: '28 Days',
        data: '1.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'DAILY PACK',
        tagType: 'value',
        categories: ['unlimited'],
        perks: ['📶 28 GB High-Speed', '📱 Vi Movies & TV'],
        desc: 'Standard daily pack for calls, messaging, and web browsing'
      },
      {
        id: 'vi_365',
        price: 365,
        validity: '28 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HERO UNLIMITED',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['🌙 Binge All Night (12-6 AM)', '🔄 Weekend Data Rollover', '🎁 2GB Data Delights'],
        desc: 'Vi signature Hero pack: unlimited free data from 12 AM to 6 AM'
      },
      {
        id: 'vi_409',
        price: 409,
        validity: '28 Days',
        data: '2.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'SONYLIV OTT',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['🎬 SonyLIV Mobile 28D', '🌙 Binge All Night (12-6 AM)', '🔄 Weekend Rollover'],
        desc: 'Live sports and SonyLIV access + unlimited night binge data'
      },
      {
        id: 'vi_475',
        price: 475,
        validity: '28 Days',
        data: '4.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'MAX 4GB/DAY',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['⚡ Massive 112 GB Data', '🌙 Binge All Night', '🔄 Weekend Rollover'],
        desc: 'Highest daily data: 4GB/day for gamers and heavy stream lovers'
      },
      {
        id: 'vi_579',
        price: 579,
        validity: '56 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '56D HERO',
        tagType: 'value',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['🌙 Free Night Data (12-6 AM)', '🔄 Weekend Data Rollover'],
        desc: '56 days validity with full Hero Unlimited night data benefit'
      },
      {
        id: 'vi_649',
        price: 649,
        validity: '56 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '56D 2GB HERO',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['🌙 Unlimited Night 12-6 AM', '🎁 2GB Backup Delights'],
        desc: '112 GB high speed internet over 2 months + free night surfing'
      },
      {
        id: 'vi_859',
        price: 859,
        validity: '84 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '84D HERO PACK',
        tagType: 'value',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['🌙 Binge All Night', '🔄 Weekend Data Rollover'],
        desc: 'Quarterly peace of mind with 126 GB data and night binge'
      },
      {
        id: 'vi_979',
        price: 979,
        validity: '84 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HERO 84D POWER',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['🌙 Binge All Night (12-6 AM)', '🔄 Weekend Rollover', '🎁 Data Delights'],
        desc: 'Top-rated quarterly Hero pack with 168 GB and night data'
      },
      {
        id: 'vi_1449',
        price: 1449,
        validity: '180 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'HALF YEARLY',
        tagType: 'deal',
        categories: ['unlimited', 'special'],
        perks: ['⏱️ 6 Months Validity', '🌙 180 Nights Free Data', '🔄 Weekend Rollover'],
        desc: 'Half-yearly pack with 270 GB total data & 180 nights free data'
      },
      {
        id: 'vi_3499',
        price: 3499,
        validity: '365 Days',
        data: '1.5 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'ANNUAL HERO 365D',
        tagType: 'popular',
        categories: ['annual', 'special'],
        perks: ['⭐ 365 Days Validity', '🌙 365 Nights Free Binge', '🔄 Weekend Rollover'],
        desc: 'Annual Hero plan: non-stop free night data every night all year'
      }
    ],

    bsnl: [
      {
        id: 'bsnl_107',
        price: 107,
        validity: '35 Days',
        data: '3.0 GB Total',
        voice: '200 Mins Free',
        sms: 'Standard',
        tag: 'BUDGET 35D',
        tagType: 'value',
        categories: ['recommended'],
        perks: ['⏱️ 35 Days SIM Validity', '🎵 Free BSNL Default Tune'],
        desc: 'Most affordable long-validity starter pack in India'
      },
      {
        id: 'bsnl_153',
        price: 153,
        validity: '26 Days',
        data: '1.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'CHEAPEST DAILY',
        tagType: 'value',
        categories: ['recommended', 'unlimited'],
        perks: ['📶 Unlimited National Calls', '🎵 Free PRBT Tune'],
        desc: 'Lowest cost daily 1GB pack with truly unlimited calling'
      },
      {
        id: 'bsnl_197',
        price: 197,
        validity: '70 Days',
        data: '2.0 GB/day (18D)',
        voice: 'Unlimited (18D)',
        sms: '100/day (18D)',
        tag: '70 DAYS VALIDITY',
        tagType: 'deal',
        categories: ['recommended'],
        perks: ['⏱️ 70 Days Incoming Active', '📶 High Speed 3G/4G'],
        desc: 'Keep your SIM active for 70 days at just ₹2.8 per day'
      },
      {
        id: 'bsnl_199',
        price: 199,
        validity: '30 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'FULL CALENDAR 30D',
        tagType: 'popular',
        categories: ['recommended', 'unlimited'],
        perks: ['📅 Complete 30 Days Month', '📶 60 GB High-Speed Data'],
        desc: 'Full 30-day calendar validity with 2GB daily high speed data'
      },
      {
        id: 'bsnl_249',
        price: 249,
        validity: '45 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '45 DAYS PACK',
        tagType: 'value',
        categories: ['recommended', 'unlimited'],
        perks: ['📶 90 GB Total Data', '📱 Truly Unlimited Calls'],
        desc: '1.5 months extended validity with daily 2GB data allowance'
      },
      {
        id: 'bsnl_347',
        price: 347,
        validity: '54 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '54 DAYS POWER',
        tagType: 'value',
        categories: ['recommended', 'unlimited'],
        perks: ['📶 108 GB High Speed', '🛡️ Challenges Arena Free'],
        desc: 'Nearly 2 months with 2GB/day internet and national calling'
      },
      {
        id: 'bsnl_397',
        price: 397,
        validity: '150 Days',
        data: '2.0 GB/day (30D)',
        voice: 'Unlimited (30D)',
        sms: '100/day (30D)',
        tag: '5 MONTHS (150D)',
        tagType: 'deal',
        categories: ['unlimited'],
        perks: ['⏱️ 150 Days Active SIM', '📶 Truly Unlimited Voice 30D'],
        desc: '5 full months validity: keep your BSNL connection active'
      },
      {
        id: 'bsnl_599',
        price: 599,
        validity: '84 Days',
        data: '3.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'SUPER HERO 3GB/D',
        tagType: 'popular',
        categories: ['recommended', 'unlimited', 'special'],
        perks: ['🌙 Unlimited Night Data (12-5 AM)', '⚡ Massive 252 GB Total'],
        desc: '84 days with 3GB daily + completely free night data (12-5 AM)'
      },
      {
        id: 'bsnl_997',
        price: 997,
        validity: '160 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '160 DAYS (5.3M)',
        tagType: 'deal',
        categories: ['unlimited'],
        perks: ['⏱️ 160 Days Non-Stop', '📶 320 GB Total High-Speed'],
        desc: 'Extended 5.3 months validity with 2GB daily data & PRBT'
      },
      {
        id: 'bsnl_1999',
        price: 1999,
        validity: '365 Days',
        data: '600 GB Total (No Cap)',
        voice: 'Unlimited',
        sms: '100/day',
        tag: 'ANNUAL FREEDOM',
        tagType: 'popular',
        categories: ['annual'],
        perks: ['⭐ 1 Full Year Validity', '📊 No Daily Cap (Use Anytime)'],
        desc: 'Annual freedom plan: consume 600GB anytime without daily limit'
      },
      {
        id: 'bsnl_2399',
        price: 2399,
        validity: '395 Days',
        data: '2.0 GB/day',
        voice: 'Unlimited',
        sms: '100/day',
        tag: '13 MONTHS (395D)',
        tagType: 'deal',
        categories: ['annual'],
        perks: ['⭐ 395 Days (13 Full Months)', '📶 790 GB High Speed'],
        desc: 'India’s longest validity pack: 13 months with 2GB daily data'
      }
    ]
  };

  // 1. Promo Timer
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

  // 2. Load User Info & Operator
  var params = new URLSearchParams(window.location.search);
  var mobile = params.get('mobile') || sessionStorage.getItem('swift_mobile') || '9876543210';
  var rawOperator = (params.get('operator') || sessionStorage.getItem('swift_operator') || 'jio').toLowerCase();

  var validOps = ['jio', 'airtel', 'vi', 'bsnl'];
  var operator = validOps.indexOf(rawOperator) !== -1 ? rawOperator : 'jio';

  var opNameMap = {
    jio: 'Jio',
    airtel: 'Airtel',
    vi: 'Vi',
    bsnl: 'BSNL'
  };
  var opDisplayName = opNameMap[operator];

  function initUserInfo() {
    var displayMobile = document.getElementById('displayMobile');
    var displayOp = document.getElementById('displayOperator');
    var displayLogo = document.getElementById('displayLogo');
    var specialTab = document.getElementById('specialTab');

    if (displayMobile) {
      displayMobile.textContent = '+91 ' + mobile.replace(/(\d{5})(\d{5})/, '$1 $2');
    }

    if (displayOp) {
      displayOp.textContent = opDisplayName + ' Prepaid';
    }

    if (displayLogo) {
      displayLogo.src = 'assets/img/' + operator + '.jpg';
      displayLogo.alt = opDisplayName;
    }

    // Adapt special tab label to operator feature
    if (specialTab) {
      if (operator === 'vi') {
        specialTab.textContent = 'Night Binge';
      } else if (operator === 'bsnl') {
        specialTab.textContent = 'Night Free';
      } else {
        specialTab.textContent = '5G Unlimited';
      }
    }
  }

  // 3. Render Real Plans Dynamically
  function renderPlans() {
    var container = document.getElementById('plansList');
    if (!container) return;

    var plans = OPERATOR_PLANS[operator] || OPERATOR_PLANS.jio;
    var html = '';

    plans.forEach(function (plan, idx) {
      var categoriesStr = plan.categories.join(' ');
      var perksHtml = plan.perks
        .map(function (p) {
          return '<span class="perk-pill">' + p + '</span>';
        })
        .join('');

      html +=
        '<article class="plan-card" data-category="' +
        categoriesStr +
        '" style="animation-delay: ' +
        (idx * 0.05 + 0.05) +
        's">' +
        '  <div class="plan-top-row">' +
        '    <div class="badge-tag ' +
        plan.tagType +
        '">' +
        '      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><use href="#icon-sparkle"></use></svg>' +
        '      ' +
        plan.tag +
        '    </div>' +
        '    <div class="network-badge">' +
        opDisplayName +
        ' PREPAID</div>' +
        '  </div>' +
        '  <div class="price-row">' +
        '    <div class="plan-price">₹' +
        plan.price +
        '</div>' +
        '    <div style="font-size: 12.5px; color: var(--text-soft); font-weight: 600;">' +
        plan.desc +
        '</div>' +
        '  </div>' +
        '  <div class="plan-grid">' +
        '    <div class="plan-feature">' +
        '      <div class="feature-icon"><svg viewBox="0 0 24 24"><use href="#icon-calendar"></use></svg></div>' +
        '      <div class="feature-details">' +
        '        <span class="feature-label">Validity</span>' +
        '        <span class="feature-value">' +
        plan.validity +
        '</span>' +
        '      </div>' +
        '    </div>' +
        '    <div class="plan-feature">' +
        '      <div class="feature-icon"><svg viewBox="0 0 24 24"><use href="#icon-data"></use></svg></div>' +
        '      <div class="feature-details">' +
        '        <span class="feature-label">Data</span>' +
        '        <span class="feature-value">' +
        plan.data +
        '</span>' +
        '      </div>' +
        '    </div>' +
        '    <div class="plan-feature">' +
        '      <div class="feature-icon"><svg viewBox="0 0 24 24"><use href="#icon-call"></use></svg></div>' +
        '      <div class="feature-details">' +
        '        <span class="feature-label">Voice</span>' +
        '        <span class="feature-value">' +
        plan.voice +
        '</span>' +
        '      </div>' +
        '    </div>' +
        '    <div class="plan-feature">' +
        '      <div class="feature-icon"><svg viewBox="0 0 24 24"><use href="#icon-message"></use></svg></div>' +
        '      <div class="feature-details">' +
        '        <span class="feature-label">SMS</span>' +
        '        <span class="feature-value">' +
        plan.sms +
        '</span>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="perks-row">' +
        perksHtml +
        '</div>' +
        '  <button type="button" class="recharge-plan-button" data-plan="' +
        plan.id +
        '" data-amount="' +
        plan.price +
        '" data-validity="' +
        plan.validity +
        '" data-data="' +
        plan.data +
        '">' +
        '    <span>Recharge for ₹' +
        plan.price +
        '</span>' +
        '    <svg viewBox="0 0 24 24"><use href="#icon-arrow"></use></svg>' +
        '  </button>' +
        '</article>';
    });

    container.innerHTML = html;
    initPlanSelection();
  }

  // 4. Tab Filtering
  function initTabs() {
    var tabs = document.querySelectorAll('.tab-pill');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var category = this.getAttribute('data-category');

        tabs.forEach(function (t) {
          t.classList.remove('active');
        });
        this.classList.add('active');

        var cards = document.querySelectorAll('.plan-card');
        cards.forEach(function (card) {
          var cardCat = card.getAttribute('data-category') || '';
          if (category === 'all' || cardCat.indexOf(category) !== -1) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Plan Selection & Navigation
  function initPlanSelection() {
    var buttons = document.querySelectorAll('.recharge-plan-button');
    var overlay = document.getElementById('loaderOverlay');
    var loaderTitle = document.getElementById('loaderText');
    var loaderSub = document.getElementById('loaderSubText');
    var busy = false;

    window.addEventListener('pageshow', function () {
      busy = false;
      if (overlay) overlay.classList.remove('show');
    });

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (busy) return;
        busy = true;

        if (navigator.vibrate) navigator.vibrate(15);

        var planId = this.getAttribute('data-plan');
        var amount = this.getAttribute('data-amount');
        var validity = this.getAttribute('data-validity') || '28 Days';
        var dataInfo = this.getAttribute('data-data') || '1.5 GB/day';

        if (overlay) {
          overlay.classList.add('show');
          loaderTitle.textContent = 'Opening Secure Checkout';
          loaderSub.textContent = 'Preparing ' + opDisplayName + ' ₹' + amount + ' gateway…';
        }

        setTimeout(function () {
          var query =
            'payment.html?plan=' +
            encodeURIComponent(planId) +
            '&amount=' +
            encodeURIComponent(amount) +
            '&validity=' +
            encodeURIComponent(validity) +
            '&data=' +
            encodeURIComponent(dataInfo) +
            '&mobile=' +
            encodeURIComponent(mobile) +
            '&operator=' +
            encodeURIComponent(operator);

          window.location.assign(query);
        }, 500);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPromoTimer();
    initUserInfo();
    renderPlans();
    initTabs();
  });
})();
