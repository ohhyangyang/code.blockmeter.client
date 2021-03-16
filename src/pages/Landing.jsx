import React, { useState } from "react";
import unblockiaService from "../lib/unblockia-service";
import "../styles/css/main.css";
import {motion} from "framer-motion";

export default function Landing(props) {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // url validation
  const urlValidator = (url) => {
    const urlRegEx = /^((ftp|http[s]?):\/\/)?(www\.)?([a-z0-9]+)\.[a-z]{2,5}(\.[a-z]{2})?$/;
    const urlHttpRegEx = /^((ftp|http[s]?):\/\/)(www\.)?([a-z0-9]+)\.[a-z]{2,5}(\.[a-z]{2})?$/;

    if (urlRegEx.test(url)) {
      if (urlHttpRegEx.test(url)) {
        var validUrl = new URL(url);
        console.log("validurl", validUrl);
        return validUrl.hostname;
      } else {
        console.log("url", url);
        return url;
      }
    } else {

      setErrorMessage("The URL you entered is not valid");
    }
  };

  // handle "measure now" button
  const handleMeasure = (e) => {
    e.preventDefault();

    if (urlValidator(url)) {
      //get site
      const site = urlValidator(url);
      console.log(site);

      //save site
      unblockiaService
        .getSite(site)
        .then((res) => {
          // if it´s a new site, save it!
          if (res.data[0] === undefined) {
            unblockiaService.saveSite(site).then((res) => {
              console.log("new site", res.data);
              //redirection
              props.history.push(`/blockmeter/?site=${site}`);
            });
          } else {
            console.log("old site", res.data[0]);

            //redirection
            props.history.push(`/blockmeter/?site=${site}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="landing">
      <div className="slogan">
        <div>
          <p>Don´t settle</p>
          <h1>
            With Unblockia
            <br />
            <b>you can have more</b>
          </h1>
        </div>
      </div>

      <div className="measure-traffic">
        <div className="logo">
          <img src="/images/key.svg" alt="unblockia-key" />
          <span>Blockmeter</span>
        </div>
        <p className="p1">
          Measure how much adblock traffic you can restore and monetize
        </p>
        <form>
          <input
            type="text"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <motion.p className="error"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1.5}}
          
          >{errorMessage}</motion.p>
          <button onClick={handleMeasure}>MEASURE NOW</button>
        </form>
      </div>
    </div>
  );
}
