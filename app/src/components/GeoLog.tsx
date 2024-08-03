'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const StyledLog = styled.section({
  padding: '1rem',
  border: '1px solid white',
  minWidth: '400px',
  minHeight: '400px',
  maxHeight: '500px',
  overflowY: 'scroll',
});

type Geo = {
  lat: number;
  lon: number;
  time: string;
  idx: number; // 실행 순서를 보장하기 위한 new Date.getTime() 값
  cnt: number;
};

const GeoLog = () => {
  const [geoInfo, setGeoInfo] = useState<Geo[]>([]);
  const cnt = useRef<number>(0);

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

      const idx = new Date().getTime();

      window.navigator.geolocation.getCurrentPosition((position) => {
        const coord = position.coords;
        setGeoInfo((prev) => {
          const newCoords = [
            ...prev,
            {
              lat: coord.latitude,
              lon: coord.longitude,
              idx,
              time,
              cnt: cnt.current,
            },
          ];

          return newCoords.toSorted((prev, next) => prev.idx - next.idx);
        });
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
        {geoInfo.map(({ lat, lon, time, idx }) => (
          <li key={idx}>
            <p>
              lat : {lat} lon : {lon}
            </p>
            <p>
              time : {time} idx : {idx}
            </p>
          </li>
        ))}
      </ul>
    </StyledLog>
  );
};

export default GeoLog;
