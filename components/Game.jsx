import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Number from "./Number";
import App from "../App";
import PlayAgainButton from "./PlayAgainButton";

export default Game = ({ randomNumbersCount, initialSeconds }) => {
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [target, setTarget] = useState();
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
    const [gameStatus, setGameStatus] = useState('PLAYING');

    const intervalId = useRef();
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

        intervalId.current = setInterval(() => setRemainingSeconds(seconds => seconds - 1), 1000);
        return () => clearInterval(intervalId.current);
    }, []);

    // useEffect(()=>{
    //     if (remainingSeconds === 0) {
    //         clearInterval(intervalId.current);
    //     }
    // }, [remainingSeconds]);

    useEffect(() => {
        setGameStatus(() => getGameStatus());
        if (remainingSeconds === 0 || gameStatus !== 'PLAYING') {
            clearInterval(intervalId.current);

        }
    }, [remainingSeconds, selectedNumbers]);

    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
    const selectNumber = number => {
        setSelectedNumbers([...selectedNumbers, number]);
    }
    const getGameStatus = () => {
        const sumSelected = selectedNumbers.reduce((acc, cur) => acc + randomNumbers[cur], 0);
        if (remainingSeconds === 0 || sumSelected > target) {
            // PlayAgainButton.styles.random = 'contents';
            // styles.playAgainButton.display = 'flex';
            return 'LOST';
        } else if (sumSelected === target) {
            return 'WON';

        } else {
            return 'PLAYING';
        }
    };
    // const status = gameStatus();

    return (
        <View>
            <Text style={styles.target}>{target}</Text>
            <Text style={[styles.target, styles[gameStatus]]}>{gameStatus}</Text>
            <Text>{remainingSeconds}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((number, index) => (
                    <Number
                        key={index}
                        id={index}
                        number={number}
                        isSelected={isNumberSelected(index) || gameStatus !== 'PLAYING'}
                        onSelected={selectNumber}
                    />
                ))}
            </View>
            <View>
                <PlayAgainButton style={[styles.playAgainButton]}></PlayAgainButton>
            </View>
            {/* <Button
                style={styles.PlayAgainButton}
                title="Play Again"
                onPress={() => App()}
                onPress={() => Alert.alert('Simple Button pressed')}
            /> */}
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
    PLAYING: {
        backgroundColor: 'gray'
    },
    LOST: {
        backgroundColor: 'red'
    },
    WON: {
        backgroundColor: 'green'
    },
    // playAgainButton: {
    //     backgroundColor: '#40B4C1',
    //     color: '#fff',
    //     width: 'auto',
    //     marginHorizontal: 15,
    //     marginVertical: 300,
    //     fontSize: 50,
    //     textAlign: 'center',
        // display: 'none',
        // minHeight: 45,
    // }
})