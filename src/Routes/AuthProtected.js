import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

import { useProfile } from "../Components/Hooks/UserHooks";
import { useDispatch } from 'react-redux';
import { changeLeftsidebarSizeType } from "../store/actions";

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();

  /*
    redirect is un-auth access protected routes via url
    */

  if (!userProfile && loading) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
  return <>{props.children}</>;
};
const AccessRoute = ({ component: Component,permission , location, sidebarSize, ...rest }) => {

    let CryptoJS = require("crypto-js");

    let encrypted = localStorage.getItem('permissions')?localStorage.getItem('permissions'):"";

    let decrypted = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_ENCRYPTION_KEY);

    let permissions = decrypted.toString(CryptoJS.enc.Utf8);
    

    if(permissions.includes("all")){
        return (
            <Route
            {...rest}
            render={props => {
                return (<> <Component {...props} /> </>);
            }}
            />
        );
    }else{
        if(permissions.includes(permission)){
            return (
                <Route
                {...rest}
                render={props => {
                    return (<> <Component {...props} /> </>);
                }}
                />
            );
        }
        else if(permission == 'all'){
            return (
                <Route
                {...rest}
                render={props => {
                    return (<> <Component {...props} /> </>);
                }}
                />
            );
        }
        else{
            return (
                <Redirect to={{ pathname: "/auth-404-cover", state: { from:location } }} />
              );
        }
    }


};

export { AuthProtected, AccessRoute };
