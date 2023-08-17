import { Button, Input, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAccount } from "src/apis/auth.api";
import Logo from "src/assets/images/LogoTiki.png";
import path from "src/constants/path";
import { doLogoutAccount } from "src/redux/account/accountSlice";
import { RootState } from "src/redux/store";
import { clearLS } from "src/utils/auth";
export default function Header() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.account
  );

  const dispatch = useDispatch();
  const handleLogoutAccount = async () => {
    try {
      let res = await logoutAccount();
      res && clearLS();
      dispatch(doLogoutAccount());
    } catch (error) {
      console.log(error);
    }
  };
  const content = (
    <div className="text-center text-primary">
      <Link to="">Tài khoản</Link>
      <p
        className="cursor-pointer hover:text-[#69b1ff]"
        onClick={handleLogoutAccount}
      >
        Đăng xuất
      </p>
    </div>
  );
  return (
    <div className="container">
      <div className="grid items-center grid-cols-12 gap-1">
        <div className="col-span-2 lg:col-span-1">
          <Link to={path.home}>
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-18 lg:w-22 lg:h-22"
            ></img>
          </Link>
        </div>
        <div className="flex-grow col-span-8 px-4 ">
          <div className="flex border border-blue-700 rounded-lg">
            <Input
              name="search"
              type="text"
              className="flex-grow px-3 py-1 text-xs text-black bg-transparent rounded-r-none sm:text-base"
              placeholder="Bạn cần tìm gì hôm nay"
            />
            <Button
              type="primary"
              className="h-full py-1 text-xs rounded-l-none w-18 rounded-r-md bg-primary sm:text-base"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-3">
          <div className="flex items-center justify-around text-primary">
            <Link
              to={path.home}
              className="items-center hidden lg:inline-flex "
            >
              <img
                src="src/assets/images/HomeLogo.png"
                className="inline w-6 h-6 mr-2"
                alt="HomeLogo"
              ></img>
              <span>Trang chủ</span>
            </Link>
            {isAuthenticated ? (
              <Link to="" className="items-center hidden md:inline-flex">
                <Popover content={content} placement="bottom">
                  <span>{user.fullName}</span>
                </Popover>
              </Link>
            ) : (
              <Link
                to={path.login}
                className="items-center hidden md:inline-flex"
              >
                <span>Đăng nhập</span>
              </Link>
            )}

            <Link to="" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span className="absolute left-[16px] top-[-12px] rounded-full bg-red-500 px-[9px] py-[1px] text-xs text-orange text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
