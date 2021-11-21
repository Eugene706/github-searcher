import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import UserPage from './pages/UserPage';
import { IUserInfoResponse } from './types/types';

function App() {
  const [pickedUserData, setPickedUserData] = useState<IUserInfoResponse | undefined>();

  return (
    <div className="App">
      <h1>GitHub Searcher</h1>
      <Routes>
        <Route path="/" element={<SearchPage setPickedUserData={setPickedUserData} />} />
        <Route path="/user" element={<UserPage userData={pickedUserData} />} />
      </Routes>
    </div>
  );
}

export default App;
