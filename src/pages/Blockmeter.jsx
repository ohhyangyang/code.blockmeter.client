import React from "react";

export default function Blockmeter() {
  return (
    <div>
      <div>
        <img src="/images/key.png" alt="unblockia-key" />
        <h2>Blockmeter</h2>
      </div>
      
      <div>
        <div>
          <p>www.Example.com</p>
          <p>Monthly users: XX M</p>
          <p>Monthly page views: XX M</p>
        </div>
        <div>
          <div>
            <p>XX-XX %</p>
            <small>Unblock traffic you can get with us. *</small>
          </div>
          <div>
              <p>Mobile traffic</p>
              <p>Slider</p>
          </div>
        </div>
      </div>

      <div>
          <p>Want more insights to start monetizing your adblock traffic?</p>

          <form>
              <input type="text" placeholder="Type your email"/>
              <img src="/images/key.png" alt="unblockia-lock" />
          </form>
      </div>
    </div>
  );
}
