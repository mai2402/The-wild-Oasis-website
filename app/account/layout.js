import SideNavigation from "../_components/SideNavigation"



export default function Page({children}){


return(

<div className="grid grid-cols-[16rem_1fr] gap12">
    <SideNavigation/>
  
<div className="py-1"> {children}</div>

</div>
)}