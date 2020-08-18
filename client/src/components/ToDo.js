import React , {useState,useEffect,useContext} from 'react';
import {useHistory , useParams ,Link,Prompt} from 'react-router-dom';
import { Container,Row,Col ,Card,Toast} from 'react-bootstrap';
import {UserContext} from '../App';

const ToDo = () => {
    const [todo,setTodo] = useState('');
    const history = useHistory()
    const [data,setData] = useState([]);
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mytodo',{
            method:"get",
            headers : {
		        "Authorization" : "Bearer "+localStorage.getItem("jwt")
      		}
        }).then(res=>res.json()).then(data=>{
            setData(data.mytodo)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    const postToDoDetails = () =>{
        fetch('/createtodo',{
            method:"post",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                todo:todo
        })
        }).then(res=>res.json()).then(data=>{
            history.push('/todo')          
        }).catch((err)=>{
            console.log(err);
        })
    }
    const deleteToDoDetails = (todoId) =>{
        fetch(`/deletetodo/${todoId}` , {
            method:'delete'
        }).then(res=>res.json()).then(result=>{
            const newToDo = data.filter(item=>{
                return item._id != result._id
            })
            setData(newToDo)
        })
    }
    return (
        <Container>
            <Row>
            <Col md={{ span: 6, offset: 3 }}>
			<Card style={{marginTop:'100px',backgroundColor:'#004d40'}}>
        <div>
        <button className="logoutbtnStyle" 
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"Clear"})
              history.push("/")
            }}>
              LogOut
            </button>
        <Col md={{ span: 5, offset: 5 }}>
            <h1 className="textStyle">ToDo</h1>
            </Col>
            
            <Col md={{ span: 6, offset: 3 }}>
            <input 
                type="text" 
                placeholder="Add ToDo Task" 
                value={todo} 
                className="inputStyle"
                onChange={(e)=>setTodo(e.target.value)} 
            />
            </Col><br />
            <Col md={{ span:5, offset: 5 }}>
            <button className="btnStyle" onClick={()=>postToDoDetails()}>
                Add
            </button>
            </Col>
            <br /><br />
            <Col md={{ span:10, offset: 2 }}>
            <div>
                <ol>
                    {
                        data.map(item=>{
                            return(
                                <div>
                                    <li className="todoStyle">{item.todo}
                                    <button className="todobtnStyle" onClick={()=>deleteToDoDetails(item._id)}>
                                        Delete
                                     </button>
                                     </li>
                                </div>
                            )
                        })
                    }
                </ol>
            </div>
            </Col>
        </div>
        
        </Card>
		  </Col>
        </Row>
        </Container>
  );
}

export default ToDo;
