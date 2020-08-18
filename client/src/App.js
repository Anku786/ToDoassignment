import React , {useEffect , createContext , useReducer , useContext} from 'react';
import ToDo from './components/ToDo';
import Signup from './components/signup';
import Signin from './components/signin';
import {BrowserRouter ,  Route , Switch , useHistory} from 'react-router-dom';
import './App.css';
import {reducer , initialState} from './reducers/userReducer';
import 'bootstrap/dist/css/bootstrap.css';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = UserContext
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      // dispatch({type:"USER" , payload:user})
    }
    else{
      history.push('/')
    }
  },[])
  return (
        <Switch>
          <Route  path="/todo">
            <ToDo />
          </Route>
          <Route  path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Signin />
          </Route>
        </Switch>
  );
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state:state , dispatch:dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
