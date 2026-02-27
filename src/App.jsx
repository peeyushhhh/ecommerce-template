import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { LoadingScreen } from './components/layout/LoadingScreen'

const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <BrowserRouter>
          <div className='fixed top-0 left-0 right-0 z-50 flex flex-col'>
            <AnnouncementBar />
            <Navbar />
          </div>
          <Suspense fallback={<div className='min-h-screen bg-neutral-950' />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  )
}

export default App