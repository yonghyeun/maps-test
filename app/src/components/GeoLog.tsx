'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledLog = styled.section({
  padding: '1rem',
  border: '1px solid white',
  minWidth: '200px',
  minHeight: '200px',
  overflowY: 'scroll',
});

type Geo = {
  lat: number;
  lon: number;
  time: string;
};

const GeoLog = () => {
  const [geoInfo, setGeoInfo] = useState<Geo[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const coord = position.coords;
        setGeoInfo((prev) => [
          ...prev,
          {
            lat: coord.latitude,
            lon: coord.longitude,
            time: new Date().toLocaleString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
              timeZone: 'Asia/Seoul',
            }),
          },
        ]);
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <StyledLog>
      <h1>GeoLog</h1>
      <ul>
        {geoInfo.map(({ lat, lon, time }) => (
          <li key={time}>
            lat : {lat} lon : {lon} time : {time}
          </li>
        ))}
      </ul>
    </StyledLog>
  );
};

export default GeoLog;
