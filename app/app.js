import React from 'react';
import { AppRegistry } from 'react-native';
import {
    Header,
    Body,
    Title,
    Subtitle,
    Container,
    Content,
    Text,
    Tabs,
    Tab,
    TabHeading,
    Separator,
    ListItem,
    FooterTab,
    Footer,
    Button,
    View,
    Icon,
    StyleProvider
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Track from '../app/views/track';
import History from '../app/views/history';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTrackTab: true,
            showHistoryTab: false
        };
    }

    selectTab(tab) {
        var newState = {
            showTrackTab: false,
            showHistoryTab: false
        };

        if (tab == 'trackTab')
            newState.showTrackTab = true;

        if (tab == 'historyTab')
            newState.showHistoryTab = true;

        this.setState(prevState => (newState));
    }

    getCurrentTab() {
        if (this.state.showHistoryTab)
            return <History />;

        if (this.state.showTrackTab)
            return <Track />;
    }
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Container>
                        {this.getCurrentTab()}
                    </Container>
                    <Footer>
                        <FooterTab>
                            <Button active={this.state.showTrackTab} onPress={(e) => this.selectTab('trackTab')}>
                                <Icon name="clock" />
                                <Text>Gravar</Text>
                            </Button>
                            <Button active={this.state.showHistoryTab} onPress={(e) => this.selectTab('historyTab')}>
                                <Icon name="calendar" />
                                <Text>Histórico</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        );
    }
}

AppRegistry.registerComponent('App', () => App);
