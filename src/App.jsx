import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watch from './pages/Watch';
import DaftarAnime from './pages/DaftarAnime';
import DetailAnime from './pages/DetailAnime';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveHistory } from './features/historySlice';
import TerakhirDitonton from './pages/TerakhirDitonton';
import NotFound from './pages/NotFound';
import { v4 as uuidv4 } from 'uuid'
import JadwalTayang from './pages/JadwalTayang';
import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen';
import Aos from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
Aos.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
})

function App() {
  const dispatch = useDispatch()
  const apiUrl = useSelector(state => state.api.apiUrl)

  useEffect(() => {
    const fetchData = async () => {
      AndroidFullScreen.isImmersiveModeSupported()
        .then(() => AndroidFullScreen.immersiveMode())
        .catch(console.warn);

      if (!localStorage.getItem('device')) {
        localStorage.setItem('device', uuidv4())
      }

      const device = await localStorage.getItem('device')

      const getHistory = await axios.get(apiUrl + '/histories/' + device)
      if (!getHistory.data) {
        const postHistory = await axios.post(apiUrl + '/histories/', {
          ip: device
        })
        dispatch(saveHistory(postHistory.data))
      } else {
        dispatch(saveHistory(getHistory.data))
      }
    }
    fetchData()
  }, [])


  return (
    <div className='bg-dark text-light'>
      <Router>
        <div className="app">
          <div className="app__body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<Watch />} /> // Use redux
              <Route path="/terakhir-ditonton" element={<TerakhirDitonton />} />
              <Route path="/daftar-anime" element={<DaftarAnime />} />
              <Route path="/jadwal-tayang" element={<JadwalTayang />} />
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
