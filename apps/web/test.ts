// Install with: npm i flutterwave-node-v3

import Flutterwave from 'flutterwave-node-v3';
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const payload = {
    phone_number: '054709929220',
    network: "MTN",
    amount: 1500,
    currency: 'UGX',
    email: 'JoeBloggs@acme.co',
    tx_ref: "123456",
}
flw.MobileMoney.uganda(payload)
  .then(console.log)
  .catch(console.log);