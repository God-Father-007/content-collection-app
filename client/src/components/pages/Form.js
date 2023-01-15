import { useEffect, useState } from 'react'; // import useState
import { useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert'
import '../../style/pageStyles/Form.css'


// export Page component
export default function Form(props) {

  const [formData, setFormData] = useState({
    collection: "anime",
    status: "1",
    title: "",
    title_eng: "",
    img: "",
    rating: "10",
    comment: ""
  });

  const alert = useAlert();
  const location = useLocation();
  useEffect( () => {

    if( props.httpRequestType === 'PATCH' ) {
      const arr = location.pathname.split("/");
      const type = arr[1];
      const id = arr[2].replace(":id=","");
      const fetchData = async() => {
        const response = await fetch(`/${type}/${id}`);
        const json = await response.json();
        if( response.ok ) {
          setFormData({
              collection: `${type}`,
              status: `${json.status}`,
              title: `${json.title}`,
              title_eng: `${json.title_eng}`,
              img: `${json.img}`,
              rating: `${json.rating}`,
              comment: `${json.comment}`
          });
        }
      }
      fetchData();
    } else {
      setFormData({
        collection: "anime",
        status: "1",
        title: "",
        title_eng: "",
        img: "",
        rating: "10",
        comment: ""
      })
    }
  },[location.pathname, props.httpRequestType]);
  
  async function handleSubmit(e) {
    e.preventDefault();
    let toPost = {};
    if( props.httpRequestType === 'POST' ) {
      toPost = {
        collection : formData.collection,
        data : { ...formData }
      };
      delete toPost.data.collection;
      toPost.data.status = parseInt(toPost.data.status,10);
      toPost.data.rating = parseInt(toPost.data.rating,10);
    } else {
      toPost = { ...formData };
      toPost.status = parseInt(toPost.status,10);
      toPost.rating = parseInt(toPost.rating,10);
    }
    const res = props.addOrUpdateElement.bind(this,toPost);
    await res();
    alert.show(`${props.httpRequestType === 'POST' ? "Added" : "Updated"} Successfully`)
  }

  function handleChange(e) {
    setFormData( previousState => {
      return {
        ...previousState,
        [e.target.name]: e.target.value
      }
    } );
  }

  function handleClick(e) {
    let target = e.target.className;
    if( target === "focussed" ){ return; }
    e.target.className = e.target.className + "focussed"
  }

  function handleBlur(e) {
    e.target.className = "";
  }

  let deed = "";
  switch( formData.collection ) {
    case "Manga":
      deed = "Read"; break;
    case "Book":
      deed = "Read"; break;
    case "Webtoon":
      deed = "Read"; break;
    case "Audio Book":
      deed = "Listen"; break;
    case "Songs":
      deed = "Listen"; break;
    default:
      deed = "Watch"
  }

  return (
    <div className='form-container'>
    <div className='new-element-form'>
      <div className='form-header'>{props.keyword} Element</div>
      <form onSubmit={handleSubmit}>
        <label>
          Content Type:
          <br />
          <select 
            disabled={props.httpRequestType === 'PATCH'}
            name={`collection${props.httpRequestType === 'PATCH' ? " disabled" : ""}`}
            value={formData.collection} 
            onChange={handleChange} 
            onClick={handleClick}
            onBlur={handleBlur}
          >
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
            <option value="movie">Movie</option>
            <option value="tv-series">TV Series</option>
            <option value="book">Book</option>
            <option value="audio-book">Audio Book</option>
            <option value="webtoon">Webtoon</option>
            <option value="documentary">Documentary</option>
            <option value="songs">Songs</option>
          </select>
        </label>
        <br />
        <label>
          Status:
          <br />
          <select 
            name='status' 
            value={formData.status} 
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
          >
            {formData.collection !== "Songs" && <option value={1}>Currently {deed}ing</option>}
            {formData.collection !== "Songs" && <option value={2}>Completed</option>}
            <option value={3}>On Hold</option>
            <option value={4}>Dropped</option>
            <option value={6}>Plan to {deed}</option>
          </select>
        </label>
        <br />
        <label>
          Title:
          <br />
          <input
            required={true}
            type="text"
            placeholder="Enter title here"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
            />
        </label>
        <br />
        <label>
          Title (English):
          <br />
          <input
            type="text"
            placeholder="Enter title in english here"
            name="title_eng"
            value={formData.title_eng}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
            />
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            type="url"
            placeholder="Image URL"
            name="img"
            value={formData.img}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
          />
          {formData.img !== "" && <div style={{height:"7rem", width:"5rem"}}>
            <img src={formData.img} alt="No PNG" height="100%" width="100%" />
          </div>}
        </label>
        <br />
        <label>
          Rating:
          <br />
          <select 
            name='rating' 
            value={formData.rating} 
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
          >
            <option value={10}>10</option>
            <option value={9}>9</option>
            <option value={8}>8</option>
            <option value={7}>7</option>
            <option value={6}>6</option>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
            <option value={0}>0</option>
          </select>
        </label>
        <br />
        <label>
          Comment: 
          <br />
          <textarea
            name='comment'
            placeholder='Add comment here'
            value={formData.comment}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
            />
        </label>
        <br />
        <button>{props.keyword.split(" ")[0]}</button>
      </form>
    </div>
    </div>
  );
}