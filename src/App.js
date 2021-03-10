import Landing from "./pages/Landing";
import Blockmeter from "./pages/Blockmeter";
import Message from "./pages/Message"

import { Switch,Route } from 'react-router-dom';


function App() {
  return (
    <div className="">
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/blockmeter" component={Blockmeter}></Route>
        <Route exact path="/message" component={Message}></Route>
      </Switch>
    </div>
  );
}

export default App;
