import React from 'react'
import { CAvatar, CDropdown, CDropdownToggle } from '@coreui/react'

import avatar8 from './../../assets/images/default_image.png'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
    </CDropdown>
  )
}

export default AppHeaderDropdown
