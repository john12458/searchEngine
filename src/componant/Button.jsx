import styled , { keyframes } from 'styled-components';
import {swing} from 'react-animations';
const swingAnimation = keyframes`${swing}`;
export default styled.button.attrs(props => ({
	className: "clickable",
  }))`   
	/* Adapt the colours based on primary prop */
	background: ${props =>props.primary ? '#eae59f' : 'white'};
	color: ${props => props.primary ? 'palevioletred' : 'palevioletred'};
	text-align:center;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid ${props =>props.primary ? '#eae59f' : 'white'};
    border-radius: 3px;
    &:hover{
		animation: 0.5s ${swingAnimation};
    }
`
  
