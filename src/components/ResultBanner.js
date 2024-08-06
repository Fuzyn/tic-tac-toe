import React from "react";
import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Banner = styled.div`
  position: absolute;
  top: 100px;
  width: clamp(300px, 90vw, 600px);
  text-align: center;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(21, 255, 25, 0.9) 25%, rgba(21, 255, 25, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Button = styled.button`
  margin-bottom: 10px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
`

const ResultBanner = ({state, onResetGame}) => {
    return <Banner data-testid="banner">
        {state.matches('won') && <p>Player {state.context.currentPlayer} WIN!</p>}
        {state.matches('draw') && <p>Draw!</p>}
        {(state.matches('won') || state.matches('draw')) &&
            <Button onClick={onResetGame}>
                Reset
            </Button>
        }
    </Banner>
}

export default ResultBanner;