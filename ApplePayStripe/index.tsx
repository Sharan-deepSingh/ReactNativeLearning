import {
    confirmPlatformPayPayment,
    isPlatformPaySupported,
    PlatformPay,
    PlatformPayButton,
    StripeProvider
} from '@stripe/stripe-react-native';
import { 
    useState 
} from 'react';
import { 
    Text 
} from 'react-native';
import styles from './styles';

interface ApplePayButtonComponent {
    publishableKey: string;
    merchantIdentifier: string;
    clientSecret: string;
    merchantCountryCode: string;
    currencyCode: string;
    itemLabel: string;
    itemAmount: string;
    payentType: PlatformPay.PaymentType;
} 

function ApplePayButton() {
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);

    const ApplePayButton = () => {
        return isApplePaySupported ? (
            <StripeProvider
                publishableKey="pk_test_51RHPH0FZGgl6mfV8hQcOnNDBfvXzRV2dkEtdn6LYhefricGZM85qtMyIkLvYmnlGtDCgmVxNfi4diWirHszw9Wgb001e8GfaHS"
                merchantIdentifier="merchant.com.reactnativelearning"
            >
                <PlatformPayButton
                    onPress={() => {
                        initiatePaymentViaApplePay();
                    }}
                    type={PlatformPay.ButtonType.InStore}
                    style={{ height: 45, width: '90%', marginTop: 30 }}
                />
            </StripeProvider>
        ) : (
            <Text style={styles.paymentOptionNotAvailable}> Pay is unavailable ❌</Text>
        )
    }

    const initiatePaymentViaApplePay = async () => {
        try {
            const res = await fetch('http://localhost:3001/payment_intent', {
                method: 'POST',
            });
            const data = await res.json();
            const clientSecret = data.client_secret;

            const { error } = await confirmPlatformPayPayment(clientSecret, {
                applePay: {
                    cartItems: [
                        {
                            label: 'Test Item',
                            amount: '10.00',
                            paymentType: PlatformPay.PaymentType.Immediate,
                        },
                    ],
                    merchantCountryCode: 'CA',
                    currencyCode: 'CAD',
                },
            });

            if (error) {
                console.error('Payment failed', error);
            } else {
                console.log('Payment successful');
            }
        } catch (err) {
            console.error('Fetch error', err);
        }
    }
}
