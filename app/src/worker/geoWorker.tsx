/**
 * Worker 를 이용하여 메인스레드 밖에서 동작하는 GeoWorker를 생성해보도록 하자
 * self 객체를 통해 Worker 인스턴스를 참조 할 수 있으며 메인스레드와는 postMessage 를 통해 데이터를 보낼 수도
 * onMessage 이벤트 핸들러를 통해 메인스레드에서 보낸 데이터를 받을 수도 있다.
 */

const DELAY = 1000;
// 호출 횟수를 저장할 변수
let cnt = 0;

self.onmessage = function (e) {
  // 메인스레드로부터 온 데이터가 start 일 경우
  if (e.data === 'start') {
    setInterval(() => {
      // 호출 시간을 toLocalDateString 형태로 저장
      const time = new Date().toLocaleDateString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
      });

      // 현재 위치 가져오기
      self.navigator.geolocation.getCurrentPosition((position) => {
        const coord = position.coords;
        // 메인스레드로 데이터 전송
        self.postMessage({
          lat: coord.latitude,
          lon: coord.longitude,
          time,
          cnt: cnt++,
        });
      });
    }, DELAY);
  }
};
