import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  position: absolute;
  top: 100px;
  width: clamp(300px, 90vw, 600px);
  text-align: center;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(21, 255, 25, 0.9) 25%, rgba(21, 255, 25, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
`;

const Button = styled.button`
  margin-bottom: 10px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
`

const ResultBanner = ({state, onResetGame}) => {
    return <Banner>
        {state.matches('win') && <p>Player {state.context.currentPlayer} WIN!</p>}
        {state.matches('draw') && <p>Draw!</p>}
        {(state.matches('win') || state.matches('draw')) &&
            <Button onClick={onResetGame}>
                Reset
            </Button>
        }
    </Banner>
}

export default ResultBanner;