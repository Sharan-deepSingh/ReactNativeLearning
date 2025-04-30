import React, { useEffect, useState } from 'react';
import { confirmPlatformPayPayment, isPlatformPaySupported, PlatformPay, PlatformPayButton, StripeProvider } from '@stripe/stripe-react-native';
import {
    Text,
    View,
} from 'react-native';

function App() {
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        console.log("running useEffect");
        const checkApplePaySupport = async () => {
            const supported = await isPlatformPaySupported();
            setIsApplePaySupported(supported);
        };

        checkApplePaySupport();
    }, [])


    return (
        <View>
            <StripeProvider
                publishableKey="pk_test_51RHPH0FZGgl6mfV8hQcOnNDBfvXzRV2dkEtdn6LYhefricGZM85qtMyIkLvYmnlGtDCgmVxNfi4diWirHszw9Wgb001e8GfaHS"
                merchantIdentifier="merchant.com.reactnativelearning"
            >
                <View>
                    {isApplePaySupported ? (
                        <View style={{ marginTop: 50 }}>
                            <Text>Apple Pay is supported</Text>

                            <PlatformPayButton
                                onPress={async () => {
                                    try {
                                        const res = await fetch('http://localhost:3001/payment_intent', {
                                            method: 'POST',
                                          });
                                        const data = await res.json();
                                        const clientSecret = data.client_secret;
                                        console.log('Client secret is here', clientSecret)

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
                                }}
                                type={PlatformPay.ButtonType.InStore}
                                style={{ width: 200, height: 44 }}
                            />

                            {clientSecret && <Text>{clientSecret}</Text>}

                        </View>
                    ) : (
                        <View style={{ marginTop: 50 }}>
                            <Text>Apple Pay is not supported</Text>
                        </View>
                    )}

                </View>
            </StripeProvider>
        </View>
    );
}

export default App;
