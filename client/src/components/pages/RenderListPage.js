import { useState, useEffect } from 'react'; // import useState

// import components
import ImageCarousel from '../ImageCarousel'
import StatusTabs from '../StatusTabs';
import TileContainer from '../TileContainer';

// export Page component
export default function RenderListPage(props) {
  let data = props.data;
  let statusTabNames = data.map(item => item.status);
  statusTabNames = ["All", ...statusTabNames];
  let statusTabLength = data.map(item => item.list.length);
  statusTabLength = [statusTabLength.reduce((a, b) => a + b, 0), ...statusTabLength]
  let tileData = data.map(item => item.list);
  
  const [renderSection,setRenderSection] = useState(1);
  
  function handleSectionRender(idx,e) {
      setRenderSection(idx-1)
    }

    const [images, setImages] = useState(null);

    useEffect(() => {
      let fetchImages = async () => {
          const response = await fetch(`/carousel-image/${props.type}`);
          const json = await response.json();
          if( response.ok ) { setImages(json.images); }
      }
      fetchImages();
    },[props.type]);

    return (
      <>
        {images && <ImageCarousel images={images} />}
        <StatusTabs 
          tabsArray={statusTabNames}
          tabNumArray={statusTabLength}
          handleSectionRender={handleSectionRender}
          selectTab={renderSection}
        />
        <div className='main-container'>
            {data && <TileContainer info={tileData} toDisplay={renderSection} />}
        </div>
      </>
    );
  }