import React from 'react';
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from './components';
import { themeStore } from './store/StoreList';

// 메인 App 컴포넌트
const App: React.FC = () => {
  const { theme } = themeStore.useStore();

  return (
    <div
      className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};

export default App;
