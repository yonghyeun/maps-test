'use client';
import { useState, useEffect, useRef } from 'react';
import { StyledLog } from './GeoLog';

type Geo = {
  lat: number;
  lon: number;
  time: string;
  cnt: number;
};

const GeoLogWithWorker = () => {
  const [geoInfo, setGeoInfo] = useState<Geo[]>([]);
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    /**
     * geoWorker 생성
     * 해당 인스턴스는 geoWorker 파일에서 생성된 Worker 인스턴스를 참조하게 된다.
     * onMessage 를 통해 geoWorker 인스턴스가 postMessage 로 전송한 인스턴스를 받아 geoInfo 상태를 업데이트 한다.
     */
    worker.current = new Worker(
      new URL('@/worker/geoWorker.tsx', import.meta.url),
    );

    // worker 인스턴스로부터 메시지를 받았을 때 geoInfo 상태를 업데이트
    worker.current.onmessage = (e) => {
      const newCoord: Geo = e.data;
      setGeoInfo((prev) => [...prev, newCoord]);
    };

    // worker 인스턴스 시작
    worker.current.postMessage('start');

    console.log(worker.current);
    return () => {
      worker.current?.terminate();
    };
  }, []);

  return (
    <StyledLog>
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

export default GeoLogWithWorker;
