import { createStyles } from '@mantine/core';
import { KeyboardEvent } from 'react';
import { restart, setEnableSolver, setMineNum, setSizeGrid } from '../redux/gameState/gameStateStore';
import { useDispatch } from "react-redux";
import { OnboardingButton } from './OnboardingButton';

interface propsAppInitType {
  renderGrid: () => void,
}

export const Onboarding = ({
  renderGrid,
}: propsAppInitType) => {

  const { classes } = useStyles();
  const dispatch = useDispatch();

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 's' || event.key === 'S'){
      dispatch(restart());
      renderGrid();
    }
  }

  return (
    <div  
      className={classes.background} 
      id="background"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className={classes.container}>
        <OnboardingButton size="10vmin" handleClick={() => dispatch(setSizeGrid(5))}/>
        <OnboardingButton handleClick={() => dispatch(setSizeGrid(10))}/>
        <OnboardingButton size="30vmin" handleClick={() => dispatch(setSizeGrid(15))}/>
      </div>
      <div className={classes.container}>
        <OnboardingButton fontSize="3vmin" content="💣" handleClick={() => dispatch(setMineNum(10/100))}/>
        <OnboardingButton fontSize="8vmin" content="💣" handleClick={() => dispatch(setMineNum(15/100))}/>
        <OnboardingButton fontSize="13vmin" content="💣" handleClick={() => dispatch(setMineNum(20/100))}/>
      </div>
      <div className={classes.container}>
        <OnboardingButton content="🤖"handleClick={() => dispatch(setEnableSolver(false))}/>
        <OnboardingButton content="👌"handleClick={() => {dispatch(restart()); renderGrid();}}/>
      </div>
    </div >
  )
}

const useStyles = createStyles((theme) => ({
  background: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#6A381F',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "100%",
    height: "100vh",
    "& > span" : {
      color: '#b38c78',
      fontSize: "30px",
    }
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80vh"
  },
}));
