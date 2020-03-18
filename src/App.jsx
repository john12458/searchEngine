import React,{Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Input from './componant/Input';
import styled from "styled-components";
import {ReactComponent as Search} from './search.svg'
import { ReactComponent as User } from './user.svg'
import {ReactComponent as Logo} from './logo.svg'
import axios from 'axios';
import Dashboard from './componant/Dashboard';
const StyledSearch = styled(Search)`
  width:fit-content;
`
const InputContainer = styled.div`
  position:${props=>props.display?'sticky':'unset'};
  top:0;
  width:auto;
  background-color:#282c34;
`;
const DashboardContainer = styled.div`
display:${props=>props.display?'block':'none'};
padding:0px 20px;
`;

const Container = styled.div`
  width:90%;
  height:100%;
  text-align:center;
  display:inline-flex;
  flex-direction:column;
  max-width:600px;
`
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      value:'',
      total:'',
      display:"false",
      list:[]
    }
    this.keyUp=this.keyUp.bind(this);
    this.onChange= this.onChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }
  onSubmit(){
    axios({
      method: 'get',
      url: "http://localhost:9000/" + `api/search?query=${this.state.value}`,
    })
    .then((res)=>{
      this.setState({...res.data},
        ()=>this.setState({display:"true"}));
    })
    .catch((error)=>{
        console.log(error);
    });
    
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
          <InputContainer display={this.state.display}>
            <Input 
              value={this.state.value} 
              label="Search..." 
              icon={StyledSearch} 
              onChange={this.onChange}/>
          </InputContainer>
        <p>{this.state.display=="true" && `搜尋結果：${this.state.total}筆`}</p>
          <DashboardContainer 
            display={this.state.display}>
            <Dashboard 
            list={this.state.list} total={this.state.total}/>
          </DashboardContainer>
         
        </Container>
      </header>
    </div>
    )
  }
}

