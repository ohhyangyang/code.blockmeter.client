import React, { useState, useEffect } from "react";
import unblockiaService from "../lib/unblockia-service";
import { useLocation } from "react-router-dom";
import Slider from "@material-ui/core/Slider";

export default function Blockmeter(props) {
  const search = useLocation().search;
  const site = new URLSearchParams(search).get("site");

  const [data, setData] = useState({
    monthly_users: 0,
    monthly_page_view: 0,
    mobile_traffic: 0,
    unblock_trafic: 0,
    delta: 0,
  });


  // slider
  const [slider, setSlider] = React.useState(0);
  const marks = [{ value: 0 }, { value: 100 }];
  const handleChange = (event, newSlider) => {
    setSlider(newSlider);
  };


  // get site data
  useEffect(async () => {
    unblockiaService
      .getSite(site)
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
        setSlider(res.data[0].unblock_trafic)
      })
      .catch((err) => console.log(err));
  }, [site]);

  const {
    monthly_users,
    monthly_page_view,
    mobile_traffic,
    unblock_trafic,
    delta,
  } = data;

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
              {unblock_trafic - delta}-{unblock_trafic + delta} %
            </p>
            <small>Unblock traffic you can get with us. *</small>
          </div>
          <div>
            <p>Mobile traffic</p>
            <Slider
              defaultValue={60}
              value={slider}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
              marks={marks}
            />
            <p>{slider}</p>
          </div>
        </div>
      </div>

      <div>
        <p>Want more insights to start monetizing your adblock traffic?</p>

        <form>
          <input type="text" placeholder="Type your email" />
          <img src="/images/key.png" alt="unblockia-lock" />
        </form>
      </div>
    </div>
  );
}
