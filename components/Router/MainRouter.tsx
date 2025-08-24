import React from "react";
import Blog from "@components/pages/blog";
import PageNotFound from "@components/pages/not_found";
import About from "@components/pages/about";
import Home from "@components/pages/home";
import Profile from "@components/pages/profile";
import AdminBlukTweet from "@components/pages/admin";
import AuthRoutes from "@components/Router/AuthRoutes"
import ProtectedRoute from "@components/Router/UserRoutes"
import Tweet from '../pages/tweet'
import Account from '../pages/account'

import { Route, Routes } from "react-router-dom";

export default function router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
     
      <Route path="/profile" element={<Profile />} />

      {AuthRoutes()}
      
          <Route path="/tweet" element={<ProtectedRoute><Tweet /></ProtectedRoute>} />
         <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      <Route path="/admin/light/secure" element={<AdminBlukTweet />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
