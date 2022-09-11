import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout'
import React, { Suspense } from 'react';
import './App.css';
const Hour = React.lazy(() => import('./pages/Hour'))
const Week = React.lazy(() => import('./pages/Week'))
const Today = React.lazy(() => import('./pages/Today'))

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path='/' element={
          <Suspense fallback={<div>Loading...</div>}>
            <MainLayout/>
          </Suspense>
        }>
          <Route index element={
              <Today/>
          }/>
          <Route path='week' element={
            <Suspense fallback={<div>Loading...</div>}>
              <Week/>
            </Suspense>
          }/>
          <Route path='hour' x element={
            <Suspense fallback={<div>Loading...</div>}>
              <Hour/>
            </Suspense>
          }/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
