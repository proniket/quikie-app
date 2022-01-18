import Navbar from './Components/Navbar'
import BannerCard from './Components/BannerCard'
import StockDetails from './Components/StockDetails'
import SavedDataPage from './Components/SavedDataPage'
import './App.css'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <BannerCard/>
      
        <Switch>
          {/* <Container className='col-lg-10'> */}
            <Route path='/' exact component={StockDetails}/>
            <Route path='/saved-data' component={SavedDataPage} />
          {/* </Container> */}
        </Switch>
      
    </Router>
    </>
  );
}

export default App;