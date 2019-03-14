import * as React from 'react';
import StripeCheckout from './stripe';
class Payment extends React.Component<any, any> {
  onPaymentSuccess = (token: any) => {
    console.log(token);
  };

  onClose = () => {
    console.log('closed');
  };
  render() {
    return (
      <StripeCheckout
        publicKey="pk_test_xQzqRFwNjcpln8MWsGT8TbtH"
        amount={10000}
        imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
        storeName="ishee"
        description="Test"
        currency="USD"
        allowRememberMe={false}
        prepopulatedEmail="emadjumaah@gmail.com"
        onClose={this.onClose}
        onPaymentSuccess={this.onPaymentSuccess}
      />
    );
  }
}

export default Payment;
