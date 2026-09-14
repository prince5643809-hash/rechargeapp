<!DOCTYPE html>
<html lang="en-IN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
    <meta name="theme-color" content="#6326a8">
    <meta name="description" content="Mobile Recharge Plans">
    <title>Recharge Plans</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <script>
        const MAIN_URL = "";
        const currentOperator = "jio";
        const currentProviderName = "Jio";
        const mobFromUrl = "9876543210";
        const vpaFromUrl = "";
    </script>

    <style>
        :root {
            --brand: #6b2db5;
            --brand-dark: #4f188f;
            --brand-deep: #371065;
            --brand-light: #f2eafe;
            --page-bg: #f4f5fa;
            --card-bg: rgba(255, 255, 255, 0.96);
            --text: #111827;
            --text-soft: #334155;
            --muted: #718096;
            --green: #16a34a;
            --red: #ef4444;
            --border: rgba(15, 23, 42, 0.075);
            --shadow-small: 0 5px 16px rgba(15, 23, 42, 0.06);
            --shadow-medium: 0 14px 34px rgba(15, 23, 42, 0.09);
            --shadow-large: 0 18px 46px rgba(15, 23, 42, 0.11);
            --shadow-brand: 0 16px 34px rgba(107, 45, 181, 0.24);
            --radius-large: 22px;
            --radius-medium: 17px;
            --radius-small: 13px;
        }

        * {
            box-sizing: border-box;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            -webkit-tap-highlight-color: transparent;
        }

        html {
            min-height: 100%;
            background: var(--page-bg);
            scroll-behavior: auto;
        }

        body {
            margin: 0;
            min-height: 100vh;
            min-height: 100svh;
            overflow-x: hidden;
            color: var(--text);
            background:
                radial-gradient(700px 310px at 4% -4%, rgba(107, 45, 181, 0.18), transparent 60%),
                radial-gradient(550px 260px at 100% 8%, rgba(129, 76, 195, 0.11), transparent 60%),
                var(--page-bg);
            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;
        }

        button,
        input {
            font: inherit;
        }

        button {
            -webkit-appearance: none;
            appearance: none;
        }

        img,
        svg {
            display: block;
        }

        .app {
            position: relative;
            width: 100%;
            max-width: 480px;
            min-height: 100vh;
            min-height: 100svh;
            margin: 0 auto;
            padding-bottom: calc(30px + env(safe-area-inset-bottom));
        }

        .header {
            position: sticky;
            top: 0;
            z-index: 100;
            min-height: 65px;
            padding: calc(9px + env(safe-area-inset-top)) 13px 9px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            overflow: hidden;
            isolation: isolate;
            background: linear-gradient(130deg, var(--brand-deep) 0%, var(--brand) 52%, #8149c5 100%);
            box-shadow: 0 12px 30px rgba(55, 16, 101, 0.25);
            animation: headerGlowPulse 3.2s ease-in-out infinite;
        }

        .header::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -2;
            pointer-events: none;
            background:
                radial-gradient(circle at 82% 0%, rgba(255, 255, 255, 0.23), transparent 36%),
                radial-gradient(circle at 8% 100%, rgba(199, 159, 255, 0.19), transparent 34%);
            animation: headerBackgroundGlow 4s ease-in-out infinite;
        }

        .header::after {
            content: "";
            position: absolute;
            z-index: -1;
            top: -90%;
            left: -48%;
            width: 34%;
            height: 280%;
            pointer-events: none;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.04), transparent);
            filter: blur(2px);
            transform: rotate(20deg);
            animation: headerGlowSweep 4.4s ease-in-out infinite;
        }

        .header-left,
        .header-actions {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
        }

        .header-left {
            min-width: 0;
            gap: 10px;
        }

        .header-actions {
            flex: 0 0 auto;
            gap: 7px;
        }

        .brand-mark {
            position: relative;
            width: 42px;
            height: 42px;
            flex: 0 0 42px;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.29), rgba(255, 255, 255, 0.10));
            border: 1px solid rgba(255, 255, 255, 0.24);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 8px 20px rgba(31, 5, 62, 0.20);
            animation: brandFloat 3.5s ease-in-out infinite;
        }

        .brand-mark::after {
            content: "";
            position: absolute;
            inset: -3px;
            z-index: -1;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            animation: brandRing 2.4s ease-out infinite;
        }

        .brand-logo {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            border-radius: 11px;
            filter: drop-shadow(0 4px 7px rgba(38, 4, 72, 0.22));
            animation: logoSoftPulse 3.2s ease-in-out infinite;
        }

        .brand-text {
            min-width: 0;
            color: #ffffff;
        }

        .brand-title {
            font-size: 15px;
            font-weight: 750;
            line-height: 1.15;
            letter-spacing: -0.15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .brand-subtitle {
            margin-top: 3px;
            font-size: 10.5px;
            font-weight: 550;
            line-height: 1.2;
            opacity: 0.85;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .header-button {
            position: relative;
            width: 36px;
            height: 36px;
            flex: 0 0 36px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.17);
            border-radius: 13px;
            color: #ffffff;
            background: rgba(255, 255, 255, 0.12);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 5px 12px rgba(31, 5, 62, 0.12);
            cursor: pointer;
            transition: transform 0.18s ease, background 0.18s ease;
        }

        .header-button svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .header-button:active {
            transform: scale(0.92);
            background: rgba(255, 255, 255, 0.20);
        }

        .notification-dot {
            position: absolute;
            top: 7px;
            right: 7px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ffcf5a;
            border: 1px solid var(--brand);
            box-shadow: 0 0 0 3px rgba(255, 207, 90, 0.12);
            animation: notificationPulse 1.8s ease-in-out infinite;
        }

        .subscriber-card,
        .offer-timer,
        .plans-heading-card,
        .plan-card {
            position: relative;
            overflow: hidden;
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.85);
        }

        .subscriber-card {
            margin: 11px 11px 0;
            padding: 10px 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            border-radius: 17px;
            box-shadow: var(--shadow-small);
            animation: fadeUp 0.42s ease both;
        }

        .subscriber-card::before,
        .plans-heading-card::before,
        .plan-card::before {
            content: "";
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle, rgba(107, 45, 181, 0.12), transparent 68%);
        }

        .subscriber-card::before {
            top: -55px;
            right: -50px;
            width: 130px;
            height: 130px;
        }

        .subscriber-left,
        .plans-heading-left {
            position: relative;
            z-index: 1;
            min-width: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .provider-logo-shell {
            position: relative;
            width: 42px;
            height: 42px;
            flex: 0 0 42px;
            padding: 5px;
            border-radius: 14px;
            background: #ffffff;
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
        }

        .provider-logo {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: contain;
            object-position: center;
        }

        .subscriber-copy {
            min-width: 0;
        }

        .subscriber-label {
            color: var(--muted);
            font-size: 9px;
            font-weight: 650;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.45px;
        }

        .mobile-display {
            margin-top: 3px;
            max-width: 270px;
            color: var(--text);
            font-size: 12.5px;
            font-weight: 750;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .change-link {
            position: relative;
            z-index: 1;
            flex: 0 0 auto;
            padding: 7px 10px;
            border-radius: 10px;
            color: var(--brand);
            background: rgba(107, 45, 181, 0.08);
            border: 1px solid rgba(107, 45, 181, 0.12);
            font-size: 10px;
            font-weight: 750;
            text-decoration: none;
            transition: transform 0.18s ease, background 0.18s ease;
        }

        .change-link:active {
            transform: scale(0.95);
            background: rgba(107, 45, 181, 0.14);
        }

        .offer-timer {
            margin: 10px 11px 0;
            min-height: 48px;
            padding: 7px 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            border-radius: 15px;
            text-align: center;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 252, 0.94));
            border: 1px solid rgba(239, 68, 68, 0.08);
            box-shadow: var(--shadow-small);
            animation: fadeUp 0.46s 0.04s ease both;
        }

        .timer-icon {
            position: relative;
            width: 28px;
            height: 28px;
            flex: 0 0 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            color: var(--red);
            background: linear-gradient(145deg, rgba(239, 68, 68, 0.13), rgba(239, 68, 68, 0.055));
            box-shadow: 0 5px 12px rgba(239, 68, 68, 0.09);
        }

        .timer-icon::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            border: 1px solid rgba(239, 68, 68, 0.17);
            animation: softPulse 2s ease-in-out infinite;
        }

        .timer-icon svg {
            width: 15px;
            height: 15px;
            fill: currentColor;
        }

        .timer-text {
            color: var(--text-soft);
            font-size: 12px;
            font-weight: 700;
            line-height: 1.2;
            white-space: nowrap;
        }

        .timer-value {
            min-width: 64px;
            flex: 0 0 auto;
            padding: 8px 9px;
            border-radius: 11px;
            color: var(--red);
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.10), rgba(239, 68, 68, 0.045));
            border: 1px solid rgba(239, 68, 68, 0.13);
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 11.5px;
            font-weight: 800;
            line-height: 1;
            text-align: center;
            letter-spacing: 0.5px;
            font-variant-numeric: tabular-nums;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
            animation: timerGlow 2.2s ease-in-out infinite;
        }

        .plans-heading-card {
            margin: 10px 11px 0;
            padding: 13px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            border-radius: var(--radius-large);
            box-shadow: var(--shadow-medium);
            animation: fadeUp 0.5s 0.08s ease both;
        }

        .plans-heading-card::before {
            top: -100px;
            right: -100px;
            width: 220px;
            height: 220px;
            background: radial-gradient(circle, rgba(107, 45, 181, 0.14), transparent 68%);
        }

        .plans-heading-icon {
            position: relative;
            width: 39px;
            height: 39px;
            flex: 0 0 39px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            color: var(--brand);
            background: linear-gradient(145deg, rgba(107, 45, 181, 0.16), rgba(107, 45, 181, 0.055));
            border: 1px solid rgba(107, 45, 181, 0.14);
            box-shadow: 0 8px 17px rgba(107, 45, 181, 0.11);
            animation: headingIconFloat 2.8s ease-in-out infinite;
        }

        .plans-heading-icon::before {
            content: "";
            position: absolute;
            inset: -4px;
            z-index: -1;
            border-radius: 17px;
            background: rgba(107, 45, 181, 0.10);
            opacity: 0;
            animation: headingIconGlow 2.2s ease-out infinite;
        }

        .plans-heading-icon svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
            animation: headingIconPulse 2.8s ease-in-out infinite;
        }

        .plans-heading-copy {
            min-width: 0;
        }

        .plans-heading-title {
            color: var(--text);
            font-size: 14.5px;
            font-weight: 750;
            line-height: 1.2;
        }

        .plans-heading-subtitle {
            margin-top: 3px;
            color: var(--muted);
            font-size: 10.5px;
            font-weight: 550;
            line-height: 1.3;
        }

        .special-pill {
            position: relative;
            z-index: 1;
            flex: 0 0 auto;
            padding: 6px 8px;
            display: flex;
            align-items: center;
            gap: 4px;
            border-radius: 9px;
            color: var(--brand);
            background: rgba(107, 45, 181, 0.08);
            border: 1px solid rgba(107, 45, 181, 0.13);
            font-size: 8px;
            font-weight: 800;
            letter-spacing: 0.25px;
        }

        .special-pill svg {
            width: 11px;
            height: 11px;
            fill: currentColor;
        }

        #plans-container {
            padding: 10px 11px 0;
        }

        .plans-status {
            padding: 25px 14px;
            border-radius: var(--radius-large);
            color: var(--muted);
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(15, 23, 42, 0.07);
            box-shadow: var(--shadow-small);
            font-size: 11px;
            font-weight: 700;
            text-align: center;
        }

        .plans-status.error {
            color: var(--red);
        }

        .plan-card {
            margin-bottom: 11px;
            padding: 13px;
            border-radius: var(--radius-large);
            box-shadow: var(--shadow-medium);
            animation: planCardIn 0.45s ease both;
        }

        .plan-card::before {
            top: -90px;
            right: -90px;
            width: 190px;
            height: 190px;
            background: radial-gradient(circle, rgba(107, 45, 181, 0.105), transparent 68%);
        }

        .plan-top-row,
        .price-row {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 9px;
        }

        .plan-top-row {
            margin-bottom: 12px;
        }

        .new-badge {
            padding: 5px 8px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            border-radius: 8px;
            color: #ffffff;
            background: linear-gradient(135deg, #ff1744, #e50032);
            box-shadow: 0 6px 13px rgba(239, 0, 51, 0.20);
            font-size: 8px;
            font-weight: 800;
            line-height: 1;
            letter-spacing: 0.35px;
        }

        .new-badge svg {
            width: 10px;
            height: 10px;
            fill: currentColor;
        }

        .network-badge {
            padding: 5px 8px;
            border-radius: 8px;
            color: var(--brand);
            background: rgba(107, 45, 181, 0.075);
            border: 1px solid rgba(107, 45, 181, 0.11);
            font-size: 8px;
            font-weight: 750;
        }

        .price-row {
            align-items: flex-end;
            gap: 10px;
            margin-bottom: 12px;
        }

        .price-left {
            min-width: 0;
            display: flex;
            align-items: baseline;
            gap: 8px;
            flex-wrap: wrap;
        }

        .plan-price {
            color: var(--text);
            font-size: 25px;
            font-weight: 850;
            line-height: 1;
            letter-spacing: -0.7px;
        }

        .plan-old-price {
            color: var(--muted);
            font-size: 12px;
            font-weight: 650;
            text-decoration: line-through;
        }

        .five-g-logo {
            width: auto;
            height: 18px;
            object-fit: contain;
        }

        .plan-grid {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 6px;
            padding: 10px 0;
            border-top: 1px solid rgba(15, 23, 42, 0.07);
            border-bottom: 1px solid rgba(15, 23, 42, 0.07);
        }

        .plan-feature {
            min-width: 0;
            padding: 7px 4px;
            border-radius: 10px;
            text-align: center;
            background: rgba(248, 250, 252, 0.82);
        }

        .feature-icon {
            width: 21px;
            height: 21px;
            margin: 0 auto 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 7px;
            color: var(--brand);
            background: rgba(107, 45, 181, 0.075);
        }

        .feature-icon svg {
            width: 12px;
            height: 12px;
            fill: currentColor;
        }

        .feature-label {
            color: var(--muted);
            font-size: 7px;
            font-weight: 700;
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: 0.25px;
        }

        .feature-value {
            margin-top: 4px;
            color: var(--text);
            font-size: 9.5px;
            font-weight: 750;
            line-height: 1.2;
            overflow-wrap: anywhere;
        }

        .recharge-plan-button {
            position: relative;
            z-index: 1;
            overflow: hidden;
            width: 100%;
            min-height: 49px;
            margin-top: 11px;
            padding: 0 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: 0;
            border-radius: 15px;
            color: #ffffff;
            background: linear-gradient(125deg, var(--brand-dark), var(--brand) 50%, #854bc7);
            box-shadow: var(--shadow-brand);
            font-size: 12.5px;
            font-weight: 750;
            cursor: pointer;
            transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, opacity 0.18s ease;
        }

        .recharge-plan-button::before {
            content: "";
            position: absolute;
            top: -70%;
            left: -45%;
            width: 34%;
            height: 240%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.27), transparent);
            transform: rotate(20deg);
            animation: buttonShine 3.5s ease-in-out infinite;
        }

        .recharge-plan-button span,
        .recharge-plan-button svg {
            position: relative;
            z-index: 2;
        }

        .recharge-plan-button svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
            transition: transform 0.2s ease;
        }

        .recharge-plan-button:active {
            transform: scale(0.975);
            filter: brightness(0.97);
            box-shadow: 0 10px 22px rgba(107, 45, 181, 0.22);
        }

        .recharge-plan-button:active svg {
            transform: translateX(3px);
        }

        .recharge-plan-button:disabled {
            opacity: 0.65;
            cursor: default;
        }

        .trust-row {
            margin: 2px 11px 0;
            padding: 9px 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 13px;
            color: #8490a1;
        }

        .trust-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 8px;
            font-weight: 600;
            white-space: nowrap;
        }

        .trust-item svg {
            width: 11px;
            height: 11px;
            fill: currentColor;
        }

        .loader-overlay {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(244, 245, 250, 0.88);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
        }

        .loader-overlay.show {
            display: flex;
            animation: overlayFade 0.22s ease both;
        }

        .loader-card {
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 310px;
            padding: 24px 18px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.96);
            border: 1px solid rgba(255, 255, 255, 0.85);
            box-shadow: 0 25px 70px rgba(15, 23, 42, 0.16);
            text-align: center;
            animation: loaderCardIn 0.32s cubic-bezier(.2, .8, .2, 1) both;
        }

        .loader-card::before {
            content: "";
            position: absolute;
            top: -110px;
            right: -100px;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(107, 45, 181, 0.14), transparent 68%);
            pointer-events: none;
        }

        .loading-animation,
        .success-animation {
            width: 69px;
            height: 69px;
            margin-bottom: 15px;
            align-items: center;
            justify-content: center;
        }

        .loading-animation {
            position: relative;
            display: flex;
        }

        .spinner-ring {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 4px solid rgba(107, 45, 181, 0.09);
            border-top-color: var(--brand);
            border-right-color: rgba(107, 45, 181, 0.42);
            animation: spinnerRotate 0.78s linear infinite;
        }

        .spinner-core {
            position: relative;
            width: 47px;
            height: 47px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            color: var(--brand);
            background: var(--brand-light);
            animation: spinnerCorePulse 1.25s ease-in-out infinite;
        }

        .spinner-core svg {
            width: 23px;
            height: 23px;
            fill: currentColor;
        }

        .success-animation {
            display: none;
            border-radius: 23px;
            color: #ffffff;
            background: linear-gradient(135deg, #25c864, var(--green));
            box-shadow: 0 15px 32px rgba(22, 163, 74, 0.24);
            animation: successPop 0.4s cubic-bezier(.2, 1.5, .4, 1) both;
        }

        .success-animation svg {
            width: 34px;
            height: 34px;
            fill: currentColor;
        }

        .loader-title {
            color: var(--text);
            font-size: 16px;
            font-weight: 750;
            line-height: 1.2;
        }

        .loader-subtitle {
            margin-top: 6px;
            color: var(--muted);
            font-size: 10.5px;
            font-weight: 550;
            line-height: 1.4;
        }

        .loader-progress {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 4px;
            margin-top: 18px;
            border-radius: 999px;
            background: rgba(107, 45, 181, 0.09);
        }

        .loader-progress span {
            position: absolute;
            inset: 0 auto 0 0;
            width: 28%;
            border-radius: inherit;
            background: linear-gradient(90deg, var(--brand-dark), #8f58d0);
            animation: progressMove 1.15s ease-in-out infinite;
        }

        .loader-card.success .loader-progress span {
            width: 100%;
            animation: progressComplete 0.35s ease both;
            background: var(--green);
        }

        @media (max-width: 380px) {
            .header {
                min-height: 61px;
                padding: calc(8px + env(safe-area-inset-top)) 11px 8px;
            }

            .brand-mark {
                width: 39px;
                height: 39px;
                flex-basis: 39px;
                border-radius: 14px;
            }

            .brand-title {
                font-size: 14px;
            }

            .brand-subtitle {
                font-size: 9.5px;
            }

            .header-button {
                width: 34px;
                height: 34px;
                flex-basis: 34px;
                border-radius: 12px;
            }

            .subscriber-card,
            .offer-timer,
            .plans-heading-card {
                margin-left: 9px;
                margin-right: 9px;
            }

            #plans-container {
                padding-left: 9px;
                padding-right: 9px;
            }

            .subscriber-card {
                padding: 9px;
            }

            .provider-logo-shell {
                width: 39px;
                height: 39px;
                flex-basis: 39px;
            }

            .mobile-display {
                max-width: 205px;
                font-size: 11.5px;
            }

            .offer-timer {
                min-height: 46px;
                padding: 7px 8px;
                gap: 7px;
            }

            .timer-icon {
                width: 26px;
                height: 26px;
                flex-basis: 26px;
            }

            .timer-text {
                font-size: 10.8px;
            }

            .timer-value {
                min-width: 60px;
                padding: 7px 8px;
                font-size: 11px;
            }

            .plans-heading-card {
                padding: 12px;
            }

            .plans-heading-icon {
                width: 36px;
                height: 36px;
                flex-basis: 36px;
            }

            .plans-heading-title {
                font-size: 13.5px;
            }

            .plans-heading-subtitle {
                font-size: 9.5px;
            }

            .plan-card {
                padding: 12px;
            }

            .plan-price {
                font-size: 23px;
            }

            .plan-grid {
                gap: 5px;
            }

            .plan-feature {
                padding: 6px 3px;
            }

            .feature-value {
                font-size: 9px;
            }
        }

        @media (max-width: 335px) {
            .brand-subtitle,
            .special-pill {
                display: none;
            }

            .header-actions {
                gap: 5px;
            }

            .mobile-display {
                max-width: 170px;
            }

            .offer-timer {
                gap: 5px;
                padding: 7px 6px;
            }

            .timer-text {
                font-size: 10px;
            }

            .timer-value {
                min-width: 57px;
                padding: 7px 6px;
                font-size: 10.5px;
            }

            .plan-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes planCardIn {
            from { opacity: 0; transform: translateY(13px) scale(0.985); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes headerGlowPulse {
            0%, 100% { box-shadow: 0 12px 30px rgba(55, 16, 101, 0.25), 0 0 0 rgba(132, 76, 199, 0); }
            50% { box-shadow: 0 15px 35px rgba(55, 16, 101, 0.34), 0 6px 25px rgba(132, 76, 199, 0.25); }
        }

        @keyframes headerBackgroundGlow {
            0%, 100% { opacity: 0.72; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.06); }
        }

        @keyframes headerGlowSweep {
            0%, 55% { left: -48%; opacity: 0; }
            63% { opacity: 0.8; }
            85% { left: 120%; opacity: 0.65; }
            100% { left: 120%; opacity: 0; }
        }

        @keyframes brandFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
        }

        @keyframes brandRing {
            0% { opacity: 0.32; transform: scale(0.92); }
            70%, 100% { opacity: 0; transform: scale(1.17); }
        }

        @keyframes logoSoftPulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 4px 7px rgba(38, 4, 72, 0.22)); }
            50% { transform: scale(1.06); filter: drop-shadow(0 6px 11px rgba(255, 255, 255, 0.25)); }
        }

        @keyframes notificationPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }

        @keyframes softPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0; transform: scale(1.28); }
        }

        @keyframes timerGlow {
            0%, 100% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 0 0 rgba(239, 68, 68, 0); }
            50% { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 5px 15px rgba(239, 68, 68, 0.14); }
        }

        @keyframes headingIconFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); box-shadow: 0 8px 17px rgba(107, 45, 181, 0.11); }
            50% { transform: translateY(-3px) rotate(-2deg); box-shadow: 0 12px 22px rgba(107, 45, 181, 0.19); }
        }

        @keyframes headingIconGlow {
            0% { opacity: 0.5; transform: scale(0.88); }
            75%, 100% { opacity: 0; transform: scale(1.32); }
        }

        @keyframes headingIconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
        }

        @keyframes buttonShine {
            0%, 58% { left: -45%; }
            80%, 100% { left: 125%; }
        }

        @keyframes overlayFade {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes loaderCardIn {
            from { opacity: 0; transform: translateY(12px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes spinnerRotate {
            to { transform: rotate(360deg); }
        }

        @keyframes spinnerCorePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.92); }
        }

        @keyframes successPop {
            from { opacity: 0; transform: scale(0.58) rotate(-8deg); }
            to { opacity: 1; transform: scale(1) rotate(0); }
        }

        @keyframes progressMove {
            0% { left: -30%; }
            100% { left: 105%; }
        }

        @keyframes progressComplete {
            from { width: 30%; }
            to { width: 100%; }
        }
    </style>
</head>

<body>
<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;overflow:hidden">
    <symbol id="icon-help" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 17.2a1.2 1.2 0 1 1 1.2-1.2 1.2 1.2 0 0 1-1.2 1.2Zm1.3-6.1v1h-2v-1.5c0-1 .5-1.6 1.3-2.2.8-.6 1.4-1 1.4-1.9a2 2 0 0 0-4 0H8a4 4 0 0 1 8 0c0 1.8-1.1 2.7-2.1 3.5-.4.3-.6.6-.6 1.1Z"/></symbol>
    <symbol id="icon-bell" viewBox="0 0 24 24"><path d="M20 17h-1V11a7 7 0 0 0-5-6.7V3a2 2 0 0 0-4 0v1.3A7 7 0 0 0 5 11v6H4a1 1 0 0 0 0 2h5a3 3 0 0 0 6 0h5a1 1 0 0 0 0-2Zm-8 4a1 1 0 0 1-1-1h2a1 1 0 0 1-1 1Zm5-4H7v-6a5 5 0 0 1 10 0Z"/></symbol>
    <symbol id="icon-clock" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm1-13h-2v6l5.1 3.1 1-1.7-4.1-2.5Z"/></symbol>
    <symbol id="icon-plans" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 5h6V6H5Zm0 5h14v-2H5Zm0 5h14v-2H5Zm10-10h4V6h-4Z"/></symbol>
    <symbol id="icon-sparkle" viewBox="0 0 24 24"><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7ZM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9Z"/></symbol>
    <symbol id="icon-data" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-9 9h2a7 7 0 0 1 14 0h2a9 9 0 0 0-9-9Zm0 4a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0h2a5 5 0 0 0-5-5Zm0 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 11Zm-1 4v6h2v-6Z"/></symbol>
    <symbol id="icon-calendar" viewBox="0 0 24 24"><path d="M7 2h2v2h6V2h2v2h2a3 3 0 0 1 3 3v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h2Zm13 8H4v10h16ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1Z"/></symbol>
    <symbol id="icon-call" viewBox="0 0 24 24"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.8 11.8 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.8 11.8 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z"/></symbol>
    <symbol id="icon-message" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM6 7h12v2H6Zm0 4h9v2H6Z"/></symbol>
    <symbol id="icon-arrow" viewBox="0 0 24 24"><path d="m13.2 5.3-1.4 1.4 4.3 4.3H4v2h12.1l-4.3 4.3 1.4 1.4 6.7-6.7Z"/></symbol>
    <symbol id="icon-check" viewBox="0 0 24 24"><path d="m9.2 16.6-4.5-4.5-1.4 1.4 5.9 5.9L21 7.6l-1.4-1.4Z"/></symbol>
    <symbol id="icon-lock" viewBox="0 0 24 24"><path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9Zm-8-2a3 3 0 0 1 6 0v2H9Zm4 10.7V19h-2v-1.3a2 2 0 1 1 2 0Z"/></symbol>
    <symbol id="icon-shield" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V5Zm-1.2 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.8-4.8L17 10Z"/></symbol>
</svg>

<div id="loaderOverlay" class="loader-overlay" role="dialog" aria-modal="true" aria-live="polite">
    <div id="loaderCard" class="loader-card">
        <div id="loadingAnimation" class="loading-animation">
            <div class="spinner-ring"></div>
            <div class="spinner-core">
                <svg viewBox="0 0 24 24"><use href="#icon-plans"></use></svg>
            </div>
        </div>

        <div id="successAnimation" class="success-animation">
            <svg viewBox="0 0 24 24"><use href="#icon-check"></use></svg>
        </div>

        <div id="loaderText" class="loader-title">Verifying plan</div>
        <div id="loaderSubText" class="loader-subtitle">Checking your selected recharge plan…</div>
        <div class="loader-progress"><span></span></div>
    </div>
</div>

<div class="app">
    <header class="header">
        <div class="header-left">
            <div class="brand-mark">
                <img src="https://going.recharge-dhamaka.live/ZeninMedia/phonepe.svg" class="brand-logo" alt="Mobile Recharge">
            </div>

            <div class="brand-text">
                <div class="brand-title">Recharge Plans</div>
                <div class="brand-subtitle">Fast • Secure • Simple</div>
            </div>
        </div>

        <div class="header-actions">
            <button class="header-button" type="button" aria-label="Help">
                <svg viewBox="0 0 24 24"><use href="#icon-help"></use></svg>
            </button>

            <button class="header-button" type="button" aria-label="Notifications">
                <span class="notification-dot"></span>
                <svg viewBox="0 0 24 24"><use href="#icon-bell"></use></svg>
            </button>
        </div>
    </header>

    <section class="subscriber-card">
        <div class="subscriber-left">
            <div class="provider-logo-shell">
                <img src="https://going.recharge-dhamaka.live/ZeninMedia/jio.jpg" class="provider-logo" alt="Jio">
            </div>

            <div class="subscriber-copy">
                <div class="subscriber-label">Selected number</div>
                <div id="mobileDisplay" class="mobile-display"></div>
            </div>
        </div>

        <a class="change-link" href="https://going.recharge-dhamaka.live/">Change</a>
    </section>

    <section class="offer-timer">
        <div class="timer-icon">
            <svg viewBox="0 0 24 24"><use href="#icon-clock"></use></svg>
        </div>

        <div class="timer-text">Special Offer Ends In</div>
        <div id="time" class="timer-value">15:00</div>
    </section>

    <section class="plans-heading-card">
        <div class="plans-heading-left">
            <div class="plans-heading-icon">
                <svg viewBox="0 0 24 24"><use href="#icon-plans"></use></svg>
            </div>

            <div class="plans-heading-copy">
                <div class="plans-heading-title">Best plans for you</div>
                <div class="plans-heading-subtitle">Select a plan to continue</div>
            </div>
        </div>

        <div class="special-pill">
            <svg viewBox="0 0 24 24"><use href="#icon-sparkle"></use></svg>
            SPECIAL
        </div>
    </section>

    <main id="plans-container">
        <div class="plans-status">Loading available recharge plans…</div>
    </main>

    <div class="trust-row">
        <div class="trust-item">
            <svg viewBox="0 0 24 24"><use href="#icon-lock"></use></svg>
            Protected
        </div>

        <div class="trust-item">
            <svg viewBox="0 0 24 24"><use href="#icon-sparkle"></use></svg>
            Instant plans
        </div>

        <div class="trust-item">
            <svg viewBox="0 0 24 24"><use href="#icon-shield"></use></svg>
            Verified
        </div>
    </div>
</div>

<script>
(function () {
    'use strict';

    const storedMobile = localStorage.getItem('numberr') || '';
    const storedDigits = storedMobile.replace(/\D/g, '').slice(0, 10);
    const finalMobile = mobFromUrl && mobFromUrl.length === 10 ? mobFromUrl : storedDigits;

    function formatMobileNumber(number) {
        const digits = String(number || '').replace(/\D/g, '').slice(0, 10);

        if (digits.length <= 5) {
            return digits;
        }

        return digits.slice(0, 5) + ' ' + digits.slice(5);
    }

    const mobileDisplay = document.getElementById('mobileDisplay');

    if (finalMobile) {
        mobileDisplay.textContent = currentProviderName + ' • +91 ' + formatMobileNumber(finalMobile);
    } else {
        mobileDisplay.textContent = currentProviderName + ' recharge';
    }

    const randomMinutes = Math.floor(Math.random() * 6) + 10;
    const timerEnd = Date.now() + (randomMinutes * 60 * 1000);

    function updateCountdown() {
        const timerElement = document.getElementById('time');

        if (!timerElement) {
            return;
        }

        const distance = timerEnd - Date.now();

        if (distance <= 0) {
            timerElement.textContent = 'EXPIRED';
            return;
        }

        const minutes = Math.floor(distance / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.textContent = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);

    function escapeHTML(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    const plansContainer = document.getElementById('plans-container');

    fetch('plans.php?v=' + encodeURIComponent(Date.now()), {
        cache: 'no-store',
        credentials: 'same-origin'
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to load plans');
        }

        return response.json();
    })
    .then(function (data) {
        const plans = Array.isArray(data) ? data : [];

        const filteredPlans = plans.filter(function (plan) {
            return String(plan.operator || '').toLowerCase() === String(currentOperator || '').toLowerCase();
        });

        if (!filteredPlans.length) {
            plansContainer.innerHTML = '<div class="plans-status">No plans found for this operator.</div>';
            return;
        }

        plansContainer.innerHTML = '';

        filteredPlans.forEach(function (plan, index) {
            const amount = parseInt(plan.price, 10) || 0;
            const price = escapeHTML(plan.price);
            const oldPrice = escapeHTML(plan.old_price);
            const validity = escapeHTML(plan.validity);
            const dataValue = escapeHTML(plan.data);
            const voice = escapeHTML(plan.voice);
            const sms = escapeHTML(plan.sms);
            const message = String(plan.data || '') + ' and call ' + String(plan.voice || '') + ' For ' + String(plan.validity || '');
            const messageEncoded = encodeURIComponent(message);
            const animationDelay = Math.min(index * 0.055, 0.35);

            const planHTML = `
                <article class="plan-card" style="animation-delay:${animationDelay}s">
                    <div class="plan-top-row">
                        <div class="new-badge">
                            <svg viewBox="0 0 24 24"><use href="#icon-sparkle"></use></svg>
                            NEW
                        </div>

                        <div class="network-badge">
                            ${escapeHTML(currentProviderName)} PLAN
                        </div>
                    </div>

                    <div class="price-row">
                        <div class="price-left">
                            <div class="plan-price">₹${price}</div>

                            ${
                                oldPrice
                                    ? `<div class="plan-old-price">₹${oldPrice}</div>`
                                    : ''
                            }
                        </div>

                        <img src="${escapeHTML(MAIN_URL + 'ZeninMedia/5g.eec5aabd88995f7798a04639984c429a.svg')}" class="five-g-logo" alt="5G">
                    </div>

                    <div class="plan-grid">
                        <div class="plan-feature">
                            <div class="feature-icon">
                                <svg viewBox="0 0 24 24"><use href="#icon-calendar"></use></svg>
                            </div>
                            <div class="feature-label">Validity</div>
                            <div class="feature-value">${validity}</div>
                        </div>

                        <div class="plan-feature">
                            <div class="feature-icon">
                                <svg viewBox="0 0 24 24"><use href="#icon-data"></use></svg>
                            </div>
                            <div class="feature-label">Data</div>
                            <div class="feature-value">${dataValue}</div>
                        </div>

                        <div class="plan-feature">
                            <div class="feature-icon">
                                <svg viewBox="0 0 24 24"><use href="#icon-call"></use></svg>
                            </div>
                            <div class="feature-label">Voice</div>
                            <div class="feature-value">${voice}</div>
                        </div>

                        <div class="plan-feature">
                            <div class="feature-icon">
                                <svg viewBox="0 0 24 24"><use href="#icon-message"></use></svg>
                            </div>
                            <div class="feature-label">SMS</div>
                            <div class="feature-value">${sms}</div>
                        </div>
                    </div>

                    <button type="button" class="recharge-plan-button" data-amount="${amount}" data-message="${messageEncoded}">
                        <span>Recharge for ₹${price}</span>
                        <svg viewBox="0 0 24 24"><use href="#icon-arrow"></use></svg>
                    </button>
                </article>
            `;

            plansContainer.insertAdjacentHTML('beforeend', planHTML);
        });

        plansContainer.querySelectorAll('.recharge-plan-button').forEach(function (button) {
            button.addEventListener('click', function () {
                const amount = parseInt(button.dataset.amount, 10) || 0;
                let message = '';

                try {
                    message = decodeURIComponent(button.dataset.message || '');
                } catch (error) {
                    message = button.dataset.message || '';
                }

                processRecharge(amount, message, button);
            });
        });
    })
    .catch(function () {
        plansContainer.innerHTML = '<div class="plans-status error">Unable to load recharge plans.</div>';
    });

    const loaderOverlay = document.getElementById('loaderOverlay');
    const loaderCard = document.getElementById('loaderCard');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const successAnimation = document.getElementById('successAnimation');
    const loaderText = document.getElementById('loaderText');
    const loaderSubText = document.getElementById('loaderSubText');

    let verifyTimer = null;
    let redirectTimer = null;
    let paymentRedirecting = false;

    function clearLoaderTimers() {
        if (verifyTimer) {
            clearTimeout(verifyTimer);
            verifyTimer = null;
        }

        if (redirectTimer) {
            clearTimeout(redirectTimer);
            redirectTimer = null;
        }
    }

    function resetLoader() {
        clearLoaderTimers();

        paymentRedirecting = false;

        loaderOverlay.classList.remove('show');
        loaderCard.classList.remove('success');

        loadingAnimation.style.display = 'flex';
        successAnimation.style.display = 'none';

        loaderText.textContent = 'Verifying plan';
        loaderText.style.color = '#111827';
        loaderSubText.textContent = 'Checking your selected recharge plan…';

        document.querySelectorAll('.recharge-plan-button').forEach(function (button) {
            button.disabled = false;
        });
    }

    function showLoader() {
        loaderOverlay.classList.add('show');
    }

    function showSuccess() {
        loaderCard.classList.add('success');

        loadingAnimation.style.display = 'none';
        successAnimation.style.display = 'flex';

        loaderText.textContent = 'Plan verified';
        loaderText.style.color = '#16a34a';
        loaderSubText.textContent = 'Redirecting to secure payment…';

        if (navigator.vibrate) {
            navigator.vibrate(25);
        }
    }

    function processRecharge(amount, message, selectedButton) {
        if (paymentRedirecting) {
            return;
        }

        if (!vpaFromUrl) {
            alert('VPA Not Found');
            return;
        }

        if (!finalMobile) {
            alert('Mobile Number Not Found');
            return;
        }

        if (!amount || amount <= 0) {
            alert('Invalid Recharge Amount');
            return;
        }

        paymentRedirecting = true;

        document.querySelectorAll('.recharge-plan-button').forEach(function (button) {
            button.disabled = true;
        });

        if (selectedButton) {
            selectedButton.disabled = true;
        }

        showLoader();

        verifyTimer = setTimeout(function () {
            showSuccess();
        }, 850);

        redirectTimer = setTimeout(function () {
            const query = new URLSearchParams({
                qpi: vpaFromUrl,
                mobile: finalMobile,
                operator: currentOperator,
                messege: message || '',
                amount: String(amount)
            });

            window.location.assign('payment.php?' + query.toString());
        }, 1500);
    }

    window.addEventListener('pageshow', function () {
        resetLoader();
    });

    window.addEventListener('beforeunload', function () {
        clearInterval(countdownInterval);
        clearLoaderTimers();
    });
})();

document.addEventListener("contextmenu", function(e){ e.preventDefault(); });
document.addEventListener("keydown", function(e){
    if (e.ctrlKey && ["u","U","s","S","c","C","p","P"].includes(e.key)) e.preventDefault();
    if (e.keyCode === 123) e.preventDefault();
});
document.addEventListener("dragstart", function(e){ e.preventDefault(); });
document.addEventListener("selectstart", function(e){ e.preventDefault(); });

window.addEventListener("load", function () {
    setTimeout(hidePageLoader, 100);
});

(function () {
    function sendVisitorCount() {
        var body = new URLSearchParams();
        body.set('page', 'recharge');

        fetch('visitor_ping.php', {
            method: 'POST',
            body: body,
            credentials: 'same-origin',
            cache: 'no-store',
            keepalive: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).catch(function () {
    
        });
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(sendVisitorCount, { timeout: 1200 });
    } else {
        setTimeout(sendVisitorCount, 150);
    }
})();
</script>
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v4513226cdae34746b4dedf0b4dfa099e1781791509496" integrity="sha512-ZE9pZaUXND66v380QUtch/5sE9tPFh2zg45pR2PB0CVkCtOREv2AJKkSidISWkysEuQ0EH8faUU5du78bx87UQ==" data-cf-beacon='{"version":"2024.11.0","token":"5b065845bbee42928bc5109bb8a59684","r":1}' crossorigin="anonymous"></script>
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v31edd6df95cf4e85bb4c19e7a9bdbcba1788362987495" integrity="sha512-iIg7k2xntmwu6/uSb5tpc/hySgZc4eoL31yB29W6tJFo2akwjPWcEqnCEdJvGexCL0KEQwVYv5BlowfhVz26hg==" data-cf-beacon='{"version":"2024.11.0","token":"3becd46812304179b3eb922361328835","r":1,"spa":2}' crossorigin="anonymous"></script>
</body>
</html>