
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import Hotel from '../Hotel/Hotel';
import Header from '../Header/Header';
import Activity from '../Activity/Activity';

function App() {
  return (
    <>  <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotel/:id' element={<Hotel />} />
          <Route path='/activity/:id' element={<Activity />} />
        </Routes>
        
        <Footer />
    </>

  );
}

export default App;