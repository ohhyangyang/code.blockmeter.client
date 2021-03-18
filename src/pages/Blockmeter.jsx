import React, { useState, useEffect, useRef } from "react";
import unblockiaService from "../lib/unblockia-service";
import { useLocation } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import "../styles/css/main.css";
import AnimatedNumber from "animated-number-react";
import { motion } from "framer-motion";

export default function Blockmeter(props) {
  const search = useLocation().search;
  const site = new URLSearchParams(search).get("site");
  const inputRef = useRef(null);

  const initialMobile = 50;

  const [data, setData] = useState({
    monthly_users: 0,
    monthly_page_view: 0,
    mobile_traffic: 0,
    unblock_traffic: 0,
    delta: 0,
  });

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    if (validateEmail(email)) {
      console.log("valid");
      unblockiaService.saveMobileTraffic(site, slider, email).then((res) => {
        console.log(res.data);
        props.history.push(`/message`);
      });
    } else {
      setErrorMessage("Please enter a valid Email address");
    }
  };

  // number counter
  const formatValue = (value) => value.toFixed(0);

  // ///////////////////////

  // useEffect(() => {
  //   inputRef.current.focus();
  // })

  const handleTransitionEnd = () => {
    console.log("testing");
    inputRef.current.focus();
  };

  const containerVariants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: { durantion: 5 },
    },
    exit: {
      x: "-100vw",
      transition: { when: "beforeChildren", ease: "easeInOut", duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="blockmeter"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={handleTransitionEnd}
    >
      <div className="logo">
        <img src="/images/key.svg" alt="unblockia-key" />
        <span>Blockmeter</span>
      </div>

      <div className="result">
        <div className="left">
          <p className="site">www.{site}</p>
          <p>Monthly users: {monthly_users} M</p>
          <p>Monthly page views: {monthly_page_view} M</p>
        </div>
        <div className="right">
          <div className="unblock-traffic">
            <p className="counter">
              <AnimatedNumber
                value={newUnblockT}
                formatValue={formatValue}
                duration="800"
              />
              -
              <AnimatedNumber
                value={newUnblockT + delta}
                formatValue={formatValue}
                duration="800"
              />
              %
            </p>

            <p className="small">
              <small>
                The approximate percentage of blocked traffic on your website. *
              </small>
            </p>
          </div>

          <div className="mobile-traffic">
            <p>Mobile traffic</p>
            <div className="slider">
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
      </div>

      <div className="email-form">
        <p className="question">
          Want more insights to start monetizing your adblock traffic?
        </p>

        <form>
          <input
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            ref={inputRef}
          />
          {/* <img
            onClick={handleClick}
            src="/images/arrow.svg"
            alt="unblockia-lock"
          /> */}

          <svg
          onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            width="30.62"
            height="15.051"
            viewBox="0 0 30.62 15.051"
          >
            <path
              id="Icon_awesome-long-arrow-alt-right"
              data-name="Icon awesome-long-arrow-alt-right"
              d="M21.457,15.05H.82a.82.82,0,0,0-.82.82V19.7a.82.82,0,0,0,.82.82H21.457v3.148a1.64,1.64,0,0,0,2.8,1.16l5.882-5.882a1.64,1.64,0,0,0,0-2.32l-5.882-5.882a1.64,1.64,0,0,0-2.8,1.16Z"
              transform="translate(0 -10.258)"
              fill="#fff"
            ></path>{" "}
          </svg>

          
          <motion.p
            className="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {errorMessage}
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
}
