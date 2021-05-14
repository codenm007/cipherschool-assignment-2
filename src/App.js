import { Fragment } from 'react';
import {useSelector} from 'react-redux';

import Header from './components/header';
import Calendar from './components/calendar';

function App() {

  return (
    <Fragment>
      <Header />
      <Calendar />
    </Fragment>
    
  );
}

export default App;
