import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Number from "./Number";

export default Game = ({ randomNumbersCount, initialSeconds }) => {
    const [randomNumbers, setRandomNumbers] = useState([0,0,0,0,0,0]);
    const [target, setTarget] = useState();
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
    const [gameStatus, setGameStatus] = useState('PLAYING');
    let intervalId;
    const [startPlayButtonVisible, setStartPlayButtonVisible] = useState(false);

    
      useEffect(() => {
        if (startPlayButtonVisible) {   
        intervalId = setInterval(() => setRemainingSeconds(seconds => seconds - 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [remainingSeconds, startPlayButtonVisible]);
    

    useEffect(() => {
        setGameStatus(() => getGameStatus());
        if (remainingSeconds === 0 || gameStatus !== 'PLAYING') {
            clearInterval(intervalId);

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

    const setInitState = () => {
        clearInterval(intervalId);
        intervalId = null;
        const numbers = Array.from({ length: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
        const target = numbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);
        setRandomNumbers(numbers);
        setTarget(target);
        setSelectedNumbers([])
        setRemainingSeconds(initialSeconds);
        setGameStatus("PLAYING");
        setStartPlayButtonVisible(true);
    };

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
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
            <View style={{flex: 1}}>
               
                <Button
                style={styles.PlayAgainButton}
                title="PLAY"
                onPress={() => setInitState()}
            /> 
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
    playAgainButton: {
        width: 'auto',
        marginHorizontal: 15,
        marginVertical: 300,
        fontSize: 50,
        textAlign: 'center',
    }
})