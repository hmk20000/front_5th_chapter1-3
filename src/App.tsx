import React, { useState } from 'react';
import { generateItems } from './utils';
import { User, Notification } from './type/types';
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from './components';
import { useCallback } from './@lib';

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [items, setItems] = useState(() => generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: '홍길동', email });
    addNotification('성공적으로 로그인되었습니다', 'success');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification('로그아웃되었습니다', 'info');
  }, []);

  const addNotification = useCallback(
    (message: string, type: Notification['type']) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [user, notifications]
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  return (
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
            <ItemList items={items} onAddItemsClick={addItems} theme={theme} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm addNotification={addNotification} />
          </div>
        </div>
      </div>
      <NotificationSystem
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
};

export default App;
