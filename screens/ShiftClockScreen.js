import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { SHIFTS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const ShiftClockScreen = props => {
    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = SHIFTS.find(meal => meal.id === mealId);

    return (
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Button
                title="Go Back to Available Shifts"
                onPress={() => {
                    props.navigation.popToTop();
                }}
            />
        </View>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = SHIFTS.find(meal => meal.id === mealId);
    return {
        headerTitle: selectedMeal.title,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Favorite"
                    iconName="ios-star"
                    onPress={() => {
                        console.log('Mark as favorite!');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default ShiftClockScreen;