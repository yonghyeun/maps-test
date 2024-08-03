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
          /* 매우 안좋은 패턴인걸 알지만 실험을 위해 해당 콜백 메소드 내부에서 fetch 요청을 보내기로 함 */
          fetch('/api/geo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCoords),
          });

          return newCoords.toSorted((prev, next) => prev.idx - next.idx);
        });
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section>
      <StyledLog>
        <h1>GeoLog</h1>
        <ul>
          {geoInfo.map(({ lat, lon, time, idx, cnt }) => (
            <li
              key={idx}
              style={{
                margin: '10px',
                padding: '10px',
                border: '1px solid white',
              }}
            >
              <p>
                lat : {lat} lon : {lon}
              </p>
              <p>
                time : {time} idx : {idx}
              </p>
              <p>cnt : {cnt}</p>
            </li>
          ))}
        </ul>
      </StyledLog>
      <div>
        <button
          onClick={() => {
            const json = JSON.stringify(geoInfo);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'geoInfo.json';
            a.click();
          }}
        >
          Save JSON
        </button>
      </div>
    </section>
  );
};

export default GeoLog;
