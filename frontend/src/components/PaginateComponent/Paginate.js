import React from 'react'

import Pagination from '@mui/material/Pagination';

const Paginate = ({count, giveBack}) => {


  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
      <Pagination count={count} variant="outlined" onClick={(e) => {
        giveBack(e.target.textContent)
      }} shape="rounded" />
    </div>
  )
}

export default Paginate
