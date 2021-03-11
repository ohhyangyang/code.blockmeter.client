import React, { useState } from "react";
import apiService from "../lib/api-service";
import axios from "axios";

export default function Landing() {
  const monthly_users = 10;
  const monthly_page_view = 40;

  const baseURL = "https://6048f662fb5dcc0017969555.mockapi.io/blockmeters";
  const max = 40;
  const min = 25;
  const max_delta = 4;
  const min_delta = 1;
  const mobile_traffic = 60;
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const urlValidator = (url) => {
    try {
      var validUrl = new URL(url);
    } catch (e) {
      setErrorMessage("URL you entered is not valid");
      return false;
    } finally {
      return validUrl;
    }
  };
  const handleMeasure = (e) => {
    e.preventDefault();
    if (urlValidator(url)) {
      //site
      const validUrl = urlValidator(url);

      const site = validUrl.hostname;

      //monthly_users fetch
      //monthly_page_view fetch

      //unblock_traffic
      const unblock_traffic = Math.floor(Math.random() * (max - min + 1)) + min;

      //delta
      const delta =
        Math.floor(Math.random() * (max_delta - min_delta + 1)) + min_delta;

      //save data
      axios
        .post(
          baseURL,

          {
            site,
            monthly_users,
            monthly_page_view,

            unblock_traffic,
            delta,
            mobile_traffic,
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };
  // URL Validation

  // Call API
  return (
    <div>
      <div>
        <div>
          Don´t settle
          <h1>
            With Unblockia
            <br />
            <b>you can have more</b>
          </h1>
        </div>
      </div>

      <div>
        <div>
          <img src="/images/key.png" alt="unblockia-key" />
          <span>Blockmeter</span>
        </div>
        <p>Measure how much adblock traffic you can restore and monetize</p>
      </div>

      <form>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p>{errorMessage}</p>
        <button onClick={handleMeasure}>MEASURE NOW</button>
      </form>
    </div>
  );
}
