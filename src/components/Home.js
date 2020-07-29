import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeOverview from './HomeOverview';
import app from '../../app.json'

const Stack = createStackNavigator();

class Home extends React.Component {
    render() {
        return (
            <Stack.Navigator
                initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeOverview} options={{ title: app.expo.name }} />
            </Stack.Navigator>
        );
    }
}

export default Home;