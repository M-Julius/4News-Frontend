import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

import DashboardOverview from "./dashboard/DashboardOverview";
import Signin from "./Signin";
import Signup from "./Signup";
import NotFoundPage from "./examples/NotFound";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Users from './dashboard/users/Users';
import Category from './dashboard/category/Category';
import News from './dashboard/news/News';
import CreateUser from './dashboard/users/CreateUser';
import DetailUser from './dashboard/users/DetailUser';
import EditUser from './dashboard/users/EditUser';
import CreateNews from './dashboard/news/CreateNews';
import DetailNews from './dashboard/news/DetailNews';
import EditNews from './dashboard/news/EditNews';
import CreateCategory from './dashboard/category/CreateCategory';
import EditCategory from './dashboard/category/EditCategory';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};
const isAuthenticated = () => {
  // Check local storage, cookie, or any other method to verify if the user is authenticated
  return !!localStorage.getItem('token');
};


const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      isAuthenticated() ? (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          </main>
        </>)
        :
        <Redirect to="/signin" />
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
    <RouteWithSidebar exact path={Routes.CreateUser.path} component={CreateUser} />
    <RouteWithSidebar exact path={Routes.DetailUser.path} component={DetailUser} />
    <RouteWithSidebar exact path={Routes.EditUser.path} component={EditUser} />
    <RouteWithSidebar exact path={Routes.Category.path} component={Category} />
    <RouteWithSidebar exact path={Routes.CreateCategory.path} component={CreateCategory} />
    <RouteWithSidebar exact path={Routes.EditCategory.path} component={EditCategory} />
    <RouteWithSidebar exact path={Routes.News.path} component={News} />
    <RouteWithSidebar exact path={Routes.CreateNews.path} component={CreateNews} />
    <RouteWithSidebar exact path={Routes.DetailNews.path} component={DetailNews} />
    <RouteWithSidebar exact path={Routes.EditNews.path} component={EditNews} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
