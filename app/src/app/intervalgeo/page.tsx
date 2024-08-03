import Container from '@/components/Container';
import GeoLog from '@/components/GeoLog';
export default function Home() {
  return (
    <Container>
      <h1>setInterval 을 이용한 geolocation 입니다.</h1>
      <GeoLog />
    </Container>
  );
}
