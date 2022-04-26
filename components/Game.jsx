import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Number from "./Number";

export default Game = ({ randomNumbersCount }) => {
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [target, setTarget] = useState(0);
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    // No array -> Exc all the time
    // Empty array -> Exc once the first time
    // Full array -> Exc on change
    // Return -> Exc on dismount
useEffect(() => console.log(selectedNumbers), [selectedNumbers]);

    useEffect(() => {
        // Exc
        const numbers = Array.from({ length: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
        const target = numbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);

        setRandomNumbers(numbers);
        setTarget(target);
    }, [])

    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);

    const selectNumber = number => {
        setSelectedNumbers([...selectedNumbers, number]);
        console.log(selectedNumbers, number)
    }

    return (
        <View>
            <Text style={styles.target}>{target}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((number, index) => (
                    <Number
                        key={index}
                        id={index}
                        number={number}
                        isSelected={isNumberSelected(index)}
                        onSelected={selectNumber}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        textAlign: 'center',
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },

})