import React from 'react';
import styled, { keyframes,css } from 'styled-components';
import { zoomIn } from 'react-animations';
const zoomInAnimation = keyframes`${zoomIn}`;
const colorConfig = {
  focus:`#87cae4`,
  focusSec:`#11998e`,
  error : `#fda1a1`,
  errSrc : `#a91f1f`,
  normal : `#8a8989`,
  fontColor:`white`
}

const invalidStyle = css`
    &:invalid { 
        ~ span{
          border-bottom-color:${props=>props.color.errSrc};
          svg{
            fill:${props=>props.color.errSrc};
            opacity:100%;
            animation: 0.5s ${zoomInAnimation};
          }
        }
        ~ label{
            color:${props=>props.color.error};
            font-weight:700; 
        }
        border-image: ${props=>`linear-gradient(to right, ${props.color.error},${props.color.errSrc})`};
        border-image-slice: 1;
    }
`
const InputContainer = styled.div`
display:flex;
position: relative;
padding: 15px 0 0;
margin-top: 10px;
width: 100%;

`;
const ImgContainer = styled.span`
    display:flex;
    height:auto;
    align-items:center;
    width:30px;
    border-bottom:2px solid ${props=>props.color.normal};
    padding-bottom:10px;
    svg{
        fill:${props=>props.color.normal};
        opacity: ${props=>props.validation?'0%':'100%'};
        height:auto;
        max-width: -webkit-fill-available;
    }
`
const StyledInput = styled.input`
    font-family: inherit;
    width: 100%;
    border: 0;
    /* without important safari not work */
    border-top: 0 !important;
    border-left: 0!important;
    border-right: 0!important;
    border-radius: 0;
    border-bottom: 2px solid ${props=>props.color.normal};
    margin:0;
    outline: 0;
    font-size: 1.3rem;
    color: ${props=>props.color.fontColor};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  
    &::placeholder {
      color: transparent;
    }
  
    &:placeholder-shown ~ label {
      font-size: 2.5rem;
      cursor: text;
      top: 0px;
    }
  
    &:focus {
      
      ~ span{
        border-bottom:3px solid ${props=>props.color.focusSec};
        svg{fill:${props=>props.color.focusSec};}
      }
      ~ label{
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: ${props=>props.color.focus};
        font-weight:700;    
      }
      
      padding-bottom: 6px;  
      font-weight: 700;
      border-width: 3px;
      border-image: ${props=>`linear-gradient(to right, ${props.color.focus},${props.color.focusSec})`};
      border-image-slice: 1;
      
    }
    ${props=>props.validation?invalidStyle:null}
    
`;
const StyledLabel = styled.label`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${props=>props.color.normal};
`;


/** props
 * color      :Object         color config
 * svg        :ReactComponent the icon 
 * label      :String         the title name,
 * validation :Boolean        effect when check the format,
*/
export default class Input extends React.Component {
  constructor(props){
    super(props)
  } 
  render() {
    let{color,label,validation}= this.props;
    return (
        <InputContainer color={color || colorConfig}>
        <StyledInput 
            id={label} 
            placeholder={label} 
            color={color || colorConfig}
            {...this.props}/>
        <StyledLabel 
          color={color || colorConfig} 
          for={label}> {/* htmlfor not effect @@ */}
            {label}
        </StyledLabel>
        <ImgContainer color={color || colorConfig} validation={validation}>
          {this.props.hasOwnProperty('icon') && <this.props.icon />}
        </ImgContainer>
    </InputContainer>
    )
  }
}

