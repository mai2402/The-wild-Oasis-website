import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";
//import { unstable_noStore as noStore } from "next/cache";

async function CabinList({filter}) {
  // opting this component from caching data
  //  noStore();

    const cabins = await getCabins();
    if (!cabins.length) return null;

    let displayedCabins;

    // if (filter === "all")
    // {displayedCabins = cabins}
    // if (filter === "small"){
    //   displayedCabins = cabins.filter((cabin)=> cabin.maxCapacity <= 3)
    // }
    // if (filter === "medium"){
    //   displayedCabins = cabins.filter((cabin)=> cabin.maxCapacity >= 4  && cabin.maxCapacity <= 7)
    // }
    // if (filter === "large"){
    //   displayedCabins = cabins.filter((cabin)=> cabin.maxCapacity >= 8 )
    // }

    switch (filter) {
      case "all": {
        displayedCabins = cabins;
        break; // Stop further execution
      }
      case "small": {
        displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
        break;
      }
      case "medium": {
        displayedCabins = cabins.filter(
          (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
        );
        break;
      }
      case "large": {
        displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
        break;
      }
      default: {
        displayedCabins = cabins; // Fallback to show all cabins if no filter is matched
        break;
      }
    }

    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
}

export default CabinList
