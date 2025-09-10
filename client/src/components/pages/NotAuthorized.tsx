import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
};

export default NotAuthorized;
