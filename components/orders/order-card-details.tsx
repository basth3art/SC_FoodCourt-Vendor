

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import OrderCardName from './order-card-name';
import { globalStyles } from '../../constants/Styles';
 import utilityStyles from '../../utils/styles';
import { CountdownTimer } from './CountdownTimer';
 

interface OrderCardDetailsProps {
       showTime?: boolean
       isPreparing?: boolean
     
      
     }

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  type: string;
}

const AccordionItem = ({ title, children } : AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
      </TouchableOpacity>
     
      {isOpen && <View style={styles.accordionContent}>
        {(title === "Food" || title === "Drinks")  &&(<View style={styles.labelsRow}>
            <Text style={[styles.label, styles.labelItem]}>Item</Text>
            <Text style={[styles.label,styles.labelQty]}>Qty</Text>
            <Text style={[styles.label,styles.labelPrice]}>Price</Text>
    </View>)}{children}</View>}
    </View>
  );
};

export default function OrderCardDetails({ showTime, isPreparing , } : OrderCardDetailsProps ) {
  const orderItems = [
    { name: 'Sharwizzy', quantity: 1, price: 1600, type: 'food' },
    { name: 'Jollof rice Jumbo', quantity: 1, price: 1800, type: 'food' },
    { name: 'pasta', quantity: 2, price: 3000, type: 'food' },
    { name: 'Classic Lemonade', quantity: 1, price: 1200, type: 'drink' },
  ];

  const foodItems = orderItems.filter(item => item.type === 'food');
  const drinkItems = orderItems.filter(item => item.type === 'drink');

  const renderOrderItem = (item : OrderItem) => (
    <View key={item.name} style={styles.orderItem}>
    <Text style={styles.itemName}>{item.name}</Text>
    
    <Text style={styles.itemQuantity}>{item.quantity}</Text>
    <Text style={styles.itemPrice}>N{item.price.toFixed(2)}</Text>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <OrderCardName />
      
      

      <AccordionItem title="Food">
        {foodItems.map(renderOrderItem)}
      </AccordionItem>

      <AccordionItem title="Drinks">
        {drinkItems.map(renderOrderItem)}
      </AccordionItem>

      <AccordionItem title="Order Notes">
        <Text>Nb additional notes for this order.</Text>
      </AccordionItem>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>N8700.34</Text>
      </View>

      {showTime && (
        <CountdownTimer  initialPreparationTime={360} orderId = "1" isPreparing ={isPreparing}  />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7E7E7E',
    backgroundColor: '#FFF5F5',
    padding: 16,
  },
 
  label: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: "grey"
  },
  labelsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  labelItem: {
    textAlign: 'left',
   flex: 1,
  },
  labelQty: {
    textAlign: 'center',
    
    flex: 1,
  },
  labelPrice: {
    textAlign: 'center',
    flex: 1,
    
  },
  accordionItem: {
    marginBottom: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#7E7E7E',
  },
  accordionTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
  },
  accordionContent: {
    paddingTop: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    flex: 2,
    fontFamily: 'Montserrat',
    fontSize: 14,
    
  },

  // itemDetails:{
  //   flexDirection: "row",
  // },
 
  itemQuantity: {
    flex: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginRight: 50,
    textAlign: 'center',
   
  },
  itemPrice: {
    // flex: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',

    
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#7E7E7E',
  },
  totalLabel: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
  },
  orderCompletedTime: {
    marginTop: 16,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    backgroundColor: '#d9d9d9',
    color: 'black',
    alignSelf: 'flex-end',
  },
});