import { Link } from 'react-router-dom';

export default function Navtab(props) {
    
    return (
      <>
        <Link className='link-tag' to={ props.endpoint }>
        <div className={`content-type${props.selectCurrent ? " selected-type" : ""}`} onClick={props.handleClick.bind(this,props.title)} >
          <div className='content-icon-container'>
            <div className='content-icon'>
              <img
              className='icon-img'
              src={props.icon}
              alt="No PNG"
              />
            </div>
          </div>
          {props.renderName && <div className='content-title'>{props.title}</div>}
        </div>
      </Link>
      </>
    );
  }