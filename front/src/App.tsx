import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import PageLoader from './components/ui/PageLoader'
import { CurrentContext } from './utlis/Context'
import Header from './components/Header'
import { UserData } from './utlis/types'
const PageRooms = lazy(() => import('./components/page-rooms/PageRooms'))
const PageLobby = lazy(() => import('./components/page-lobby/PageLobby'))
const PageMain = lazy(() => import('./components/page-main/PageMain'))






function App() {
  const [userData, setUserData] = useState<UserData>({ name: `staticUser-${new Date().getTime()}`, avatar: '', id: `${new Date().getTime()}` })
  const [isTelegram, setIsTelegram] = useState<null | boolean>(null)
  function changeUserName(str: string) {
    setUserData({ ...userData, name: str })
  }
  useEffect(() => {

    if (window.Telegram.WebApp?.initDataUnsafe?.user?.id) {
      console.log('user::',window.Telegram.WebApp.initDataUnsafe.user);
      setUserData({ name: window.Telegram.WebApp.initDataUnsafe.user.first_name, avatar: (window.Telegram.WebApp.initDataUnsafe?.user?.photo_url as string) || '', id: window.Telegram.WebApp.initDataUnsafe.user.id.toString() })
      setIsTelegram(true)
    }else{
      setIsTelegram(false)
    }
  }, [])

  return (
    <>
      <CurrentContext.Provider value={{ userData }}>
        <Header />
        <Suspense fallback={<PageLoader />}>
          {isTelegram !== null
            &&
            <Routes>
              <Route path='/' element={<PageMain changeUserName={changeUserName} isTelegram={isTelegram} />} />
              <Route path='/rooms' element={<PageRooms />} />
              <Route path='/lobby' element={<PageLobby />} />

            </Routes>
          }
        </Suspense>
      </CurrentContext.Provider>
    </>
  )
}

export default App
