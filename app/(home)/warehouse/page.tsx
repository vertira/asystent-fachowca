import { auth } from "@/auth";
import Warehouse from "@/components/warehouse/warehouse";

const WarehousePage = async () => {
  const authenticatedUser = await auth();
  return <Warehouse authenticatedUser={authenticatedUser} />;
};

export default WarehousePage;
