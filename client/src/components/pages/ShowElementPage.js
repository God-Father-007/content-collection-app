import { useState, useEffect } from 'react'; // import useState
import { useParams } from 'react-router-dom';

import RenderShowElementPage from './RenderShowElementPage'

// export Page component
export default function ShowElementPage(props) {
  const params = useParams();
  const id = params.id.replace(":id=","");
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`/${props.type}/${id}`);
      const json = await response.json();
      if( response.ok ) { setData(json); }
    }
    fetchData();
  },[props.type,id]);
    return (
      <>
      { data && <RenderShowElementPage data={data} type={props.type} deed={props.deed} /> }
      </>
    );
  }