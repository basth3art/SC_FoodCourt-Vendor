import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react';
import { Text } from "~/components/ui/text";
import Page from "~/components/page";
import { scale } from 'react-native-size-matters';
import { StatusBar,Pressable , Modal, TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '~/components/header'

interface TransactionProps {
    type: 'Payout' | 'Order Income';
    amount: string;
    date: string;
    description: string;
  }
  
  const Transaction: React.FC<TransactionProps> = ({ type, amount, date, description }) => (
    <View>
    <View style={styles.transaction}>
      <View style={styles.transactionIcon}>
        <Ionicons 
          name={type === 'Payout' ? 'arrow-up' : 'arrow-down'} 
          size={24} 
          color={type === 'Payout' ? '#FF3B30' : 'green'} 
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{type}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
        <Text style={styles.transactionDescription}>{description}</Text>
      </View>
      <Text style={styles.transactionAmount}>N {amount}</Text>
      
    </View>
    <View style = {styles.seperator}></View>
    </View>
  );
  



export default function walletPage() {

const router = useRouter()
const [modalVisible, setModalVisible] = React.useState(false); // State for modal visibility
const [withdrawAmount, setWithdrawAmount] = React.useState(''); // State for input amount

return (
  <Page>
      <StatusBar backgroundColor="#FF3B30" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
      <View style={styles.walletHeader}>
        {/* <Text style={styles.walletTitle}>Wallet</Text> */}
        <Header  headerTitle='Wallet' rightIcon = {true} style = "light" />
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>NGN 3,000,000</Text>
            <TouchableOpacity style= {styles.eyeicon}>
              <Ionicons name="eye-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.lastUpdated}>Last Updated on 26-8-2023 by 12:30pm</Text>
          <Pressable 
            style={styles.withdrawButton} 
            onPress={() => setModalVisible(true)} // Open modal on press
          >
            <Ionicons name="cash-outline" size={24} color="white" style={styles.withdrawIcon} />
            <Text style={styles.withdrawText}>Withdraw</Text>
          </Pressable>
                  {/* Modal for withdrawal */}
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Close modal
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Withdraw Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount} // Update state on input change
                />
                 <Pressable 
                style={styles.submitButton} 
                onPress={() => {
                  // Handle withdrawal logic here
                  setModalVisible(false); // Close modal after submission
                }}
              >
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
              <Pressable 
                style={styles.cancelButton} 
                onPress={() => setModalVisible(false)} // Close modal
              >
                 <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

              
        </View>
        <View style={styles.pagination}>
          <View style={[styles.paginationDot, styles.activeDot]} />
          <View style={styles.paginationDot} />
        </View>
      </View>
      
      <View style={styles.transactionContainer}>
        <Pressable style = {styles.handle} onPress = {() => router.push("/admin/wallet/transhistory")}></Pressable>
        <Pressable onPress={() => router.push("/admin/wallet/transhistory")}>
        <Text style={styles.transactionTitle}>Transaction History</Text>
       </Pressable>
        <ScrollView>
          <Transaction 
            type="Payout"
            amount="3,000,000"
            date="24 Aug 2023"
            description="Earnings from 17 Aug 2023 to 23 Aug 2023"
          />
          <Transaction 
            type="Order Income"
            amount="3,000"
            date="24 Aug 2023"
            description="Received payment for order #12345"
          />
          <Transaction 
            type="Order Income"
            amount="3,000"
            date="24 Aug 2023"
            description="Received payment for order #12345"
          />
          <Transaction 
            type="Order Income"
            amount="3,000"
            date="24 Aug 2023"
            description="Received payment for order #12345"
          />
          <Transaction 
            type="Payout"
            amount="3,000,000"
            date="24 Aug 2023"
            description="Earnings from 17 Aug 2023 to 23 Aug 2023"
          />
        </ScrollView>
      </View>

   

    </SafeAreaView>
    </Page>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FF3B30',
    },
    
    eyeicon: {
        position: 'absolute',
        right: scale(-70)
        ,
    },
    walletHeader: {
      padding: 20,
      paddingLeft: 10,
    },
    walletTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    balanceContainer: {
      marginBottom: 20,
      marginTop: 15,
      
      alignItems: 'center',
    },
    balanceLabel: {
      fontSize: 18,
      color: 'white',
      marginBottom: 10,
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    balanceAmount: {
       
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      paddingTop:10,

    },
    lastUpdated: {
      fontSize: 12,
      color: 'white',
      marginTop: 5,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: 'white',
    },
    transactionContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    handle:{
        marginTop: scale(-10),
        width: scale(60),
        backgroundColor: "#FF3B30",
        height: scale(10),
        alignSelf: "center",
        borderRadius : 30,
        marginBottom: scale(10)


    }, 
    transactionTitle: {
        alignSelf:"center",
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    transaction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0,
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionType: {
      fontWeight: 'bold',
    },
    transactionDate: {
      fontSize: 12,
      color: '#888',
    },
    transactionDescription: {
      fontSize: 12,
      color: '#888',
    },
    transactionAmount: {
      fontWeight: 'bold',
    },
    seperator: {
        marginVertical: scale(10),
        height: scale(1),
        backgroundColor: "#E0E0E0",
    },
    withdrawButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FF3B30', // Adjust as needed
          padding: 10,
          borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 20,
          
        },
        withdrawIcon: {
          marginRight: 5,
        },
        withdrawText: {
          color: 'white',
          fontSize: 16,
        },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    submitButton: {
      backgroundColor: '#FF3B30',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    submitText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cancelButton: {
      marginTop: 10,
      padding: 10,
    },
    cancelText: {
      color: '#FF3B30',
    },
  });
