import { createStyles } from '@mantine/core';
import { KeyboardEvent } from 'react';
import { Grid } from './Grid';
import { useDispatch } from "react-redux";
import { restart } from '../redux/gameState/gameStateStore';

interface propsAppInitType {
  renderGrid: () => void,
}

export const App = ({
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
      <Grid renderGrid={renderGrid}/>
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
