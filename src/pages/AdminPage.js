import SideBar from '../components/Admin/SideBar';
import DashBoard from '../components/Admin/DashBoard';



function AdminPage() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <SideBar />
      </div>
      <div className="w-4/5">
        <DashBoard />
      </div>

    </div>
  );
}

export default AdminPage;
