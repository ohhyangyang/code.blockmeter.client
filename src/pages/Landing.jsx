import React, { useState } from "react";
import unblockiaService from "../lib/unblockia-service";
import sitetrafficService from "../lib/sitetraffic-service";

export default function Landing(props) {
  // const baseURL = "https://6048f662fb5dcc0017969555.mockapi.io/blockmeters";
  const max = 40;
  const min = 25;
  const max_delta = 4;
  const min_delta = 1;
  const mobile_traffic = 60;


  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [monthly_users, setMonthlyUsers] = useState("");
  const [monthly_page_view, setMonthlyPageView] = useState("");

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
      setErrorMessage("URL you entered is not valid");
    }
  };

  const getSiteTraffic = (site) => {
    console.log(site);
    sitetrafficService.getTrafficData(site).then((res) => {
      console.log(res.data);
      let users = res.data.data.estimations.visitors.monthly;
      let page_view = res.data.data.estimations.pageviews.monthly;
      console.log(Math.round(monthly_users), monthly_page_view);

      


      setMonthlyUsers(users);
      setMonthlyPageView(page_view);
    });
  };

  const handleMeasure = (e) => {
    e.preventDefault();
    if (urlValidator(url)) {
      //site
      const site = urlValidator(url);

      console.log(site);

      //monthly_users fetch
      //monthly_page_view fetch
      getSiteTraffic(site);

      //unblock_traffic
      const unblock_traffic = Math.floor(Math.random() * (max - min + 1)) + min;

      //delta
      const delta =
        Math.floor(Math.random() * (max_delta - min_delta + 1)) + min_delta;

      //site save
      unblockiaService
        .getSite(site)
        .then((res) => {
          if (res.data[0] === undefined) {
            unblockiaService.saveSite(
              site,
              monthly_users,
              monthly_page_view,
              unblock_traffic,
              delta,
              mobile_traffic
            );
          }
          //redirection
          // props.history.push("/blockmeter");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
