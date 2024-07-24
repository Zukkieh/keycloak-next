"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'quickstart',
  clientId: 'test-cli',
};

const keycloak = new Keycloak({...keycloakConfig, });

const LoginPage = () => {
  const handleLogin = async () => {
      const response = await axios.post('/api/auth/login', {
        user: 'alice', // Replace with actual email from form
        password: 'newpas', // Replace with actual password from form
      });

      console.log('Authenticated successfully', response.data);

      if (response.data === 'Account is not fully set up') {
        keycloak.login({
          redirectUri: "http://localhost:3000/"
        });
      }
  };

  const handleLogout = async () => {
    keycloak.logout();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const authenticated = await keycloak.init({ onLoad: 'check-sso' });
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
      } catch (error) {
        console.log("ERRRRRRORROROROR", error)
      }
    }
    load();
  }, []);

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;