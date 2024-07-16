import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar.jsx';
import './listall.css';
import { getUser } from '../../service/apiService.js';

const FARM_IMAGE = '/src/assets/농지.gif';
const BUILDING_IMAGE = '/src/assets/빌딩.gif';

const ListAll = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const preloadImages = [FARM_IMAGE, BUILDING_IMAGE];
    preloadImages.forEach(image => {
      new Image().src = image;
    });
    
    if (token) {
      getUser(token)
      .then(data => {
        console.log('data:', data);
        // 관리자가 아니라면 바로 유휴농지 페이지를 보여줌
        if (!data.is_staff) {
          navigate('/land_list')
        }
        setLoading(false);
      })
      .catch(error => {
        navigate('/notfound');
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <> <Navbar /> </>
  }

  return (
    <>
      <Navbar />
      <div className="list-container">
        <div className="listbox">
          <div className='listbox_farm' style={{ backgroundImage: `url(${FARM_IMAGE})` }}>
            {/* TODO: listpage_admin 을 보여줘야 함 */}
            <a href="/land_list">농지 리스트</a>
          </div>
          <div className='listbox_building' style={{ backgroundImage: `url(${BUILDING_IMAGE})` }}>
            <a href="/iblist">불법 건축물 리스트</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAll;