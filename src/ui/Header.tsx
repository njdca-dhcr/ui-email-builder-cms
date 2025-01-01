import React, { FC } from 'react'
import { Link, navigate } from 'gatsby'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { StateAbbreviation, stateById } from 'src/utils/statesAndTerritories'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { useAuth } from 'src/utils/AuthContext'
import { DEPARTMENT_SEALS, departmentSealsForState } from 'src/utils/departmentSeals'
import { SkipNavLink } from './Layout'
import { UswdsIcon } from './UswdsIcon'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface Props {}

export const Header: FC<Props> = () => {
  const stateAbbreviation = appModeAsStateAbbreviation()
  const state = stateById(appModeAsStateAbbreviation() ?? 'US')
  const departmentSeal = departmentSealForState(stateAbbreviation)

  return (
    <div className="header-wrapper">
      <header className="global-header">
        <SkipNavLink />
        <div>
          {departmentSeal && (
            <Link to="/" className="department-seal-container">
              <img
                alt={departmentSeal.label}
                src={buildDepartmentSealUrl(`/${departmentSeal.imageName}`)}
              />
            </Link>
          )}
          <span className="header-title">
            {state && `${state.name} `}
            Email Builder (Beta)
          </span>
        </div>
        <div>
          <LogOutButton />
          <SettingsButton />
        </div>
      </header>
    </div>
  )
}

export const LogOutButton: FC = () => {
  const [_auth, setAuth] = useAuth()

  return (
    <button
      className="log-out-button"
      onClick={() => {
        setAuth(null)
        navigate('/')
      }}
    >
      Log Out
    </button>
  )
}

export const SettingsButton: FC = () => {
  return (
    <Link to="/settings" className="settings-link">
      <UswdsIcon icon="Settings" />
      <VisuallyHidden>Settings</VisuallyHidden>
    </Link>
  )
}

export const departmentSealForState = (
  state: StateAbbreviation | null,
): (typeof DEPARTMENT_SEALS)[number] | null => {
  if (!state) return null

  const [firstDepartment] = departmentSealsForState(state)

  return firstDepartment ?? null
}
