import React from 'react';
import Usernav from '../components/UserNavbar';
import { useAuth } from '../contexts/Authcontext';

const Explore = () => {
  const { currentuser } = useAuth();

  console.log(currentuser);

  return (
    <React.Fragment>
      <Usernav />
    </React.Fragment>
  );
};

export default Explore;
