import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Watch from './pages/Watch';
import DaftarAnime from './pages/DaftarAnime';
import DetailAnime from './pages/DetailAnime';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveHistory } from './features/historySlice';
import TerakhirDitonton from './pages/TerakhirDitonton';
import NotFound from './pages/NotFound';

function App() {
  const [currentPage, setCurrentPage] = useState(null)
  const dispatch = useDispatch()
  // const apiUrl = 'http://localhost:3000'
  const apiUrl = 'https://yappstreamapi.herokuapp.com'

  useEffect(() => {
    axios.get('https://ipapi.co/json/').then(res => {
      if (res.data.ip) {
        axios.get(apiUrl + '/histories/' + res.data.ip).then(resHistory => {
          if (!resHistory.data) {
            axios.post(apiUrl + '/histories/', {
              ip: res.data.ip
            }).then(resPost => {
              dispatch(saveHistory(resPost.data))
            })
          } else {
            dispatch(saveHistory(resHistory.data))
          }
        })
      }
    })
  }, [])


  return (
    <div className='bg-dark text-light'>
      <Router>
        <div className="app">
          <div className="app__body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch" element={<Watch />} /> // Use redux
              <Route path="/terakhir-ditonton" element={<TerakhirDitonton />} />
              <Route path="/daftar-anime" element={<DaftarAnime />} />
              <Route path="/detail-anime/:id" element={<DetailAnime />} /> // Use state
              <Route path="*" element={<NotFound />} /> // Not FOund
            </Routes>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default App;
