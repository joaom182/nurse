import React from 'react';
import { View, StyleSheet, AppRegistry, Dimensions } from 'react-native';
import { H1, Text, Segment, Button, Container, Content, Grid, Icon } from 'native-base';
import theme from '../../native-base-theme/variables/material';
import Timer from 'react-timer-mixin';

const _seios = {
    esquerdo: 'esquerdo',
    direito: 'direito'
}

const _colors = {
    primary: '#FF45BA',
    light: '#FFF'
}

export default class Track extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSeio: _seios.esquerdo,
            timerPaused: true,
            timer: null,
            time: 0
        };
    }

    secondsToTime(totalSeconds) {
        let hours = Math.floor(totalSeconds / 3600),
            minutes = Math.floor(totalSeconds / 60),
            seconds = totalSeconds % 60;

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    }

    increaseTime() {
        this.setState({
            time: this.state.time + 1
        });
    }

    getTimeValue(){
        return this.secondsToTime(this.state.time);
    }

    startTimer() {
        this.setState({
            timerPaused: false,
            timer: Timer.setInterval(() => this.increaseTime(), 1000)
        });
    }

    resetTimer(){
        this.setState({
            time: 0
        });
    }

    stopTimer() {
        Timer.clearInterval(this.state.timer);
        this.setState({
            timerPaused: true,
            timer: null
        });
    }

    toggleTimer() {
        if (!this.state.timer)
            this.startTimer()
        else
            this.stopTimer();
    }

    saveTime() {
        this.stopTimer();
        this.resetTimer();
    }

    defineCurrentSeio(seio) {
        this.setState(prevState => ({
            currentSeio: seio
        }));
    }

    getBreastButtonOpts(key) {
        var isActive = this.state.currentSeio == key;
        return {
            active: isActive
        };
    }

    getIconName() {
        return !this.state.timerPaused ? 'ios-pause-outline' : 'ios-play-outline';
    }

    getButtonLabel() {
        return !this.state.timerPaused ? 'Pausar' : 'Iniciar';
    }

    render() {
        return (
            <View style={styles.contentWrapper}>
                <View style={{ flex: 0 }}>
                    <Segment>
                        <Button
                            first
                            {...this.getBreastButtonOpts(_seios.esquerdo) }
                            onPress={() => this.defineCurrentSeio(_seios.esquerdo)}>
                            <Text>Seio Esquerdo</Text>
                        </Button>
                        <Button
                            last
                            {...this.getBreastButtonOpts(_seios.direito) }
                            onPress={() => this.defineCurrentSeio(_seios.direito)}>
                            <Text>Seio Direito</Text>
                        </Button>
                    </Segment>

                    <View style={styles.timer.container}>
                        <Text style={styles.timer.text}>{this.getTimeValue()}</Text>
                    </View>

                    <View>
                        <Grid style={styles.buttonsWrapper}>
                            <Button iconLeft onPress={() => requestAnimationFrame(() => this.toggleTimer())} style={styles.playButton}>
                                <Icon name={this.getIconName()} />
                                <Text>{this.getButtonLabel()}</Text>
                            </Button>
                            <Button outline bordered style={{ justifyContent: 'center' }} onPress={() => this.saveTime()}>
                                <Icon name="ios-checkmark-circle-outline" />
                                <Text>Salvar</Text>
                            </Button>
                        </Grid>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = {
    buttonsWrapper: {
        justifyContent: 'center',
    },
    playButton: {
        width: 120,
        justifyContent: 'center',
        marginRight: 18
    },
    contentWrapper: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: (theme.deviceHeight - 120)
    },
    timer: {
        container: {
            backgroundColor: 'transparent',
            padding: 12,
            margin: 36,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.brandPrimary,
            width: 220,
        },
        text: {
            fontSize: 30,
            textAlign: 'center',
            color: theme.brandPrimary,
            marginLeft: 7,
        }
    }
};



AppRegistry.registerComponent('Track', () => Track);