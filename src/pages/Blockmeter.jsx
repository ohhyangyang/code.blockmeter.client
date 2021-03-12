import React, { useState, useEffect } from "react";
import unblockiaService from "../lib/unblockia-service";
import { useLocation } from "react-router-dom";
import Slider from "@material-ui/core/Slider";

export default function Blockmeter(props) {
  const search = useLocation().search;
  const site = new URLSearchParams(search).get("site");

  const initialMobile = 50;

  const [data, setData] = useState({
    monthly_users: 0,
    monthly_page_view: 0,
    mobile_traffic: 0,
    unblock_traffic: 0,
    delta: 0,
  });

  const [email, setEmail] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

  // slider
  const [slider, setSlider] = useState(initialMobile);
  const [newUnblockT, setNewUnblockT] = useState(0);
  const marks = [{ value: 0 }, { value: 100 }];
  const handleChange = (event, newSlider) => {
    setSlider(newSlider);
  };

  // get site data
  useEffect(() => {
    unblockiaService
      .getSite(site)
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
        setNewUnblockT(res.data[0].unblock_traffic);
      })
      .catch((err) => console.log(err));
  }, [site]);

  const { monthly_users, monthly_page_view, unblock_traffic, delta } = data;

  // move slider
  useEffect(() => {
    console.log("slider", 100 - slider);
    console.log("newUnblockT", newUnblockT);
    console.log("mobile", initialMobile);
    const modified = Math.ceil(
      (unblock_traffic / (101 - initialMobile)) * (101 - slider)
    );
    setNewUnblockT(modified);
  }, [slider]);

  const validateEmail = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return emailRegEx.test(email);
  };

  // emaill submission
  const handleClick = () => {
    console.log("testing");

    // email validation d
    if(validateEmail(email)){
      console.log("valid")
      unblockiaService.saveMobileTraffic(site, slider, email).then((res) => {
        console.log(res.data);
        props.history.push(`/message`);
      });
    }else{
      setErrorMessage("The email is not valid")
    }
  
    
  };

  return monthly_users === 0 ? null : (
    <div>
      <div>
        <img src="/images/key.png" alt="unblockia-key" />
        <h2>Blockmeter</h2>
      </div>

      <div>
        <div>
          <p>www.{site}</p>
          <p>Monthly users: {monthly_users} M</p>
          <p>Monthly page views: {monthly_page_view} M</p>
        </div>
        <div>
          <div>
            <p>
              {newUnblockT}-{newUnblockT + delta} %
            </p>

            {newUnblockT}
            <br />

            <small>Unblock traffic you can get with us. *</small>
          </div>
          <div>
            <p>Mobile traffic</p>
            <Slider
              value={slider}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
              marks={marks}
            />
            <p>{slider} %</p>
          </div>
        </div>
      </div>

      <div>
        <p>Want more insights to start monetizing your adblock traffic?</p>

        <form>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <img
            onClick={handleClick}
            src="/images/key.png"
            alt="unblockia-lock"
          />
          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
}
