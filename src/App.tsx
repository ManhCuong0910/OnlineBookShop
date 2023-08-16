import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount } from "./apis/auth.api";
import { doGetAccountAction } from "./redux/account/accountSlice";
import { RootState } from "./redux/store";
import useRouteElements from "./useRouteElements";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.account);
  console.log("file: App.tsx:11 ~ App ~ isAuthenticated:", isAuthenticated);
  const getAccount = async () => {
    const res = await fetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data.data.user));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const routeElements = useRouteElements();
  return <> {routeElements}</>;
}

export default App;
