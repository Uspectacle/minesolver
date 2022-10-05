import { Button, createStyles } from "@mantine/core";

interface propsOnboardingButtonType {
    size?: string,
    fontSize?: string,
    content?: string,
    handleClick?: () => void,
  }


export const OnboardingButton = ({
    size = "20vmin",
    fontSize = "10vmin",
    content = "",
    handleClick = () => {},
}: propsOnboardingButtonType) => {
    const { classes } = useStyles();

    return (
        <Button 
            className={classes.button} 
            onClick={handleClick} 
            style={{
                width: size, 
                height: size, 
                fontSize: fontSize, 
            }}
        >
            {content}
        </Button>
    )
}

const useStyles = createStyles((theme) => ({
  button: {
    aspectRatio: "1",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
	  fontWeight: "bold",
    userSelect: "none",
    // fontFamily: 'Bowlby One SC',
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    backgroundColor: "#DCAB6B",
    '&:hover': {
        backgroundColor: theme.fn.darken("#DCAB6B", 0.1),
    }
  },
}));
