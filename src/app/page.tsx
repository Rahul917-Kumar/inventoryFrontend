
import AllItems from "./components/allItems";
import Navbar from "./components/navbar";
import TotalCost from "./components/totalCost";
export default function Home() {
  return (
    <div>
        <Navbar />
          <AllItems />
        <TotalCost/>
    </div>
  );
}
