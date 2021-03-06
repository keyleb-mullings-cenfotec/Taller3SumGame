import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Number from "./Number";

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
        startGame();
        return () => clearInterval(intervalId.current);
    }, []);

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
            return 'LOST';
        } else if (sumSelected === target) {
            return 'WON';

        } else {
            return 'PLAYING';
        }
    };

    const startGame = () => {
        const numbers = Array.from({ length: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
        const target = numbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);

        shuffleNumbers(numbers);

        setRandomNumbers(numbers);
        setTarget(target);
        setSelectedNumbers([])
        setRemainingSeconds(initialSeconds);
        intervalId.current = setInterval(() => setRemainingSeconds(seconds => seconds - 1), 1000);
        setGameStatus("PLAYING");
    };

    const shuffleNumbers = (numbersArray) =>{
        numbersArray.sort()
    }

    return (
        <View>
            <Text style={styles.target}>{target}</Text>
            <Text style={[styles.target, styles[gameStatus]]}>{gameStatus}</Text>
            {
                gameStatus !== 'PLAYING' &&
                <Button
                    title="Play Again"
                    onPress={() => startGame()}
                />
            }
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
})