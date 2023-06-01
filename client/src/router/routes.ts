import Main from "../pages/Main";
import Objects from "../pages/Objects";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Activation from "../pages/Register/Activation";
import Account from "../pages/Account/Account";
import ChangeInfo from "../pages/Account/ChangeInfo";
import ChangePassword from "../pages/Account/ChangePassword";
import ForgotPass from "../pages/ForgotPassword/ForgotPass";
import ForgotPassCode from "../pages/ForgotPassword/ForgotPassCode";
import ChangeFoto from "../pages/Account/ChangeFoto";

export const privateRoutes = [
    {path:"/", component: Main, exact: true},
    {path:"/objects", component: Objects, exact: true},
    {path: "/account", component: Account, exact: true},
    {path: "/account/change", component: ChangeInfo, exact: true},
    {path: "/account/password", component: ChangePassword, exact: true},
    {path: "/account/foto", component: ChangeFoto, exact: true}
]

export const publicRoutes = [
    {path:"/", component: Main, exact: true},
    {path:"/login", component: Login, exact: true},
    {path: "/activation", component: Activation, exact: true},
    {path:"/register", component: Register, exact: true},
    {path: "/forgotPass", component: ForgotPass, exact: true},
    {path: "/forgotPass/code", component: ForgotPassCode, exact: true}
]