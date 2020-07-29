import * as React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home'
import Countries from '../components/Countries'
import News from '../components/News'
import Trends from '../components/Trends'

const Tab = createBottomTabNavigator();

class TabNavigation extends React.Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName, iconType = 'ionicon';
                        switch (route.name) {
                            case "Home":
                                iconName = 'ios-home';
                                break;
                            case "Countries":
                                iconName = 'ios-globe';
                                break;
                            case "News":
                                iconName = 'ios-list';
                                break;
                            case "Trends":
                                iconName = 'ios-pie';
                                break;
                            default:
                                iconName = 'ios-list';
                        }
                        return <Icon name={iconName} size={size} color={color} type={iconType} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'teal',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Countries" component={Countries} />
                <Tab.Screen name="News" component={News} />
                <Tab.Screen name="Trends" component={Trends} />
            </Tab.Navigator>
        );
    }
}

export default TabNavigation;