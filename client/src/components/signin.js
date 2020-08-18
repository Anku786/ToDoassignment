import React , {useState , useContext} from 'react';
import {Link , useHistory} from 'react-router-dom';
import {UserContext} from '.././App';
import { Container,Row,Col ,Card,Button} from 'react-bootstrap';

const Signin = () =>{
    const {state , dispatch} = useContext(UserContext)
    const history = useHistory()
	const [password,setPassword] = useState("")
	const [email,setEmail] = useState("")

	const PostData = () =>{
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			 console.log("Invalid email")
			 return;
		}
		fetch('/signin' , {
			method : "post",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				password : password,
				email : email
			})
		}).then(res=>res.json()).then(data=>{
			if(data.error){
				console.log("error")
			}
			else{
				localStorage.setItem("jwt" , data.token)
				localStorage.setItem("user" , JSON.stringify(data.user))
				dispatch({type:"USER" , payload:data.user})
				console.log("sign in success")
				history.push('/todo')
			}
			
		}).catch((err)=>{
			console.log(err);
		})
	}
	return(
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
			<Card style={{
				marginTop:'100px',
				backgroundColor:'#004d40'
			}}>
			
			<div className="col s-4 offset-s2">
				<Col md={{ span: 4, offset: 5 }}>
		        <h2 className="textStyle">ToDO </h2>
				</Col>
				<Col md={{ span: 4, offset: 3 }}>
		        <input className="inputStyle" type="text" placeholder="email" value={email} onChange={(event)=>setEmail(event.target.value)} />
		        </Col><br />
				<Col md={{ span: 4, offset: 3 }}>
				<input className="inputStyle" type="password" placeholder="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
		        </Col><br />
				<Col md={{ span: 4, offset: 5 }}>
				<button className="btnStyle"  onClick={()=>PostData()}>
		        	Login
				</button>
				</Col><br />
				<Col md={{ span: 5, offset: 4 }}>
				<h5>
					<Link to="/signup" className="textStyle">Don't have an account?</Link>
				</h5>
				</Col>
	      </div>
		  
		  </Card>
		  </Col>
		  </Row>
		  </Container>
		);
}

export default Signin;

