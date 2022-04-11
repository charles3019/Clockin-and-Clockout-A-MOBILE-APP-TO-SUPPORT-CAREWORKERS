import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ShiftTimeStamps = props => {
// for (const key in resData)
// const testStamps = props.StimeStamps;
// console.log("test: ", testStamps);
// for (let index = 0; index < testStamps.length; index++) {
//     const element = testStamps[index];
    // console.log("e", props.inTime);
    
// }
    return (
        // <ScrollView>
            <View>
            {
                
            <View style ={styles.table}>
            {/* <Text>
                {"#"}
            </Text> */}
            {/* style = {{width:'40%'}} */}
            <Text>
                {props.inTime}
            </Text>
            <Text>
                {props.outTime}
            </Text>

            </View>
            }

        </View>
        
        //</ScrollView>

    //   <Card style={styles.product}>
    //     <View style={styles.touchable}>
    //       <TouchableCmp onPress={props.onSelect} useForeground>
    //         <View>
    //           <View style={styles.imageContainer}>
    //             <Image style={styles.image} source={{ uri: props.image }} />
    //           </View>
    //           <View style={styles.details}>
    //             <Text style={styles.title}>{props.title}</Text>
    //             {/* .toFixed(2) */}
    //             <Text style={styles.price}>${props.price}</Text>
    //           </View>
    //           <View style={styles.actions}>
    //             {props.children}
    //           </View>
    //         </View>
    //       </TouchableCmp>
    //     </View>
    //   </Card>
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