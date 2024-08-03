import Container from '@/components/Container';
import GeoLogWithWorker from '@/components/GeoLogWithWorker';
const Page = () => {
  return (
    <Container>
      <h1>Worker 를 이용한 setInterval 입니다.</h1>
      <GeoLogWithWorker />
    </Container>
  );
};

export default Page;
