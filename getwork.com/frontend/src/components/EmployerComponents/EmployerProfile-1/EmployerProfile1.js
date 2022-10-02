import React from "react";

const EmployerProfile1 = () => {
  return (
    <div className="employerProfile1">
      <div className="top">
        <div className="min-box">
          <h3>Total Hires</h3>
          <strong> 0</strong>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3CCF4E"
              fill-opacity="1"
              d="M0,288L24,282.7C48,277,96,267,144,229.3C192,192,240,128,288,90.7C336,53,384,43,432,32C480,21,528,11,576,37.3C624,64,672,128,720,144C768,160,816,128,864,138.7C912,149,960,203,1008,208C1056,213,1104,171,1152,138.7C1200,107,1248,85,1296,85.3C1344,85,1392,107,1416,117.3L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="min-box">
          <h3>Total Spent</h3>
          <strong> 0</strong>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3CCF4E"
              fill-opacity="1"
              d="M0,160L24,176C48,192,96,224,144,240C192,256,240,256,288,245.3C336,235,384,213,432,218.7C480,224,528,256,576,229.3C624,203,672,117,720,74.7C768,32,816,32,864,48C912,64,960,96,1008,128C1056,160,1104,192,1152,186.7C1200,181,1248,139,1296,122.7C1344,107,1392,117,1416,122.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="bottom">
        <form>
          <div className="row">
            <input type="text" />
            <input type="text" />
          </div>

          <div className="row">
            <input type="text" />
            <input type="text" />
        </div>

        <div className="row-l">
            <input className="mt-3" type="file" />
        </div>

        <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EmployerProfile1;
