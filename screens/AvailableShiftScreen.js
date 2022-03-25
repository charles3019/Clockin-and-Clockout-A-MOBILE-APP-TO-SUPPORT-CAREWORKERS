import React from 'react';
import {
    FlatList,
    StyleSheet,
} from 'react-native';

const AvailableShiftScreen = props => {
    const renderGridItem = itemData => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'ShiftDetails',
                        params: {
                            categoryId: itemData.item.id
                        }
                    });
                }}
            />
        );
    };

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};


AvailableShiftScreen.navigationOptions = {
    headerTitle: 'Available Shifts'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AvailableShiftScreen;