import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAccount } from "./apis/auth.api";
import { doGetAccountAction } from "./redux/account/accountSlice";
import useRouteElements from "./useRouteElements";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAccount = async () => {
      try {
        const res = await fetchAccount();
        if (res && res.data) {
          dispatch(doGetAccountAction(res.data.data.user));
        }
      } catch (error) {}
    };
    getAccount();
  }, []);
  const routeElements = useRouteElements();
  return <div> {routeElements}</div>;
}

export default App;
