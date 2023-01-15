import '../style/TileContainer.css';
import { Link } from 'react-router-dom';
import Tile from './Tile';
import {generateID} from '../generateID'

export default function TileContainer(props) {
  const statusMap = {
    1:"Currently-deeding",
    2:"Completed",
    3:"On-Hold",
    4:"Dropped",
    6:"Plan-to-deed",
  };
    let tilesToRender = props.info.map((list, idx) => {
      return (props.toDisplay < 0 || props.toDisplay === idx)  && 
        list.map((item) => (
        <Link to={`:id=${item._id}`} key={generateID()}>
          <div className={`tile-container ${statusMap[item.status]}`} >
            <Tile info={item} />
          </div>
        </Link>
        ));
    });

  return (
    <>
         {tilesToRender}
    </>
  );
}