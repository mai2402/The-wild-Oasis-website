// function Spinner() {
//   console.log("i am working")
//   return <div className="spinner">

//       </div>;
// }

// export default Spinner;


function Spinner() {
  return (
    <div className="flex items-center justify-center h-full"> {/* Flexbox centering */}
      <div className="w-16 h-16 border-8 border-primary-900 border-t-primary-200 rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;


