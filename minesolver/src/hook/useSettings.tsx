import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { SettingsState } from "../redux/settings/settingsStore";

const useSettings = (): SettingsState => {
  const settings: SettingsState = useSelector(
    (state: RootState) => state.settingsStore
  );
  return settings;
};

export default useSettings;
