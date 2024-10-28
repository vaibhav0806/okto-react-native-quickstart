import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button,
  View,
  Text,
  Modal,
  ScrollView
} from 'react-native';
import GoogleSignInButton from './components/GoogleSignInButton';
import { User } from '@react-native-community/google-signin';
import { useOkto, type OktoContextType } from 'okto-sdk-react-native';
import GetButton from './components/GetButton';
import TransferTokens from './components/TransferTokens';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authResult, setAuthResult] = useState<string>('');

  const {
    authenticate,
    getPortfolio,
    getSupportedNetworks,
    getSupportedTokens,
    getUserDetails,
    getWallets,
    createWallet,
    orderHistory,
    getNftOrderDetails,
  } = useOkto() as OktoContextType;

  function handleAuthenticate(result: any, error: any) {
    if (result) {
      console.log('authentication successful');
      setAuthResult(JSON.stringify(result, null, 2));
      setAuthModalVisible(true);
    }
    if (error) {
      console.error('authentication error:', error);
      setAuthResult(JSON.stringify(error, null, 2));
      setAuthModalVisible(true);
    }
  }

  const handleSignInSuccess = (userInfo: User | null) => {
    setUserInfo(userInfo);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Okto Demo App</Text>

          {/* Authentication Section */}
          <View style={styles.authSection}>
            <View style={styles.buttonGroup}>
              <GoogleSignInButton onSignInSuccess={handleSignInSuccess} />
              <View style={styles.buttonSpacing} />
              <Button
                title="Authenticate"
                onPress={() => {
                  authenticate(userInfo?.idToken!, handleAuthenticate);
                }}
              />
            </View>
          </View>

          {/* API Section */}
          <View style={styles.apiSection}>
            <Text style={styles.sectionTitle}>API Actions</Text>
            <GetButton title="Get Portfolio" apiFn={getPortfolio} />
            <GetButton title="Get Supported Networks" apiFn={getSupportedNetworks} />
            <GetButton title="Get Supported Tokens" apiFn={getSupportedTokens} />
            <GetButton title="Get User Details" apiFn={getUserDetails} />
            <GetButton title="Get Wallets" apiFn={getWallets} />
            <GetButton title="Create Wallet" apiFn={createWallet} />
            <GetButton title="Order History" apiFn={orderHistory} />
            <GetButton
              title="Get Nft Order Details"
              apiFn={() => getNftOrderDetails({})}
            />
          </View>

          {/* Transfer Tokens Section */}
          <TransferTokens />
        </ScrollView>

        {/* Authentication Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={authModalVisible}
          onRequestClose={() => {
            setAuthModalVisible(false);
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Authentication Result</Text>
            </View>
            <ScrollView style={styles.modalContent} nestedScrollEnabled={true}>
              <Text style={styles.modalText}>{authResult}</Text>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button
                title="Close"
                onPress={() => setAuthModalVisible(false)}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  authSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  buttonGroup: {
    width: '100%',
  },
  buttonSpacing: {
    height: 15,
  },
  apiSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#333',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default App;