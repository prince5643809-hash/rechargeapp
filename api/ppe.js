export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { amount = '349.00', text = 'Recharge', mobile = '9876543210', vpa = 'paytmqr6udcnp@ptys' } = req.query;
  const name = 'Recharge Offers';

  const amountInPaise = Math.round(parseFloat(amount) * 100);
  const txn = 'TXN-' + Math.floor(100000000000 + Math.random() * 900000000000);

  const payload = {
    p2pPaymentCheckoutParams: {
      checkoutType: 'COLLECT',
      initialAmount: amountInPaise,
      note: {
        type: 'text',
        message: txn
      },
      supportedInstruments: -1
    },
    contact: {
      type: 'EXTERNAL_MERCHANT',
      name: name,
      vpa: vpa
    }
  };

  const b64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const deeplinkNative = 'phonepe://native?data=' + b64 + '&id=p2ppayment';
  const canonical = 'pa=' + encodeURIComponent(vpa).replace(/%40/g, '@') +
    '&pn=' + encodeURIComponent(name).replace(/\+/g, '%20') +
    '&am=' + parseFloat(amount).toFixed(2) +
    '&cu=INR&tn=' + encodeURIComponent(text).replace(/\+/g, '%20');

  const deeplinkIntent = 'intent://pay?' + canonical + '#Intent;scheme=upi;package=com.phonepe.app;end';
  const upiLink = 'upi://pay?' + canonical;

  res.status(200).json({
    success: true,
    upi_link: upiLink,
    deeplink_native: deeplinkNative,
    deeplink_intent: deeplinkIntent
  });
}
