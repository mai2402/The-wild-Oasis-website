// function Spinner() {
//   console.log("i am working")
//   return <div className="spinner">

//       </div>;
// }

// export default Spinner;


// margin: 3.2rem auto 1.6rem; 
// width: 60px; 
// aspect-ratio: 1; 
// border-radius: 50%; 
// border: 8px solid theme('colors.primary.900'); 
// border-right-color: theme('colors.primary.200'); 
// animation: rotate 1s infinite linear;

function Spinner() {
  return (
    <div className="flex items-center justify-center h-full"> {/* Flexbox centering */}
      <div className="w-16 h-16 border-8 border-primary-900 border-t-primary-200 rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;


