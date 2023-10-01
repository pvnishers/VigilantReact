import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
    return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.Message);
              
                setCurrentUser({ fullName: data.name });
                console.log(currentUser);
              } else {
                console.error();
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setCurrentUser(null);
        } catch (error) {
            throw error;
        }
    };


    const register = async (username, password, confirmPassword, fullName) => {
        try {
          const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, confirmPassword, fullName }),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data.Message);
          } else {
            const errorData = await response.json();
            const errors = errorData.errors || ['An error occurred during registration.'];
            console.error(errors);
            console.log(errors);
            throw errors;
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      

    const value = {
        currentUser,
        login,
        logout,
        register,
    };

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};
