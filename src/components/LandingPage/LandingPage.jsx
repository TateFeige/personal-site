import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };



  var options = {
    method: 'POST',
    url: 'https://www.warcraftlogs.com/api/v2/client',
    headers: {
      cookie: 'XSRF-TOKEN=eyJpdiI6InJHV0hJTVAzUWJJaGtpNlgyRFBGY0E9PSIsInZhbHVlIjoiWEVSMzJ4aHRPZ2FManRYVXhrbEc1NjF0RWxQcFJ4ckJ5Ym5lbG1xUlhrNjZtYVJaNVBDOGJXNTVCbDU2c3ltTUpwR3VNK2VKcExHcTZQTTJNdW9KV2FyZG95aUxWM0ptVEROVEE0YlBWUTF6SnNzUm1zckorQjhmK3d2d1NEL1oiLCJtYWMiOiJmZTkzZGY4YjllNDUyN2JmNjVhNmQ0ZTc3ZWU2NjJiNWE3YzE1OTE4ZjUwMDg3YjZjMjI2YTg4ZGY2ZWU0OTZiIn0%253D; wcl_session=eyJpdiI6IlJmUngxNno1bkpvY3lXaWF5YzdIM1E9PSIsInZhbHVlIjoiMHhEajhWWWhHMnNBUGt1YjNGN1VBL3lsS0wvbTBReHZIMnZKU2RMRVBvcHhOWGFQejFXR3ZtY1lVTzVjYnZxS05RTVkrdmMwclEvQUhPYVVsOExtL3dFeFZ5eVRVR2xNdE1CdTJqR2w3THVPZVl6eVVQMEZTQVBSeklzblZjZzQiLCJtYWMiOiJlOWYzNzhiZTUwZjNjYTI1YmI3OTFiYzQ2Y2QxMjAyMjZhM2IzMmJiZTk4M2M2ODBkZGFhMWUxZTMwYzM5ZjNjIn0%253D',
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDE0ZmM3OS03NzY1LTQwODctYjA5Zi05YzVjNzZjMjE5ZDUiLCJqdGkiOiJjYTg3OTUxNzYyMWRhNmRkMzFhMjNkZjg0ZDJkNzY2NzE2Mzc0NDM3MWQ4ZDE5YTNmYjk4MTRjMTFiY2E5YjU1OTk2NTdkOWIzY2QyZWViZSIsImlhdCI6MTYyODE4NDg3MiwibmJmIjoxNjI4MTg0ODcyLCJleHAiOjE2Mzg1NTI4NzIsInN1YiI6IjE0OTM5MCIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.DFjp2AjR4M9No8cOnlb0eIyMRc4MdJ1-8-3KN9dWanAPjO-SoVqZ82W9utmAhg5YOA1_G6Frx8d5zxC8qQ0UQgVL4-HxrcGQIzXjfZH7G6VoZOzWTX2lPIv9EWtqgZG6gVsquMokj186wFpTxcvUWZfnursCPWT-mA1iL7JLgYwQjQyiP7MeATWYAG_DDtw4j8D8O3xagbkRlUJBKkTDNXID7sT7A9GSd7JH5EN-1a9WmM0f80kjeqwWMNj1JitddEAzBZx17lBPSGzhNkyl8_GyXFOQce2TfXoC7WJtNAthnGb5EF_S13duuBZ7oNhYUHANpwjiVJ_9e7IoGzXDkkaKixcc8GRFFhM3ju65TNgQF_XIJyMRWMZ3KKS2HYYcKIZ6_9ydVYJVbzrhaRYFdpVgH_pju-5pN5UtRlj95rhasvogO5011ddbj8NsW21KZRQWUPuyHVdjwwAQjUNnRq5Z5F_8CU83HF4jSloO9-VFlzcsJVhoXsTB25jLa8Ht94MuWx7CExx8O__24Mb2bQkJd9sWxne6n5v3wcU0JiOO3vYCuOA0aKfHVlgWJGURo5NclJp4iLbxs0geW-MesTQpToJKOly2Wcg7haL7sfBePfOZh7STVonRvtb1HyNDbFhvwepnbps4raWf-YbZ1o25Xt_A1S0n0zMxyXSRDUA'
    },
    data: '{"query":"{\n  reportData {\n    report(code: \"6Lg3ctnvF8HmRbZp\") {\n      rankings\n    }\n  }\n}"}'
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
      

  return (
    <div className="container">
      <h2>{heading}</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
