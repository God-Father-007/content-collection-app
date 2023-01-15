import '../style/Tile.css';
import AltPoster from '../assets/img-poster-alt.jpg'

export default function Tile(props) {
    
    return (
        <div className="tile" key={props.info._id} id={props.info._id} >
            <img
                className="tile-image"
                src={props.info.img  !== "" ? props.info.img : AltPoster}
                alt=""
            />
        </div>
    );
}
