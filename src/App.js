import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import IndexPage from './pages/todo/IndexPage';
import AddPage from './pages/todo/AddPage';
import ListPage from './pages/todo/ListPage';
import ReadPage from './pages/todo/ReadPage';
import ModifyPage from './pages/todo/ModifyPage';
import ProductIndexPage from './pages/products/ProductIndexPage';
import ProductAddPage from './pages/products/ProductAddPage';
import ProductListPage from './pages/products/ProductListPage';
import ProductReadPage from './pages/products/ProductReadPage';
import ProductModifyPage from './pages/products/ProductModifyPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/member/LoginPage';
import LogoutPage from './pages/member/LogoutPage';
import KakaoRedirectPage from './pages/member/KakaoRedirectPage';
import KakaoModifyPage from './pages/member/KakaoModifyPage';

function App() {
  return (
    // 네비게이션 메뉴가 여러 개일 수 있다.
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='/todo/'>
          <Route index element={<IndexPage />} />
          <Route path="add" element={<AddPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="read/:tno" element={<ReadPage />} />
          <Route path="modify/:tno" element={<ModifyPage />} />
        </Route>
        <Route path='/products/'>
          <Route index element={<ProductIndexPage />} />
          <Route path="add" element={<ProductAddPage />} />
          <Route path="list" element={<ProductListPage />} />
          <Route path="read/:pno" element={<ProductReadPage />} />
          <Route path="modify/:pno" element={<ProductModifyPage />} />
        </Route>
        <Route path='/member'>
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="kakao" element={<KakaoRedirectPage />} />
          <Route path="modify" element={<KakaoModifyPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
