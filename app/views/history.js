import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Text, ListItem, Content, Body } from 'native-base';

export default class History extends React.Component {

    render() {
        return (
            <Content style={styles.content}>
                <ListItem itemDivider>
                    <Text>23/04/2017</Text>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>

                <ListItem itemDivider>
                    <Text>22/04/2017</Text>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>14h:00</Text>
                        <Text note>Seio esquerdo</Text>
                    </Body>
                </ListItem>
            </Content>
        );
    }
}

const styles = {
    content: {
        paddingTop: 24
    }
}

AppRegistry.registerComponent('History', () => History);