import {
    confirmPlatformPayPayment,
    isPlatformPaySupported,
    PlatformPay,
    PlatformPayButton,
    StripeProvider
} from '@stripe/stripe-react-native';
import {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

function App() {
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%'], []);

    useEffect(() => {
        const checkApplePaySupport = async () => {
            const supported = await isPlatformPaySupported();
            setIsApplePaySupported(supported);
        };

        checkApplePaySupport();
    }, [])


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
    }

    const StripePayButton = () => {
        return (
            <TouchableOpacity style={styles.stripeButton}>
                <Text style={styles.stripeButtonText}>Pay with Stripe</Text>
            </TouchableOpacity>
        )
    }

    return (
        <GestureHandlerRootView style={[styles.container, isBottomSheetOpen ? { backgroundColor: 'gray' } : {}]}>
            <TouchableOpacity
                style={styles.selectPaymentOption}
                onPress={() => {
                    setIsBottomSheetOpen(true)
                    bottomSheetRef.current?.snapToIndex(0);
                }}
            >
                <Text style={styles.selectPaymentOptionText}>Select Payment Option</Text>
            </TouchableOpacity>

            <BottomSheet
                style={styles.bottomSheet}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose={true}
                onChange={(index) => {
                    if (index === -1) {
                        setIsBottomSheetOpen(false)
                    }
                }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <ApplePayButton />
                    <StripePayButton />
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheet: {
    },
    selectPaymentOption: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    selectPaymentOptionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stripeButton: {
        backgroundColor: '#6963FF',
        width: '90%',
        height: 45,
        marginTop: 20,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stripeButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    paymentOptionNotAvailable: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30
    }
});

export default App;
