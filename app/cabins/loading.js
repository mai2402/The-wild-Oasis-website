import Spinner from "../_components/Spinner";



function Loading() {
        console.log("loading")
       
    return (
    <div 
           className="grid justify-center items-center"
           >
        <Spinner/>
        <p>loading cabin data...</p>
        </div>)
}

export default Loading;
