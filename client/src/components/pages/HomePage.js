import '../../style/pageStyles/HomePage.css'

// export Page component
export default function HomePage(props) {
  localStorage.setItem("selected",0);
    return (
      <>
        <div className='homepage'>
            <div className='message'>
              😑 Navigate the tabs mate
            </div>
        </div>
      </>
    );
  }