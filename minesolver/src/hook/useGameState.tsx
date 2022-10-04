import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { GameStateState } from "../redux/gameState/gameStateStore";

const useGameState = (): GameStateState => {
  const gameState: GameStateState = useSelector(
    (state: RootState) => state.gameStateStore
  );
  return gameState;
};

export default useGameState;
