import 'react-native-gesture-handler';
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

//JS
export default class App extends Component {

    constructor() {
        super()
        this.state = {
            resultText: "0",
            operationText: "",
        }
        this.operations = ['C', '↑', '+', '-', '*', '/']
    }

    calculateResult() {
        this.setState({
            operationText: "= " + eval(this.state.resultText)
        })
    }

    buttonPressed(text) {
        if (text == '=') {
            const lastChar = this.state.resultText.split('').pop()
            if (isNaN(lastChar)) return
            this.calculateResult()
            this.setState({
                resultText: "0"
            })

        } else {
            if (this.state.resultText == "0") {
                this.setState({
                    resultText: text + ""
                })
            } else {
                if (text == '.') {
                    const lastChar = this.state.resultText.split('').pop()
                    //problema non puoi mettere più punti in un'espressione
                    if (lastChar == '.' || this.state.resultText.indexOf(".") != -1) return
                }
                this.setState({
                    resultText: this.state.resultText + text,
                })
            }
        }
    }

    operate(operation) {
        switch (operation) {

            case 'C':
                this.setState({
                    resultText: "0"
                })
                break;

            case '↑':
                if (this.state.resultText == "0" && this.state.operationText != "") {
                    this.state.operationText = this.state.operationText.substring(1);
                    this.setState({
                        resultText: this.state.operationText,
                        operationText: "0"
                    })
                }
                break;

            case '+':
            case '-':
            case '*':
            case '/':

                const lastChar = this.state.resultText.split('').pop()

                if (this.operations.indexOf(lastChar) > 0 || lastChar == '.' || this.state.resultText == "") return

                this.setState({
                    resultText: this.state.resultText + operation
                })

                break;
            default:
                break;
        }
    }

    //HTML
    render() {

        let rows = []
        let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']]
        for (let i = 0; i < nums.length; i++) {
            let row = []
            for (let j = 0; j < nums[0].length; j++) {
                row.push(
                    <TouchableOpacity onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
                        <Text style={[styles.btnText, styles.white]}>{nums[i][j]}</Text>
                    </TouchableOpacity>
                )
            }
            rows.push(<View style={styles.row}>{row}</View>)
        }

        let ops = []
        for (let i = 0; i < this.operations.length; i++) {
            ops.push(
                <TouchableOpacity onPress={() => this.operate(this.operations[i])} style={styles.btn}>
                    <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
                </TouchableOpacity>
            );
        }

        return (

            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}> {this.state.resultText} </Text>
                </View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}> {this.state.operationText} </Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
};

//CSS 
const styles = StyleSheet.create({
    container: {
        flex: 1, //il flex funziona così: conterà le proporzioni fra i vari elementi di una view in base alla somma di tutti i valori in flex di quegli elementi, avere tre elementi con flex 1,1,1 o flex 3,3,3 è la stessa cosa.
        paddingTop: Constants.statusBarHeight,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    calculation: {
        flex: 1,
        backgroundColor: '#36393b',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 50
    },
    result: {
        flex: 1,
        backgroundColor: '#36393b',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 50
    },
    calculationText: {
        fontSize: 45,
        color: "#ebebeb",
    },
    resultText: {
        fontSize: 45,
        color: '#999ea1',
    },
    numbers: {
        flex: 7,
        backgroundColor: '#272a2b',
        flexDirection: 'column'
    },
    buttons: {
        flex: 7,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 50,
    },
    white: {
        color: '#ededed',
    },
    operations: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#212424'
    }
});
