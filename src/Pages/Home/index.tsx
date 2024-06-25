import HomeDefault from "../HomeDefault";
import { useQuery } from "../../Utils/url";
import HomeBookFlip from "../HomeBookFlip";
import LogRocket from "logrocket";

const debugDeviceStorageKey = "debugdevice";

const Home = () => {
  const query = useQuery();
  const useBookFlipQuery = query.get("hometransition");

  const debugMode = !!query.get("debugmode");
  if (debugMode) {
    localStorage.setItem(debugDeviceStorageKey, "true");
  }
  const debugDevice = localStorage.getItem(debugDeviceStorageKey);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
  } else {
    if (!debugDevice) {
      LogRocket.init("jk0ilu/einvite");
    }
  }

  const useBookFlip = useBookFlipQuery === "1";
  if (useBookFlip) {
    return <HomeBookFlip />;
  }
  return <HomeDefault />;
};

export default Home;
