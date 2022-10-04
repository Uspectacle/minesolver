import { createStyles } from '@mantine/core';
import { KeyboardEvent } from 'react';
import { restart } from '../redux/gameState/gameStateStore';
import { useDispatch } from "react-redux";

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
      {/* Press Space to Open/Close this Menu <br /> */}
      <span>
        Press the <strong>S</strong> key to Start / Restart
      </span>
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
}));
