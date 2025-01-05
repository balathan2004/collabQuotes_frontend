import "./App.css";
import Login from "@components/pages/login";
import SignUp from "@components/pages/register";
import Blog from "@components/pages/blog";
import Tweet from "@components/pages/tweet";
import ContextWrapper from "@components/context/context_wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarHolder from "@components/context/navbar_context";
import UserContextHolder from "@components/context/user_context";
import PageNotFound from "@components/pages/not_found";
import ReplyHolder from "@components/context/reply_context";
import Account from "@components/pages/account";
import About from "@components/pages/about";
import Home from "@components/pages/home";
import Profile from "@components/pages/profile";
import LoadingHolder from "@components/context/loading_context";
import AdminBlukTweet from "@components/pages/admin";
import AccountVerification from "@components/pages/verifyAccount";
import ResetPassword from "@components/pages/reset-password";
import ChangePassword from "@components/pages/change_password";
import RequestVerification from "@components/pages/request_verification"


function App() {
  return (
    <div className="container-fluid pt-5 root_container">
      <BrowserRouter>
        <UserContextHolder>
          <NavbarHolder>
            <ReplyHolder>
              <LoadingHolder>
                <ContextWrapper>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tweet" element={<Tweet />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                      path="/auth/verify"
                      element={<AccountVerification />}
                    />

                    <Route
                      path="/auth/reset-password"
                      element={<ResetPassword />}
                    />

                    <Route
                      path="/auth/change-password"
                      element={<ChangePassword />}
                    />

                     <Route
                      path="/auth/request-verification"
                      element={<RequestVerification />}
                    />

                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<SignUp />} />
                    <Route
                      path="/admin/light/secure"
                      element={<AdminBlukTweet />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </ContextWrapper>
              </LoadingHolder>
            </ReplyHolder>
          </NavbarHolder>
        </UserContextHolder>
      </BrowserRouter>
    </div>
  );
}

export default App;
