import "./CustomButton.sass"
import styled from "styled-components";

const CustomButton = ({text, bg, onClick}) => {
	return (
		<CustomButtonWrapper theme={bg} className="custom-button" onClick={onClick}>
			{text}
		</CustomButtonWrapper>
	)
}

const CustomButtonWrapper = styled.button`
  background-color: ${props => props.theme};
`



export default CustomButton