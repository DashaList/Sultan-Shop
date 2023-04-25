import './reset.css'
import './App.scss'
import Header from '../components/Header/Header'
import AppRouter from './AppRouter'
import HeaderNav from '../components/HeaderNav/HeaderNav'
import Footer from '../components/Footer/Footer'
import AdminButton from '../components/UI/AdminButton/AdminButton'

function App() {

  return (    
    <>
      <HeaderNav></HeaderNav>
      <Header></Header>
      <AdminButton></AdminButton>
      <AppRouter/>
      <Footer></Footer>
    </>
  )
}

export default App
