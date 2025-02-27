'use client';
import { useState, useContext, createContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    const getUnreadMessageCountAsync = async () => {
      if (session && session.user) {
        try {
          const res = await getUnreadMessageCount();
          if (res.count) setUnreadCount(res.count);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getUnreadMessageCountAsync();
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
