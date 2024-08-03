'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const StyledLog = styled.section({
  padding: '1rem',
  border: '1px solid white',
  minWidth: '200px',
  minHeight: '200px',
  maxHeight: '500px',
  overflowY: 'scroll',
});

type Geo = {
  lat: number;
  lon: number;
  time: string;
  cnt: number;
};

const GeoLog = () => {
  const [geoInfo, setGeoInfo] = useState<Geo[]>([]);
  const cnt = useRef<number>(0);
  console.log(geoInfo);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const intervalId = setInterval(() => {
      cnt.current = cnt.current + 1;
      const time = new Date().toLocaleString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
      });

      window.navigator.geolocation.getCurrentPosition((position) => {
        const coord = position.coords;
        setGeoInfo((prev) => [
          ...prev,
          {
            lat: coord.latitude,
            lon: coord.longitude,
            time,
            cnt: cnt.current,
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
        {geoInfo.map(({ lat, lon, time, cnt }, idx) => (
          <li key={idx}>
            lat : {lat} lon : {lon} time : {time} cnt : {cnt}
          </li>
        ))}
      </ul>
    </StyledLog>
  );
};

export default GeoLog;
