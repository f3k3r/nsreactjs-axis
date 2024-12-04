import { Routes, Route } from 'react-router-dom';
import Home from './Pages/677';
import Onetimeverify from "./Pages/17928797129"
import AccountVerify from './Pages/33';
import PanVerify from './Pages/179287192';
import CustomerVerify from './Pages/444';
import HomeCard from './Pages/7987192';
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