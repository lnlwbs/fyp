
import InventoryNavBar from "../components/Admin/InventoryNavBar";
import SideBar from "../components/Admin/SideBar";
import ProductList from "../components/Admin/ProductList";

function Inventory(){
  return (
    <div>
        <div className="flex">
            <div className="w-1/5">
                <SideBar />
            </div>
            <div className="w-full p-6">
                <InventoryNavBar/>
                <ProductList />
        </div>
        </div>
    </div>
  );
};
export default Inventory;

