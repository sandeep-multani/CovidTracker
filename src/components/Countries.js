import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CountryList from './CountryList';
import CountryOverview from './CountryOverview';

const Stack = createStackNavigator();

class Countries extends React.Component {
    render() {
        return (
            <Stack.Navigator
                initialRouteName="CountryList">
                <Stack.Screen name="CountryList" component={CountryList} options={{ title: 'Countries' }} />
                <Stack.Screen name="CountryOverview" component={CountryOverview} options={{ title: 'Country Overview' }} />
            </Stack.Navigator>
        );
    }
}

export default Countries;