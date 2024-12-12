import OrderNavBar from "../components/Admin/OrderNavBar";
import SideBar from "../components/Admin/SideBar";
import OrderList from "../components/Admin/OrderList";
import OrderData from "../components/Admin/OrderData";

function Order(){
  return (
    <div>
        <div className="flex">
            <div className="w-1/5">
                <SideBar />
            </div>
            <div className="w-full p-6">

                <OrderList />
                <OrderData/>
        </div>
        </div>
    </div>
  );
};
export default Order;

