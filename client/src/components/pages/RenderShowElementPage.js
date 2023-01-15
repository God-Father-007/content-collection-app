import { useState } from 'react';
import '../../style/pageStyles/RenderShowElementPage.css'
import { MdStarRate,
  MdOutlineStarRate,
  MdDeleteOutline,
  MdUpdate,
  MdTaskAlt
} from "react-icons/md";
import { IconContext } from "react-icons";
import { Link, useLocation } from 'react-router-dom';
import AltPoster from '../../assets/img-poster-alt.jpg'
import useSearch from '../../hooks/useSearch';

// export Page component
export default function RenderShowElementPage(props) {

  const location = useLocation();

    const statusMap = {
      1:`Currently ${props.deed}ing`,
      2: props.type === "songs" ? "Listened" : "Completed",
      3:"On Hold",
      4:"Dropped",
      6:`Plan to ${props.deed}`,
    }
    const status = statusMap[props.data["status"]];
    const statusClass =  status.replaceAll(" ","-").replace("Watch","deed").replace("Read","deed").replace("Listen","deed");

    let starRating = []
    for( let i=0; i<props.data.rating; i++ ) {
      starRating[i] = (
        <IconContext.Provider key={i} value={{ color: "goldenrod", className: "rating-star-icon" }}>
          <MdStarRate />
        </IconContext.Provider>
      )
    }
    let starhollow = []
    for( let i=props.data.rating; i<10; i++ ) {
      starhollow[i] = (
        <IconContext.Provider key={i} value={{ color: "darkgrey", className: "rating-star-icon" }}>
          <MdOutlineStarRate />
        </IconContext.Provider>
      )
    }

    const [deleted, setDeleted] = useState(false)

    function handleClick(httpRequestType, e) {
      let deleteData = async () => {
        const response = await fetch(`/${props.type}/${props.data._id}`,{method: httpRequestType});
        if( response.ok ) { setDeleted( true ); }
      }
      deleteData();
      
    }
    
    const {data} = useSearch(`${props.data.title} ${props.type}`);

    return (
      <>
      {deleted && <div className='deleted-page'>
      <IconContext.Provider value={{ color: "green", size: 100, className: "rating-star-icon" }}>
      <MdTaskAlt />
      </IconContext.Provider>
      <div>Deleted Successfully</div>
      </div>}
      {!deleted && <div className='detail-container'>
        <div className='image-container'>
          <img
            src={props.data.img !== "" ? props.data.img : AltPoster}
            alt=""
            className='element-image'
          />  
        </div>
        <div className='general-details'>
          <div className='element-miscellaneous-container'>
            <div className={`element-status ${statusClass}`}>{status}</div>
            <div className='element-rating'>
              <span className='rating-numerical'>{props.data.rating}/10</span>
              <div className='rating-star-container'>
                {starRating && starRating}
                {starhollow && starhollow}
              </div>
            </div>
            <div className='btn-container'>
              <div className='update-btn-container'>
              <Link to={`${location.pathname}/update`} >
                <button className='update-btn'>
                  <IconContext.Provider value={{ color: "white", className: "update-icon" }}>
                    <MdUpdate />
                  </IconContext.Provider>
                  <span>Update</span>
                </button>
              </Link>
              </div>
              <div className='delete-btn-container' onClick={handleClick.bind(this,"DELETE")}>
                <button className='delete-btn'>
                  <IconContext.Provider value={{ color: "white", className: "delete-icon" }}>
                    <MdDeleteOutline />
                  </IconContext.Provider>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
          <div className='detail-item'>
            <div className='detail-item-key'>Title</div>
            <div className='detail-item-value'>{props.data.title}</div>
          </div>
          <div className='detail-item'>
            <div className='detail-item-key'>English Title</div>
            <div className={`detail-item-value${props.data.title_eng !== "" ? "" : " empty"}`}
            >{props.data.title_eng !== "" ? props.data.title_eng : "(No English Title)"}</div>
          </div>
          <div className='detail-item'>
            <div className='detail-item-key'>Comment</div>
            <div className={`detail-item-value${props.data.comment !== "" ? "" : " empty"}`}
            >{props.data.comment !== "" ? props.data.comment : "(No Comment)"}</div>
          </div>
        </div>
        <div className='info-from-api'>
          <h1>Know more:</h1>
          {data && data.items.map((item,idx) => (
            <a href={item?.link} target="_blank" rel="noreferrer" key={idx} >
            <div className='api-info-item'>
              <h3>{item?.title}</h3>
              <p>{item?.snippet}</p>
            </div>
            </a>
          ))}
        </div>
      </div>}
      </>
    );
  }