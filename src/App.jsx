import React,{Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Input from './componant/Input';
import styled from "styled-components";
import {ReactComponent as Search} from './search.svg'
import { ReactComponent as User } from './user.svg'
import {ReactComponent as Logo} from './logo.svg'
const StyledSearch = styled(Search)`
  width:fit-content;
`
const Container = styled.div`
  width:90%;
  height:100%;
  text-align:center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  max-width:600px;
`
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      value:'',
    }
    this.keyUp=this.keyUp.bind(this);
    this.onChange= this.onChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }
  onSubmit(){
    let message='';
    const {value}=this.state;
    value
      ? message=`${value}`
      : message=`error account or password is invalid`
    alert(`${message}`)
  }
  onChange(event){
    const {value}= event.target; 
    this.setState({value:value})
  }
  componentDidMount(){
    document.addEventListener("keyup", this.keyUp.bind(this)); 
  }
  keyUp(e){
    if(e.keyCode==13)this.onSubmit();
  }
  render() {
    return(
      <div className="App">
      <header className="App-header">
        <Container >
          <Input label="Search..." icon={StyledSearch} onChange={this.onChange}/>
        </Container>
      </header>
    </div>
    )
  }
}

