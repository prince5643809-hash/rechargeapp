<?php
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Access-Control-Allow-Origin: *');

$amount = isset($_GET['amount']) ? $_GET['amount'] : '349.00';
$text = isset($_GET['text']) ? $_GET['text'] : 'Verified Paytm Merchant';
$mobile = isset($_GET['mobile']) ? $_GET['mobile'] : '9876543210';
$vpa = isset($_GET['vpa']) && !empty($_GET['vpa']) ? $_GET['vpa'] : 'paytmqr6udcnp@ptys';
$name = 'Paytm';

$amountInPaise = round(floatval($amount) * 100);
$txn = 'Verified Paytm Merchant';

$payload = [
    'p2pPaymentCheckoutParams' => [
        'checkoutType' => 'COLLECT',
        'initialAmount' => $amountInPaise,
        'note' => [
            'type' => 'text',
            'message' => $txn
        ],
        'supportedInstruments' => -1
    ],
    'contact' => [
        'type' => 'EXTERNAL_MERCHANT',
        'name' => $name,
        'vpa' => $vpa
    ]
];

$b64 = base64_encode(json_encode($payload));
$deeplinkNative = 'phonepe://native?data=' . $b64 . '&id=p2ppayment';
$canonical = 'pa=' . urlencode($vpa) . '&pn=' . urlencode($name) . '&am=' . number_format(floatval($amount), 2, '.', '') . '&cu=INR&tn=' . urlencode($text);
$canonical = str_replace('%40', '@', $canonical);
$canonical = str_replace('+', '%20', $canonical);

$deeplinkIntent = 'intent://pay?' . $canonical . '#Intent;scheme=upi;package=com.phonepe.app;end';
$upiLink = 'upi://pay?' . $canonical;

echo json_encode([
    'success' => true,
    'upi_link' => $upiLink,
    'deeplink_native' => $deeplinkNative,
    'deeplink_intent' => $deeplinkIntent
]);
