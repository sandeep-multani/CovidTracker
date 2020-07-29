import * as React from 'react';
import { ThemeProvider } from 'react-native-elements';
import RootNavigation from './src/navigations/RootNavigation'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    );
  }
}

export default App;
