import HomeDefault from "../HomeDefault";
import { useQuery } from "../../Utils/url";
import HomeBookFlip from "../HomeBookFlip";

const Home = () => {
  const query = useQuery();
  const useBookFlipQuery = query.get("hometransition");

  const useBookFlip = useBookFlipQuery === "1";
  if (useBookFlip) {
    return <HomeBookFlip />;
  }
  return <HomeDefault />;
};

export default Home;
