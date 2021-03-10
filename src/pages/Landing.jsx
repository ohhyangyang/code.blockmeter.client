import React from "react";

export default function Landing() {
  return (
    <div>
      <div>
        <p>
          Don´t settle
          <h1>
            With Unblockia
            <br />
            <b>you can have more</b>
          </h1>
        </p>
      </div>

      <div>
          <div>
              <img src="/images/key.png" alt="unblockia-key"/>
              <span>Blockmeter</span>
          </div>
          <p>Measure how much adblock traffic you can restore and monetize</p>
      </div>

      <form>
          <input type="text" placeholder="Enter your URL"/>
          <button>MEASURE NOW</button>
      </form>
    </div>
  );
}
