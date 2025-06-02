import AdminLoginDetails from "../../components/Admin/AdminLoginDetails";
import Hero from "../../components/Landing/Hero";

const AdminLogin = () => {
  return (
    <>
      <Hero
        heading={"Admin"}
        text={"Manage website content"}
        image={"aboutmain"}
        bgImage={"aboutmainbg"}
      />
      <AdminLoginDetails />
    </>
  );
};

export default AdminLogin;
