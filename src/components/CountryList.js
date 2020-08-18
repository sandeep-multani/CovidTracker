import * as React from 'react';
import { SafeAreaView, View, ActivityIndicator, FlatList, Platform, Button } from 'react-native';
import { Card, Text, Icon, SearchBar } from 'react-native-elements';
import { Flag } from 'react-native-svg-flagkit';
import _ from 'lodash';
import Api from '../api/Api';
import Utilities from '../utilities/Utilities';

class CountryList extends React.Component {
    state = {
        countries: [],
        filteredCountries: [],
        search: '',
        showNoMatchMessage: false
    }

    componentDidMount() {
        Api.getSummary().then((data) => {
            const countries = _.orderBy(data.Countries, ['TotalConfirmed'], ['desc']);

            this.setState({ countries: countries, filteredCountries: countries });
        });
    }

    updateSearch = (search) => {
        if (this.state.search != search) {
            this.setState({ search: search });

            var filteredCountries = _.filter(this.state.countries, function (o) {
                return o.Country.toLowerCase().indexOf(search.toLowerCase()) === 0;
            });

            if (filteredCountries.length > 0) {
                this.setState({ filteredCountries: filteredCountries, showNoMatchMessage: false });
            }
            else {
                this.setState({ filteredCountries: this.state.countries, showNoMatchMessage: true });
            }
        }
    };

    render() {
        const { search, filteredCountries } = this.state;

        const renderDataRow = (title, totalCases, newCases, color) => (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={{ marginBottom: 10, textAlign: 'left', fontSize: 14, marginTop: 2, textTransform: 'uppercase', color: '#818181' }}>
                        {title}
                    </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 18, marginRight: 10 }}>
                            {totalCases}
                        </Text>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                            {(newCases > 0) ?
                                <>
                                    <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 14, marginTop: 2, color: color }}>
                                        {newCases}
                                    </Text>
                                    <Icon name='ios-arrow-round-up' size={18} type='ionicon' color={color} />
                                </>
                                :
                                <>
                                    <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 14, marginTop: 2, color: '#919191' }}>
                                        0
                                    </Text>
                                    <Icon name='ios-arrow-round-back' size={18} type='ionicon' color='#919191' />
                                </>
                            }
                        </View>
                    </View>
                </View>
            </View>
        );

        const renderItem = ({ item }) => (
            <Card
                title={<View style={{ flexDirection: 'row', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.12)' }}>
                    <Flag id={item.CountryCode} size={0.18} />
                    <Text style={{ marginLeft: 5, textAlign: 'center', fontSize: 18, }}>
                        {item.Country}
                    </Text>
                </View>}>
                {renderDataRow('Confirmed', item.TotalConfirmed, item.NewConfirmed, '#CC362C')}
                {renderDataRow('Recovered', item.TotalRecovered, item.NewRecovered, '#4F9A0B')}
                {renderDataRow('Deaths', item.TotalDeaths, item.NewDeaths, '#CC362C')}
                <Text style={{ textAlign: 'left', fontSize: 10, textTransform: 'uppercase', color: '#818181', marginBottom: 5 }}>
                    Last update : {Utilities.formatDateToUiDate(item.Date)}
                </Text>
                <Button
                    title='View Details'
                    color='teal'
                    onPress={() => {
                        this.props.navigation.navigate('CountryOverview', {
                            countryId: item.Slug,
                            countryName: item.Country,
                            countryCode: item.CountryCode,
                            lastUpdate: item.Date
                        });
                    }}>
                </Button>
            </Card>
        );

        return (
            <>
                {
                    (this.state.filteredCountries.length == 0)
                        ? (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="teal" />
                            </View>
                        )
                        : (
                            <SafeAreaView>
                                <FlatList
                                    keyExtractor={item => item.Slug}
                                    data={filteredCountries}
                                    renderItem={renderItem}
                                    ListHeaderComponent={
                                        <>
                                            <SearchBar
                                                platform={Platform.OS}
                                                placeholder="Search..."
                                                onChangeText={this.updateSearch}
                                                value={search}
                                            />
                                            {(this.state.showNoMatchMessage) ?
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ marginTop: 2, alignSelf: 'stretch', paddingLeft: 5, paddingRight: 5, paddingTop: 10, paddingBottom: 10, backgroundColor: 'orange' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Icon name='ios-alert' size={18} type='ionicon' color='#ffffff' />
                                                            <Text style={{ color: '#ffffff', marginLeft: 5 }}>No match found.</Text>
                                                        </View>
                                                    </View>
                                                </View> : <></>
                                            }
                                        </>
                                    }
                                />
                            </SafeAreaView>
                        )}
            </>
        );
    }
}

export default CountryList;