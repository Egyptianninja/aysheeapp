import * as React from 'react';
import { Platform, WebView } from 'react-native';

interface StripeCheckoutProps {
  publicKey: string;
  amount: number;
  imageUrl: string;
  storeName: string;
  description: string;
  allowRememberMe: boolean;
  onPaymentSuccess: any;
  onClose: any;
  currency?: string;
  prepopulatedEmail?: string;
  style?: object;
}

class StripeCheckout extends React.Component<StripeCheckoutProps, any> {
  static defaultProps = {
    currency: 'USD',
    prepopulatedEmail: ''
  };
  render() {
    const {
      publicKey,
      amount,
      allowRememberMe,
      currency,
      description,
      imageUrl,
      storeName,
      prepopulatedEmail,
      style,
      onPaymentSuccess,
      onClose
    } = this.props;

    const jsCode = `(function() {
                    var originalPostMessage = window.postMessage;
                    var patchedPostMessage = function(message, targetOrigin, transfer) {
                      originalPostMessage(message, targetOrigin, transfer);
                    };
                    patchedPostMessage.toString = function() {
                      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
                    };
                    window.postMessage = patchedPostMessage;
                  })();`;
    return (
      <WebView
        javaScriptEnabled={true}
        scrollEnabled={false}
        bounces={false}
        originWhitelist={['file://']}
        injectedJavaScript={jsCode}
        source={{
          html: `<script src="https://checkout.stripe.com/checkout.js"></script>
            <script>
            var handler = StripeCheckout.configure({
              key: '${publicKey}',
              image: '${imageUrl}',
              locale: 'auto',
              token: function(token) {
                window.postMessage(token.id, token.id);
              },
            });
            window.onload = function() {
              handler.open({
                image: '${imageUrl}',
                name: '${storeName}',
                description: '${description}',
                amount: ${amount},
                currency: '${currency}',
                allowRememberMe: ${allowRememberMe},
                email: '${prepopulatedEmail}',
                closed: function() {
                  window.postMessage("WINDOW_CLOSED", "*");
                }
              });
            };
            </script>`,
          baseUrl: ''
        }}
        onMessage={event =>
          event.nativeEvent.data === 'WINDOW_CLOSED'
            ? onClose()
            : onPaymentSuccess(event.nativeEvent.data)
        }
        style={[{ flex: 1 }, style]}
        scalesPageToFit={Platform.OS === 'android'}
      />
    );
  }
}

export default StripeCheckout;
