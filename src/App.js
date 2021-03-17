import Landing from "./pages/Landing";
import Blockmeter from "./pages/Blockmeter";
import Message from "./pages/Message";

import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <div className="">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/blockmeter/" component={Blockmeter}></Route>
          <Route exact path="/message" component={Message}></Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
