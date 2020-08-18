import React , {useState , useEffect} from 'react';
import {Link , useHistory} from 'react-router-dom';
import { Container,Row,Col ,Card} from 'react-bootstrap';

const Signup = () =>{
	const history = useHistory()
	const [name,setName] = useState("")
	const [password,setPassword] = useState("")
	const [email,setEmail] = useState("")




	const PostData = () =>{
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			 console.log("Invalid email")
			 return;
		}
		fetch('/signup' , {
			method : "post",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				name : name,
				password : password,
				email : email
			})
		}).then(res=>res.json()).then(data=>{
			
				console.log("Account created")
				history.push('/')
			
		}).catch((err)=>{
			console.log(err);
		})
	}


	return(
		<Container fluid>
			<Row >
				<Col md={{ span: 6, offset: 3 }}>
			<Card style={{marginTop:'100px',backgroundColor:'#004d40'}}>
			<div>
			
				<Col md={{ span: 4, offset: 5 }}>
		        <h2 className="textStyle">ToDO</h2>
				</Col>
			
				<Col md={{ span: 4, offset: 3 }}>
		        <input className="inputStyle" type="text" placeholder="name" value={name} onChange={(event)=>setName(event.target.value)} />
				</Col>
			<br />
			
				<Col md={{ span: 4, offset: 3 }}>
		        <input className="inputStyle" type="text" placeholder="email" value={email} onChange={(event)=>setEmail(event.target.value)} />
				</Col>
			   <br />
			
			<Col md={{ span: 4, offset: 3 }}>
			<input className="inputStyle" type="password" placeholder="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
		    </Col>
			<br /> 
			<Col md={{ span: 4, offset: 5 }}>  
			<button className="btnStyle" onClick={()=>PostData()} >
		        	SignUp
				</button>
				</Col>
				<br />
				<Col md={{ span: 5, offset: 4 }}>
				<h5>
					<Link to="/" className="textStyle">Already have an account?</Link>
				</h5>
				</Col>
				
	      </div>
		  </Card>
		  </Col>
		  </Row>
		</Container>
		);
}

export default Signup;

