import '../style/App.css'; // import css
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MdAdd } from "react-icons/md";

// import components
import Navbar from './Navbar';
import ListPage from './pages/ListPage'
import AddOrUpdateElementPage from './pages/AddOrUpdateElementPage'
import ShowElementPage from './pages/ShowElementPage';
import HomePage from './pages/HomePage'

// export App component
export default function App() {

  return (
    <div className='app-container'>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>

        <Route path='/anime' element={<ListPage type="anime" />}/>
        <Route path='/anime/:id' element={<ShowElementPage type="anime" deed="Watch" />}/>
        <Route path='/anime/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/manga' element={<ListPage type="manga" />}/>
        <Route path='/manga/:id' element={<ShowElementPage type="manga" deed="Read" />}/>
        <Route path='/manga/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/movie' element={<ListPage type="movie" />}/>
        <Route path='/movie/:id' element={<ShowElementPage type="movie" deed="Watch" />}/>
        <Route path='/movie/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/tv-series' element={<ListPage type="tv-series" />}/>
        <Route path='/tv-series/:id' element={<ShowElementPage type="tv-series" deed="Watch" />}/>
        <Route path='/tv-series/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/book' element={<ListPage type="book" />}/>
        <Route path='/book/:id' element={<ShowElementPage type="book" deed="Read" />}/>
        <Route path='/book/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/audio-book' element={<ListPage type="audio-book" />}/>
        <Route path='/audio-book/:id' element={<ShowElementPage type="audio-book" deed="Listen" />}/>
        <Route path='/audio-book/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/webtoon' element={<ListPage type="webtoon" />}/>
        <Route path='/webtoon/:id' element={<ShowElementPage type="webtoon" deed="Read" />}/>
        <Route path='/webtoon/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/documentary' element={<ListPage type="documentary" />}/>
        <Route path='/documentary/:id' element={<ShowElementPage type="documentary" deed="Watch" />}/>
        <Route path='/documentary/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/songs' element={<ListPage type="songs" />}/>
        <Route path='/songs/:id' element={<ShowElementPage type="songs" deed="Listen" />}/>
        <Route path='/songs/:id/update' element={<AddOrUpdateElementPage requestType="Update" httpRequestType='PATCH' />}/>
        
        <Route path='/add-new' element={<AddOrUpdateElementPage requestType="Add New" httpRequestType='POST' />}/>
      </Routes>
      <Link to={"/add-new"}>
      <div className="add-new-btn">
        <MdAdd className='add-icon' />
      </div>
      </Link>
    </BrowserRouter>
    </div>
  );
}