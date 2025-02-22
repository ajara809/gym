import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './components/demo.jsx'
import Login from './components/login1.jsx'
import Sign from './components/sign.jsx'
import Admin from './components/admin.jsx'
import Home from './components/home.jsx'
import Class from './components/classes.jsx'
import Product from './components/product.jsx'
import Blog from '../src/components/blogs.jsx'
import Join from './components/join.jsx'
import WL from './components/wl.jsx'
import Yoga from './components/yoga.jsx'
import Cardio from './components/cardio.jsx'
import BB from './components/bb.jsx'
import Hyper from './components/hyper.jsx'
import Omega from './components/omega.jsx'
import Whey from './components/whey.jsx'
import Creatine from './components/creatine.jsx'
import Bcaa from './components/bcaa.jsx'
import Caffine from './components/caffine.jsx'
import Mv from './components/multi.jsx'
import Electro from './components/electro.jsx'

function App() {
          
      return(
        <Router>
          <Routes>
            <Route path="/" element={<Demo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/class" element={<Class />} />
            <Route path="/product" element={<Product />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/join" element={<Join />} />
            <Route path="/WL" element={<WL />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/cardio" element={<Cardio />} />
            <Route path="/bb" element={<BB />} />
            <Route path="/hyper" element={<Hyper />} />
            <Route path="/omega" element={<Omega />} />
            <Route path="/whey" element={<Whey />} />
            <Route path="/creatine" element={<Creatine />} />
            <Route path="/bcaa" element={<Bcaa />} />
            <Route path="/caffine" element={<Caffine />} />
            <Route path="/mv" element={<Mv />} />
            <Route path="/el" element={<Electro />} />
          </Routes>
        </Router>
      );
}

export default App
