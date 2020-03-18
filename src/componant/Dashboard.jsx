import React, { Component } from 'react';
import styled from 'styled-components';

// import { Container } from './styles';
const StyledDiv = styled.div`
  &:first-child{
    border-top:0px;
  }
  border-top:3px dotted white;
  h2{
    margin-bottom:10px;
  }
  .url{
    margin-top:10px;
  }
`;
const Container = styled.div`
  width:inherit;
`;
const Board = (props)=>
<StyledDiv>
  <h2>{props.value.head}</h2>
  <p className="url">{props.value.url}</p>
  <p>{props.value.content}</p>
</StyledDiv>;
export default class Dashboard extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <Container>
        { this.props.total === 0 
          ? <StyledDiv><h1>- 查無結果 -</h1></StyledDiv>
          : this.props.list.map((value,index)=>
            <Board 
              value={value} key={index}/>)}
      </Container>
    )
  }
}
