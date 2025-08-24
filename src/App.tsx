import "./App.css";
import ContextStack from "@components/stacks/ContextStack"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "@components/Router/MainRouter"
import { Provider } from 'react-redux';
import {store} from '../components/redux/store'


function App() {
  return (
    <div className="container-fluid pt-5 root_container">
      <BrowserRouter>
      <Provider store={store} >

        <ContextStack>
          <Router/>
        </ContextStack>
           
                  
            
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
