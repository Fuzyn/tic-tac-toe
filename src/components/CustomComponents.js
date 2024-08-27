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

export const CustomButton = styled.button`
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px ;
  padding: 5px;
`

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 20px;
`;

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.size}, clamp(40px, 100px, 15vw))`};
  grid-template-rows: ${props => `repeat(${props.size}, clamp(40px, 100px, 15vw))`};
  gap: 5px;
`;

export const Banner = styled.div`
  position: absolute;
  top: 100px;
  width: clamp(300px, 90vw, 600px);
  text-align: center;
  background: ${props => `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, ${props.isWin ? 'rgba(21, 255, 25, 0.9)' : 'rgba(236, 255, 95, 0.9)'} 25%, ${props.isWin ? 'rgba(21, 255, 25, 0.9)' : 'rgba(236, 255, 95, 0.9)'} 75%, rgba(255, 255, 255, 0) 100%)`};
  animation: ${fadeIn} 0.5s ease-out;
`;

export const SquareButton = styled.button`
  width: clamp(40px, 100px, 15vw);
  height: clamp(40px, 100px, 15vw);
  font-size: 34px;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  animation: ${fadeIn} 1s ease-out;
`;