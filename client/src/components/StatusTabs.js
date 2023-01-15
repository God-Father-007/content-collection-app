import '../style/StatusTabs.css';

export default function StatusTabs(props) {
    let names = props.tabsArray.map((item,idx) => {
      let selected = idx === props.selectTab + 1 ? "selected" : "";
      let tabType = item.replaceAll(" ","-").replace("Watch","deed").replace("Read","deed").replace("Listen","deed");
      return <div className={`status-tab ${selected} ${tabType}`} key={idx} onClick={props.handleSectionRender.bind(this,idx)}>
        {item} ({props.tabNumArray[idx]})
      </div>
    });
    
  return (
    <div className='status-tab-container'>
        {names}
    </div>
  );
}