import React from 'react';
import { AppRegistry, View, Alert } from 'react-native';
import { Text, ListItem, Content, Icon, Button, Body, Toast } from 'native-base';
import _ from 'lodash';
import theme from '../../native-base-theme/variables/material';
import NursesStorage from '../storage/NursesStorage';

export default class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [] // { day: '24/10/2017', nurses: [{ id: 'as98eyq3hi', breast: 'esquerdo', date: '24/10/2017 14:00:00' time: '14h:00', duration: '00h 00m 00s' }]}
        };
    }

    componentDidMount() {
        this._loadAndBinData().done();
    }

    _itemRemoved() {
        Toast.show({
            text: 'Registro excluído!',
            position: 'bottom',
            duration: 1500
        });
    }

    _historyCleared() {
        Toast.show({
            text: 'Histórico apagado!',
            position: 'bottom',
            duration: 1500
        });
    }

    removeItem(id) {
        Alert.alert(
            'Confirmar ação',
            'Deseja realmente excluir o registro?',
            [
                {
                    text: 'Não', onPress: () => { }, style: 'cancel'
                },
                {
                    text: 'Sim', onPress: async () => {
                        await NursesStorage.removeNurse(id);
                        this._itemRemoved();
                        this._loadAndBinData();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    clearHistory() {
        Alert.alert(
            'Confirmar ação',
            'Deseja realmente apagar todo o histórico de registros?',
            [
                {
                    text: 'Não', onPress: () => { }, style: 'cancel'
                },
                {
                    text: 'Sim', onPress: async () => {
                        await NursesStorage.clearAll();
                        this._historyCleared();
                        this._loadAndBinData();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    getClearHistoryButton() {
        if (this.state.history.length == 0)
            return null;

        return (
            <View style={styles.clearHistoryButtonWrapper}>
                <Button iconLeft danger onPress={() => this.clearHistory()}>
                    <Icon name="md-close"></Icon>
                    <Text>Limpar histórico</Text>
                </Button>
            </View>
        );
    }

    getNoDataView() {
        if (this.state.history.length > 0)
            return null;

        return (
            <View style={styles.contentWrapper}>
                <Icon name="ios-information-circle-outline" style={{ fontSize: 80, color: '#B5B5B5' }} />
                <Text style={{ color: '#B5B5B5' }}>Sem registros no momento</Text>
            </View>
        );
    }

    _loadAndBinData = async () => {
        let nurses = await NursesStorage.getAll();
        this._populateViewModel(nurses);
    }

    _populateViewModel(nurses) {
        let history = _.uniqBy(nurses, 'day').map((nurse) => {
            let xNurses = _.filter(nurses, { day: nurse.day });
            return {
                day: nurse.day,
                nurses: _.orderBy(xNurses, ['date'], ['desc'])
            }
        });

        this.setState({
            history
        });
    }

    render() {
        return (
            <Content style={styles.content}>
                {this.state.history.map((history) => {
                    return (
                        <View key={history.day}>
                            <ListItem itemDivider>
                                <Text>{history.day}</Text>
                            </ListItem>
                            {history.nurses.map((nurse) => {
                                return (
                                    <ListItem key={nurse.id}>
                                        <Body>
                                            <Text>Ás {nurse.time} durante {nurse.duration}</Text>
                                            <Text note>Seio {nurse.breast}</Text>
                                        </Body>
                                        <Button transparent danger rounded onPress={() => this.removeItem(nurse.id)}>
                                            <Icon name="trash" />
                                        </Button>
                                    </ListItem>
                                );
                            })}
                        </View>
                    );
                })}
                {this.getNoDataView()}
                {this.getClearHistoryButton()}
            </Content>
        );
    }
}

const styles = {
    content: {
        paddingTop: 24
    },
    clearHistoryButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 48
    },
    contentWrapper: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: (theme.deviceHeight - 120)
    }
}

AppRegistry.registerComponent('History', () => History);