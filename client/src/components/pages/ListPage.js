import { useState, useEffect } from 'react'; // import useState

// import components
import RenderListPage from './RenderListPage.js'

// export Page component
export default function ListPage(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`/${props.type}`);
      const json = await response.json();
      if( response.ok ) { setData(json); }
    }
    fetchData();
  },[props.type]);


    return (
      <>
        {data && <RenderListPage data={data} type={props.type} />}
      </>
    );
  }