import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [canProceed, setCanProceed] = useState(true);

  useEffect(() => {
    if (sessionStorage.Newtoken) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, []);

  return <>{canProceed ? children : navigate("/")}</>;
};
export default ProtectedRoute;
