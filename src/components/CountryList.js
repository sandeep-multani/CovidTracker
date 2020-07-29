import * as React from 'react';
import { View, ActivityIndicator, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Card, Text, Icon, SearchBar } from 'react-native-elements';
import { Flag } from 'react-native-svg-flagkit';
import _ from 'lodash';
import Api from '../api/Api';

class CountryList extends React.Component {
    state = {
        countries: [],
        search: ''
    }

    componentDidMount() {
        Api.getSummary().then((data) => {
            const countries = _.orderBy(data.Countries, ['TotalConfirmed'], ['desc']);

            this.setState({ countries: countries });
        });
    }

    updateSearch = (search) => {
        this.setState({ search: search });

        Api.getSummary().then((data) => {
            const countries = _.orderBy(data.Countries, ['TotalConfirmed'], ['desc']);
            var filteredCountries = _.filter(countries, function(o) {
                return o.Country.toLowerCase().indexOf(search.toLowerCase()) === 0;
              });
            this.setState({ countries: filteredCountries });
        });
    };

    render() {
        const { search, countries } = this.state;

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.navigate('CountryOverview', {
                        countryId: item.Slug,
                        countryName: item.Country,
                        iso2: item.CountryCode
                    });
                }}>
                <Card
                    title={<View style={{ flexDirection: 'row', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.12)' }}>
                        <Flag id={item.CountryCode} size={0.18} />
                        <Text style={{ marginLeft: 5, textAlign: 'center', fontSize: 18, }}>
                            {item.Country}
                        </Text>
                    </View>}>
                    <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 28 }}>
                        {item.TotalConfirmed}
                    </Text>
                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 18 }}>
                            {item.NewConfirmed}
                        </Text>
                        <Icon name='ios-arrow-round-up' size={18} type='ionicon' />
                    </View>
                </Card>
            </TouchableOpacity>
        );

        return (
            <View>
                <SearchBar
                    platform={Platform.OS}
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
                {
                    (this.state.countries.length == 0)
                        ? (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="teal" />
                            </View>
                        )
                        : (
                            <FlatList
                                keyExtractor={item => item.Slug}
                                data={countries}
                                renderItem={renderItem}
                            />
                        )}
            </View>
        );
    }
}

export default CountryList;