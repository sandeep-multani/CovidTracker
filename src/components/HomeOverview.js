import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import Api from '../api/Api';

class HomeOverview extends React.Component {
    state = {
        summary: []
    }

    componentDidMount() {
        Api.getSummary().then((data) => {
            let summary = [];
            summary.push({ title: "Total Cases", color: "#3A81D8", changeColor: "#CC362C", total: data.Global.TotalConfirmed, new: data.Global.NewConfirmed });
            summary.push({ title: "Active", color: "#ffc107", changeColor: "#CC362C", total: data.Global.TotalConfirmed - (data.Global.TotalRecovered + data.Global.TotalDeaths), new: data.Global.NewConfirmed - (data.Global.NewRecovered + data.Global.NewDeaths) });
            summary.push({ title: "Recovered", color: "#4F9A0B", changeColor: "#4F9A0B", total: data.Global.TotalRecovered, new: data.Global.NewRecovered });
            summary.push({ title: "Deaths", color: "#CC362C", changeColor: "#CC362C", total: data.Global.TotalDeaths, new: data.Global.NewDeaths });
            this.setState({ summary: summary });
        });
    }

    render() {
        return (
            <ScrollView>
                {
                    this.state.summary.map((item, i) => (
                        <Card
                            key={i}
                            titleStyle={{ color: item.color }}
                            title={item.title}>
                            <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 28 }}>
                                {item.total}
                            </Text>
                            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 18, color: item.changeColor }}>
                                    {item.new}
                                </Text>
                                <Icon name='ios-arrow-round-up' size={18} color={item.changeColor} type='ionicon' />
                            </View>
                        </Card>
                    ))
                }
            </ScrollView>
        );
    }
}

export default HomeOverview;