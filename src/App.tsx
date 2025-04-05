import React, { useState, useMemo, useCallback } from 'react';
import { generateItems } from './utils';
import { AppContext, AppContextType } from './context/AppContext';
import { User, Notification } from './type/types';
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from './components';
// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [items, setItems] = useState(generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const login = (email: string) => {
    setUser({ id: 1, name: '홍길동', email });
    addNotification('성공적으로 로그인되었습니다', 'success');
  };

  const logout = () => {
    setUser(null);
    addNotification('로그아웃되었습니다', 'info');
  };

  const addNotification = (message: string, type: Notification['type']) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const contextValue = useMemo(
    () => ({
      // user,
      // login,
      // logout,
      notifications,
      addNotification,
      removeNotification,
    }),
    [user, notifications] // theme 관련 값들은 제외
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}
      >
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          login={login}
          logout={logout}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList
                items={items}
                onAddItemsClick={addItems}
                theme={theme}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    </AppContext.Provider>
  );
};

export default App;
