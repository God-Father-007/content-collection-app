import From from './Form';
import { useLocation } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { types } from 'react-alert';

export default function AddOrUpdateElementPage(props) {
  let initialState = null;

  const location = useLocation();
  const arr = location.pathname.split("/");
  const type = arr[1];
  
  async function addOrUpdateElement(data,e) {
    let uri = `/${props.requestType.toLowerCase().replace(" ","-")}`;
    if( props.httpRequestType === 'PATCH' ) {
      const id = arr[2].replace(":id=","");
      uri = `/${type}/${id}`;
      console.log(uri);
      delete data.collection;
    }
    const response = await fetch(uri, {
      method: props.httpRequestType,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const json = await response.json();
    if( response.ok ) { return json; }
  }

  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    type: types.SUCCESS,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.FADE,
    containerStyle: {
      color: "white",
    }
  }
  
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <From
        initialState={initialState}
        keyword={props.requestType}  
        httpRequestType={props.httpRequestType}
        addOrUpdateElement={addOrUpdateElement}
      />
    </AlertProvider>
  );
}
