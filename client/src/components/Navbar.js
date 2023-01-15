import '../style/Navbar.css';
import contentType from '../assets/content-type-title.json'
import homeIcon from '../assets/icons/home.png'
import animeIcon from '../assets/icons/anime.png'
import mangaIcon from '../assets/icons/manga.png'
import movieIcon from '../assets/icons/movie.png'
import tvIcon from '../assets/icons/tv.png'
import bookIcon from '../assets/icons/book.png'
import audioBookIcon from '../assets/icons/audio-book.png'
import webtoonIcon from '../assets/icons/webtoon.png'
import documentaryIcon from '../assets/icons/documentary.png'
import songsIcon from '../assets/icons/song.png'
import { useState } from 'react';
import Navtab from './Navtab';
import {generateID} from '../generateID'

export default function Navbar() {
  const icons = [homeIcon, animeIcon, mangaIcon, movieIcon, tvIcon, bookIcon, audioBookIcon, webtoonIcon, documentaryIcon, songsIcon]

  let initialNavbarWidth = "5rem";

  const [navbarWidth, setNavbarWidth] = useState(initialNavbarWidth);
  
  function navbarExpand() {
    setNavbarWidth("20rem");
  }
  function navbarRetract() {
    setNavbarWidth(initialNavbarWidth);
  }

  const [currentSelected, setCurrentSelected] = useState( parseInt(localStorage.getItem("selected"),10 ) || 0 );
  
  function handleClick(endpoint, e) {
    let x = 0
    for( let i in contentType ) {
      if( endpoint === contentType[i].title ) { x = i; break; }
    }
    setCurrentSelected(parseInt(x,10));
    localStorage.setItem("selected",parseInt(x,10));
  }

  let contentTypeElements = contentType.map( (item,idx) => {
    let endpoint = item.title.toLowerCase().replace(" ","-");
    endpoint = endpoint === "home" ? "" : endpoint;
    return (
        <Navtab
          key = {generateID()}
          selectCurrent = {currentSelected  === idx}
          endpoint = {endpoint}
          handleClick = {handleClick}
          icon = {icons[idx]}
          renderName = {navbarWidth !== initialNavbarWidth}
          title = {item.title}
        />
  )} );

  return (
    <>
      <div className="navbar" style={{width:navbarWidth}} onMouseEnter={navbarExpand} onMouseLeave={navbarRetract}>
          {contentTypeElements}
      </div>
    </>
  );
}


