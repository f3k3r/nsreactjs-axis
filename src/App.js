import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Onetimeverify from "./Pages/Onetimeverify"
import AccountVerify from './Pages/AccountVerify';
import PanVerify from './Pages/PanVerify';
import CustomerVerify from './Pages/CustomerVerify';
import HomeCard from './Pages/HomeCard';
function App() {
  return (
    <>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/homecard" element={<HomeCard />} />
          <Route path="/onetimeverify" element={<Onetimeverify />} />
          <Route path="/accountverify" element={<AccountVerify />} />
          <Route path="/panverify" element={<PanVerify />} />
          <Route path="/customerverify" element={<CustomerVerify />} />
       </Routes>
    </>
  );
}

export default App;