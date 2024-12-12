import SideBar from '../components/Admin/SideBar';
import UserList from '../components/Admin/UserList';



function Users() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <SideBar />
      </div>
      <div className="w-4/5">
        <UserList />
      </div>

    </div>
  );
}

export default Users;
