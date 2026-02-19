import { logout } from "../services/logout";

const Logout = () => {
  const handleLogout = async () => {
    await logout();
navigate("./LandingPage"); // 🔑 BACK TO DASHBOARD / LANDING
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-700 text-white rounded"
    >
      Logout
    </button>
  );
};

export default Logout;

