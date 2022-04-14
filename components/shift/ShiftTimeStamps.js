import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ShiftTimeStamps = props => {
    return (
            <View>
            {
                
            <View style ={styles.table}>
            <Text>
                {props.inTime}
            </Text>
            <Text>
                {props.outTime}
            </Text>

            </View>
            }

        </View>
    );
  };
  
  const styles = StyleSheet.create({
    table:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    product: {
      height: 300,
      margin: 20
    },
    touchable: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '17%',
      padding: 10
    },
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      marginVertical: 2
    },
    price: {
      fontFamily: 'open-sans',
      fontSize: 14,
      color: '#888'
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '23%',
      paddingHorizontal: 20
    }
  });
  
  export default ShiftTimeStamps;