import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('/api/value', {value:value})
    .then(response => {
        if(response.data.success) {
          console.log('response', response);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert('값을 DB에 넣는다 실패했습니다.');
        }
    });
  };

  useEffect(() => {
    axios.get('/api/values')
    .then(response => {
      console.log('response', response);
      setLists(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {lists && lists.map((list, index) => (
          <li key={index}>{list.value} </li>
        ))}        

        <div className="container">
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
             />
             <button type="submit">확인</button>
          </form>
        </div>

      </header>
    </div>
  );
}

export default App;
