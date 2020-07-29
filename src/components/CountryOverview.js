import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import { Flag } from 'react-native-svg-flagkit';
import _ from 'lodash';
import Api from '../api/Api';

class CountryOverview extends React.Component {

    state = {
        countries: []
    }

    componentDidMount() {
        Api.getCountries().then((data) => {
            const countries = _.orderBy(data, ['Country'], ['asc']);
            this.setState({ countries: countries });
        });
    }

    render() {
        const { countryId, countryName, iso2 } = this.props.route.params;

        this.props.navigation.setOptions({ title: countryName });

        const cardTitle = (
            <View style={{ flexDirection: 'row' }}>
                <Flag id={iso2} size={0.2} />
                <Text style={{ marginLeft: 5, textAlign: 'center', fontSize: 18, }}>
                    {countryName}
                </Text>
            </View>
        )

        return (
            <ScrollView>
                <Card
                    title={cardTitle}>
                    <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 28 }}>
                        {10}
                    </Text>
                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <Flag id={iso2} size={0.2} />
                        <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 18, }}>
                            {20}
                        </Text>
                        <Icon name='ios-arrow-round-up' size={18} type='ionicon' />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default CountryOverview;