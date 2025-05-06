import {
    confirmPlatformPayPayment,
    isPlatformPaySupported,
    PlatformPay,
    PlatformPayButton,
    StripeProvider,
    } from '@stripe/stripe-react-native';
  import React, { useEffect, useState } from 'react';
  import { Text, StyleProp, ViewStyle } from 'react-native';
  import styles from './styles';
import CurrencyCode from './currencyCodes';
import MerchantCountryCode from './merchantCountryCodes';
  
  export enum ApplePayButtonType {
    Default = 'Default',
    Buy = 'buy',
    Donate = 'donate',
    Checkout = 'checkout',
    Book = 'book',
    Subscribe = 'subscribe',
  }
  
  interface ApplePayButtonProps {
    publishableKey: string;
    merchantIdentifier: string;
    clientSecret: string;
    merchantCountryCode: MerchantCountryCode;
    currencyCode: CurrencyCode;
    itemLabel: string;
    itemAmount: string;
    buttonType?: ApplePayButtonType;
    style?: StyleProp<ViewStyle>;
    response: (error: any, response: string) => void;
  }
  
  const ApplePayButton: React.FC<ApplePayButtonProps> = ({
    publishableKey,
    merchantIdentifier,
    clientSecret,
    merchantCountryCode,
    currencyCode,
    itemLabel,
    itemAmount,
    buttonType = ApplePayButtonType.Buy,
    style,
    response,
  }) => {
    const [isSupported, setIsSupported] = useState(false);
  
    useEffect(() => {
      isPlatformPaySupported().then(setIsSupported);
    }, []);
  
    const initiatePaymentViaApplePay = async () => {
      try {
        const { error } = await confirmPlatformPayPayment(clientSecret, {
          applePay: {
            cartItems: [
              {
                label: itemLabel,
                amount: itemAmount,
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            merchantCountryCode,
            currencyCode,
          },
        });
  
        if (error) {
          response(error, 'failed');
        } else {
          console.log('Payment successful');
          response(null, 'success');
        }
      } catch (err: any) {
        console.error('Exception during payment', err);
        response(err, '');
      }
    };
  
    const mapButtonType = (type: ApplePayButtonType): PlatformPay.ButtonType => {
      switch (type) {
        case ApplePayButtonType.Default:
          return PlatformPay.ButtonType.Default;
        case ApplePayButtonType.Donate:
          return PlatformPay.ButtonType.Donate;
        case ApplePayButtonType.Checkout:
          return PlatformPay.ButtonType.Checkout;
        case ApplePayButtonType.Book:
          return PlatformPay.ButtonType.Book;
        case ApplePayButtonType.Subscribe:
          return PlatformPay.ButtonType.Subscribe;
        case ApplePayButtonType.Buy:
        default:
          return PlatformPay.ButtonType.Buy;
      }
    };
  
    return isSupported ? (
      <StripeProvider publishableKey={publishableKey} merchantIdentifier={merchantIdentifier}>
        <PlatformPayButton
          onPress={initiatePaymentViaApplePay}
          style={style || { height: 45, width: '90%', marginTop: 30 }}
          type={mapButtonType(buttonType)}
        />
      </StripeProvider>
    ) : (
      <Text style={styles.paymentOptionNotAvailable}> Pay is unavailable ❌</Text>
    );
  };
  
  export default ApplePayButton;
  