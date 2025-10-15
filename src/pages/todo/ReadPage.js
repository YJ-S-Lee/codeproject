import { useParams } from 'react-router-dom'
import ReadComponent from '../../component/todo/ReadComponent';
import { Container } from 'react-bootstrap';

const ReadPage = () => {
  const {tno} = useParams();

  return (
    <>
    <Container>
      <div className='mb-5'>ReadPage {tno}번 페이지</div>
      <ReadComponent tno={tno} />
    </Container>
    </>
  )
}

export default ReadPage