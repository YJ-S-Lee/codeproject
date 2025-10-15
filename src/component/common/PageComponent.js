import { Pagination } from 'react-bootstrap';

const PageComponent = ({serverData, goList}) => {
    console.log("현재페이지" + serverData.current)
  return (
    <>
        <Pagination className="justify-content-center">
            {serverData.prev ? <Pagination.Prev onClick={() => goList({page : serverData.prevPage})} /> : <></>}
            {serverData.pageNumList.map(pageNum =>
                <Pagination.Item active={serverData.current === pageNum} onClick={() => goList({page : pageNum})}>{pageNum}</Pagination.Item>
            )}
            {serverData.next ? <Pagination.Next onClick={() => goList({page : serverData.nextPage})} /> : <></>}
        </Pagination>
    </>
  )
}

export default PageComponent