import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import UserDatatable from "../../components/datatable/UserDatatable";
import RoomDatatable from "../../components/datatable/RoomDatatable";

const List = ({ columns, path }) => {
  console.log(path);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {path === "users" ? (
          <UserDatatable columns={columns} />
        ) : (
          <RoomDatatable columns={columns} />
        )}
      </div>
    </div>
  );
};

export default List;
