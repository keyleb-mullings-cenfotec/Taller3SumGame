import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import App from "../App";

export default PlayAgainButton = ({ isSelected, onSelected }) => {
    const handlePress = () => {
        // console.info(number);
        if (isSelected) {
            // onSelected();
            App();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            {/* <Text style={[styles.random, isSelected && styles.selected]}>Play Again</Text> */}
            <Text style={[styles.random,isSelected]}>Play Again</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#40B4C1',
        color: '#fff',
        width: 'auto',
        marginHorizontal: 15,
        marginVertical: 300,
        fontSize: 50,
        textAlign: 'center',
        // display: 'none',
        // minHeight: 45,
    },
    selected: {
        opacity: 0.3,
    }
});