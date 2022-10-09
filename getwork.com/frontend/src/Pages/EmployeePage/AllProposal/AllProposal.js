import React, { useState } from 'react'

const AllProposal = () => {

    const [ed, setEd] = useState('active')
  return (
    <div className="postJobs">
      <div className="post-box">
        <div className="header">
          <button style={  ed === 'active' ? { backgroundColor: '#1d4354', color: 'white'} : {} }    onClick={() => setEd("active")}>Active Proposals</button>
          <button style={  ed === 'rejected' ?  { backgroundColor: '#1d4354', color: 'white'} : {} } onClick={() => setEd("rejected")}>Rejected Proposals</button>
          <button style={  ed === 'shortlisted' ?  { backgroundColor: '#1d4354', color: 'white'} : {} } onClick={() => setEd("shortlisted")}>ShortListed Proposals</button>
        </div>
        {/* <form  className="jobs-search">
          <input
            style={{ width: "81%" }}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form> */}

        <div className="main-body">
          {ed === "active" ? (
            <h1>sd</h1>
           
          ) : ed === "rejected" ? (
            'er'
          ) : ed === "shortlisted" ? (
            'df'
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default AllProposal
