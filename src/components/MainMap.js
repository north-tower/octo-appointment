import { useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from './Navbar';

function MainMap() {
  const [selectedLocation, setSelectedLocation] = useState({});

//   const coordinates = {
//     longitude: 0.1276,
//     latitude: 51.5072,
//   };
  
//   const center = getCenter(coordinates);

  const [viewState, setViewState] = useState({
    longitude: 36.05609362339563,
    latitude:   -0.2903985683403422,
    zoom: 10,
  });
  // -0.2903985683403422, 36.05609362339563

  return ( 


    <Map
      {...viewState}
      mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
      mapboxAccessToken='pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw'
      
    >
      
        <div>
          <Marker
            longitude={36.080025}
            latitude={  	-0.303099}
            
          >
            <p
              role='img'
              className="cursor-pointer text-2xl animate-bounce"
              aria-label='push-pin'
            >📌</p>
          </Marker>

        
        </div>
   
    </Map>
  
  );
}

export default MainMap;