import {
    isPlatformPaySupported,
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
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ApplePayButton, { ApplePayButtonType } from './ApplePayStripe';
import MerchantCountryCode from './ApplePayStripe/merchantCountryCodes';
import CurrencyCode from './ApplePayStripe/currencyCodes';

function App() {
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%'], []);
    const publishableKey = "pk_test_51RHPH0FZGgl6mfV8hQcOnNDBfvXzRV2dkEtdn6LYhefricGZM85qtMyIkLvYmnlGtDCgmVxNfi4diWirHszw9Wgb001e8GfaHS"
    const merchantIdentifier = "merchant.com.reactnativelearning"
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        const checkApplePaySupport = async () => {
            const supported = await isPlatformPaySupported();
            setIsApplePaySupported(supported);
        };

        checkApplePaySupport();
        getclientSecret();
    }, [])

    const getclientSecret = async () => {
        const res = await fetch('http://localhost:3001/payment_intent', {
            method: 'POST',
        });
        const data = await res.json();
        setClientSecret(data.client_secret)
        console.log('client secret is inside get', data.client_secret);
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
                onPress={async () => {
                    setIsBottomSheetOpen(true)
                    bottomSheetRef.current?.snapToIndex(0);
                    await getclientSecret();
                    console.log('client secret is', clientSecret);
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
                    <ApplePayButton 
                        publishableKey={publishableKey}
                        merchantIdentifier={merchantIdentifier}
                        clientSecret={clientSecret}
                        merchantCountryCode={MerchantCountryCode.CA}
                        currencyCode={CurrencyCode.INR}
                        itemLabel="Test Item"
                        itemAmount="10.00"
                        buttonType={ApplePayButtonType.Default}
                        response={(error, response) => {
                            if (error) {
                                console.error('Payment failed', error);
                            } else {
                                console.log('Payment successful', response);
                            }
                        }}
                    />
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
