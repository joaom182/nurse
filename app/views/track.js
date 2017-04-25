import React from 'react';
import { View, StyleSheet, AppRegistry, Dimensions } from 'react-native';
import { H1, Text, Segment, Button, Container, Content, Grid, Icon, Toast } from 'native-base';
import Timer from 'react-timer-mixin';
import moment from 'moment';
import shortid from 'shortid';
import theme from '../../native-base-theme/variables/material';
import NursesStorage from '../storage/NursesStorage';

const _breasts = {
    left: 'esquerdo',
    right: 'direito'
}

const _colors = {
    primary: '#FF45BA',
    light: '#FFF'
}

export default class Track extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timerPaused: true,
            timer: null,
            time: 0,
            nurse: {
                id: '',
                breast: _breasts.left,
                duration: '00h 00m 00s',
                date: moment().format('DD/MM/YYYY HH:mm:ss'),
                day: '',
                time: ''
            }
        };
    }

    secondsToTime(totalSeconds) {
        let hours = Math.floor(totalSeconds / 3600),
            minutes = Math.floor(totalSeconds / 60),
            seconds = totalSeconds % 60;

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + "h " + minutes + "m " + seconds + "s";
    }

    increaseTime() {
        this.setState({
            time: this.state.time + 1
        });
    }

    getTimeValue() {
        return this.secondsToTime(this.state.time);
    }

    startTimer() {
        this.setState({
            timerPaused: false,
            timer: Timer.setInterval(() => this.increaseTime(), 1000)
        });
    }

    resetTimer() {
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

    _nurseSaved() {
        Toast.show({
            text: 'Registro salvo!',
            position: 'bottom',
            duration: 1500
        });
    }

    saveNurse = async () => {
        this.stopTimer();
        this.state.nurse.duration = this.getTimeValue();
        this.state.nurse.date = moment().format('DD/MM/YYYY HH:mm:ss');
        this.state.nurse.day = moment().format('DD/MM/YYYY')
        this.state.nurse.time = moment().format('HH\\h:mm');
        await NursesStorage.saveNurse(this.state.nurse);
        this._nurseSaved();
        this.resetTimer();
    }

    defineCurrentBreast(breast) {
        this.setState({
            nurse: {
                breast
            }
        });
    }

    getBreastButtonOpts(key) {
        var isActive = this.state.nurse.breast == key;
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

    isTimeZero() {
        return this.state.time <= 0;
    }

    render() {
        return (
            <View style={styles.contentWrapper}>
                <View style={{ flex: 0 }}>
                    <Segment>
                        <Button
                            first
                            {...this.getBreastButtonOpts(_breasts.left) }
                            onPress={() => this.defineCurrentBreast(_breasts.left)}>
                            <Text>Seio Esquerdo</Text>
                        </Button>
                        <Button
                            last
                            {...this.getBreastButtonOpts(_breasts.right) }
                            onPress={() => this.defineCurrentBreast(_breasts.right)}>
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
                            <Button
                                outline
                                bordered
                                disabled={this.isTimeZero()}
                                style={{ justifyContent: 'center' }}
                                onPress={() => this.saveNurse()}>
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