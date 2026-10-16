import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Table from './components/Table'


function App() {
  return (
    <>
    <div className="container">
      <Header/>
      <Table/>
      <Footer/>
    </div>
    </>
  )
}

export default App
