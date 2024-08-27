import React from "react";
import {Banner, CustomButton} from "./CustomComponents";

const ResultBanner = ({state, onResetGame}) => {
    return <Banner data-testid="banner" isWin={state.matches('won')}>
        {state.matches('won') && <p>Player {state.context.currentPlayer} WIN!</p>}
        {state.matches('draw') && <p>Draw!</p>}
        {(state.matches('won') || state.matches('draw')) &&
            <CustomButton onClick={onResetGame}>
                Reset
            </CustomButton>
        }
    </Banner>
}

export default ResultBanner;