import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation'


class RootNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <TabNavigation />
            </NavigationContainer>
        );
    }
}

export default RootNavigation;