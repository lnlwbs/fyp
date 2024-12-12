import { Outlet } from "react-router-dom";
import InventoryNavBar from "../components/Admin/InventoryNavBar";
import SideBar from "../components/Admin/SideBar";

function Products(){
  return (
    <div>
        <div className="flex">
            <div className="w-1/5">
                <SideBar />
            </div>
            <div className="w-full p-6">
                <InventoryNavBar />
                <Outlet />
        </div>
        </div>
    </div>
  );
};
export default Products;

