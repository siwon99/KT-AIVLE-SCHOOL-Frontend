import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import "./signup.css"; //권혜민 추가
import { useNavigate } from 'react-router-dom';
import UserInput from '../loginpage/UserInput';
import UserButton from '../loginpage/UserBtn';
import Navbar from '../navbar/navbar';

const Signup = () => {
  // 유저 정보
  const [userInfo, setUserInfo] = useState({
    user_realname: '', //이름
    username: '', //아이디
    password: '', //비밀번호
    confirm_password: '', //비밀번호 확인
    birthday: '', //생년월일 8자리
  });

  //생년월일 정보
  const [birthday, setBirthday] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);

  // 아아디, 비밀번호, 비밀번호 확인
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInfo(userInfo => ({
      ...userInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    if(userInfo.password && userInfo.confirm_password) {
      if(userInfo.password === userInfo.confirm_password) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    } else {
      setPasswordMatch(null);
    }
  }, [userInfo.password, userInfo.confirm_password]);

  // 페이지 이동
  const navigate = useNavigate();

  // 로그인 페이지 이동
  const goToLogin = () => {
    navigate('/login');
  };

  // 메인 페이지 이동
  const goToHome = () => {
    navigate('/');
  };
  
  // 회원가입 로직
  const processSignUp = () => {
    fetch('http://3.39.228.42/users/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user_realname: userInfo.user_realname,
        username: userInfo.username,
        password: userInfo.password,
        confirm_password: userInfo.confirm_password,
        birthday: userInfo.birthday,
      }),
    })

      .then(response => {
        if (response.ok) {
          alert('회원가입에 성공했습니다. 로그인 해주세요.');
          navigate('/login')
        }
        else {
          throw new Error();
        }
      })
      .catch(error => {
        alert('회원가입에 실패했습니다. 다시 해주세요.');
      });
  };

  return (
    <>
      <Navbar />
      <main className="signup-content">
        <div className="signup-title">회원가입</div>
        <div className="signup">
          <div className="write-info" onChange={handleInputChange}>
            <div className="userInput">
              <UserInput
                type="text"
                placeholder="이름"
                value={userInfo.user_realname}
                name="user_realname"
                onChange={handleInputChange}
                onEnterPress={processSignUp}
              />
              <UserInput
                type="birthday"
                placeholder="생년월일 (YYYY.MM.DD)"
                pattern="\d{4}\.\d{2}\.\d{2}"
                value={userInfo.birthday}
                name="birthday"
                onChange={handleInputChange}
                onEnterPress={processSignUp}
              />
              <UserInput
                type="text"
                placeholder="아이디"
                value={userInfo.username}
                name="username"
                onChange={handleInputChange}
                onEnterPress={processSignUp}
              />
              <UserInput
                type="password"
                placeholder="비밀번호"
                value={userInfo.password}
                name="password"
                onChange={handleInputChange}
                onEnterPress={processSignUp}
              />
              <UserInput
                type="password"
                placeholder="비밀번호 확인"
                value={userInfo.confirm_password}
                name="confirm_password"
                onChange={handleInputChange}
                onEnterPress={processSignUp}
            />
            <div className={`password-message ${passwordMatch === true ? 'password-match' : ''}`}>
              {passwordMatch === false && "비밀번호가 일치하지 않습니다."}
              {passwordMatch === true && "비밀번호가 일치합니다."}
            </div>
            
          </div>

          <div className="button-container">
            <div className="backHome-Btn">
                <button className="backBtn" onClick={goToHome}>뒤로가기</button>
              </div>
            <div className="signup-Btn">
              <UserButton
                onClick={processSignUp}
                text="회원 가입"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  );
};

export default Signup;