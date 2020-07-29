import * as React from 'react';
import { View } from 'react-native';
import { Text} from 'react-native-elements';

class News extends React.Component {
    state = {

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>News Screen</Text>
            </View>
        );
    }
}

export default News;