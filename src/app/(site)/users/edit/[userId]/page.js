import HomeLayout from "../../../../Layouts/MainLayout";
import EditUserForm from "../../../../Containers/Users/edit/EditUserForm";

const EditUser = ({ params }) => {
  const { userId } = params;

  return (
    <HomeLayout headerTitle={"Users"}>
      <EditUserForm userId={userId} />;
    </HomeLayout>
  );
};

export default EditUser;
