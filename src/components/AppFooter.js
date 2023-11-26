import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">Group-3 &copy; 2023 All Rights Reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
