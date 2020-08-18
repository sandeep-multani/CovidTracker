import * as React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import { Flag } from 'react-native-svg-flagkit';
import _ from 'lodash';
import Api from '../api/Api';
import Utilities from '../utilities/Utilities';
import { LineChart, Path, Grid, XAxis, YAxis } from 'react-native-svg-charts';


class CountryOverview extends React.Component {

    state = {
        dataByMonth: []
    }

    componentDidMount() {
        const { countryId, lastUpdate } = this.props.route.params;
        const from = Utilities.formatDateForApi(Utilities.dateAddDays(lastUpdate, -30));
        const to = Utilities.formatDateForApi(lastUpdate);

        Api.getCountryDetails(countryId, from, to).then((data) => {
            const dataByMonth = _.orderBy(data, ['Date'], ['asc']);
            this.setState({ dataByMonth: dataByMonth });
        });
    }

    render() {

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

        const calcNewCases = (yesterday, today) => today - yesterday;

        const renderHeader = (countryName, countryCode, lastTwoDays) => (
            <Card
                title={<View style={{ flexDirection: 'row', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.12)' }}>
                    <Flag id={countryCode} size={0.18} />
                    <Text style={{ marginLeft: 5, textAlign: 'center', fontSize: 18 }}>
                        {countryName}
                    </Text>
                </View>}>
                {renderDataRow(
                    'Confirmed',
                    lastTwoDays[0].Confirmed,
                    calcNewCases(lastTwoDays[0].Confirmed, lastTwoDays[1].Confirmed),
                    '#CC362C')
                }
                {renderDataRow(
                    'Recovered',
                    lastTwoDays[0].Recovered,
                    calcNewCases(lastTwoDays[0].Recovered, lastTwoDays[1].Recovered),
                    '#4F9A0B')
                }
                {renderDataRow(
                    'Deaths',
                    lastTwoDays[0].Deaths,
                    calcNewCases(lastTwoDays[0].Deaths, lastTwoDays[1].Deaths),
                    '#CC362C')
                }
                <Text style={{ textAlign: 'left', fontSize: 10, textTransform: 'uppercase', color: '#818181', marginBottom: 5 }}>
                    Last update : {Utilities.formatDateToUiDate(this.props.route.params.lastUpdate)}
                </Text>
            </Card>
        );

        const renderChart = function () {

            const data1 = [10, 20, 30, 40, 50]
            const data2 = [5, 10, 15, 20, 25]
            const data3 = [3, 15, 6, 5, 50]
            const axesSvg = { fontSize: 10, fill: 'grey' };
            const verticalContentInset = { top: 10, bottom: 10 }
            const xAxisHeight = 30
            //Array of datasets, following this syntax:
            const data = [
                {
                    data: data1,
                    svg: { stroke: 'purple' },
                },
                {
                    data: data2,
                    svg: { stroke: 'red' },
                },
                {
                    data: data3,
                    svg: { stroke: 'teal' },
                }
            ]

            return (
                <Card
                    title={
                        <View style={{ flexDirection: 'row', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.12)' }}>
                            <Text style={{ fontSize: 18 }}>
                                Last month
                    </Text>
                        </View>}>
                    <View style={{ height: 200, marginTop: 10, flexDirection: 'row' }}>
                        <YAxis
                            data={data[0].data}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={data}
                                contentInset={verticalContentInset}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                            >
                                <Grid />
                            </LineChart>
                            <XAxis
                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                data={data[0].data}
                                formatLabel={(value, index) => index}
                                contentInset={{ left: 10, right: 10 }}
                                svg={axesSvg}
                            />
                        </View>
                    </View>
                </Card>
            )
        }

        const { countryName, countryCode } = this.props.route.params;
        this.props.navigation.setOptions({ title: countryName });

        return (
            <>
                {
                    (this.state.dataByMonth.length == 0) ?
                        (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="teal" />
                            </View>
                        )
                        : (
                            <ScrollView>
                                {renderHeader(countryName, countryCode, this.state.dataByMonth.slice(-2))}
                                {renderChart()}
                            </ScrollView>
                        )
                }
            </>
        );
    }
}

export default CountryOverview;