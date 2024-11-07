import {Component} from 'react'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose, IoIosArrowRoundBack} from 'react-icons/io'
import {FaMoon, FaInstagram, FaTwitter, FaLinkedin} from 'react-icons/fa'

import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import MenuItemsList from '../MenuItemsList'

import ActiveMenuContext from '../../Context/ActiveMenuContext'
import ThemeContext from '../../Context/ThemeContext'

import 'reactjs-popup/dist/index.css'

import {
  NavMobileContainer,
  HeaderLogoImg,
  NavMobileIcons,
  IconButton,
  NavLargeContainer,
  LogoutPopupContent,
  Button,
  ProfileIcon,
  NavLargeIcons,
  LargeLogoutButton,
  MenuPopupMobile,
  MenuListMobile,
  IconContainer,
} from './styledComponent'

import './index.css'

class Header extends Component {
  state = {profileDetailsData: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedProfileData = this.getProfileData(fetchedData.profile_details)
    this.setState({profileDetailsData: updatedProfileData})
  }

  renderProfilePopup = () => {
    const {profileDetailsData} = this.state
    const {name, profileImageUrl, shortBio} = profileDetailsData
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const theme = isDarkTheme ? 'dark' : 'light'
          const color = isDarkTheme ? 'white' : 'black'

          return (
            <div theme={theme} className="popup-container">
              <Popup
                trigger={
                  <button type="button" className="triggerButton">
                    <ProfileIcon
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                    />
                  </button>
                }
                position="bottom left"
              >
                <div className="" color={color}>
                  <img src={profileImageUrl} alt="profilePic" />
                  <h3> {name} </h3>
                  <p> {shortBio} </p>
                </div>
              </Popup>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderMobileprofile = () => {
    const {profileDetailsData} = this.state
    const {name, profileImageUrl, shortBio} = profileDetailsData
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const theme = isDarkTheme ? 'dark' : 'light'
          const color = isDarkTheme ? 'white' : 'black'
          return (
            <Popup
              modal
              className="popup-content"
              trigger={
                <button type="button" className="triggerButton">
                  <ProfileIcon
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </button>
              }
            >
              {close => (
                <div
                  className="profileContainerMobile"
                  theme={theme}
                  bgColor={theme}
                  color={color}
                >
                  <IconContainer type="button" onClick={() => close()}>
                    <IoIosArrowRoundBack className="closeIcon" size={25} />
                  </IconContainer>

                  <div className="profile" color={color}>
                    <img src={profileImageUrl} alt="profilePic" />
                    <h3> {name} </h3>
                    <p> {shortBio} </p>
                  </div>
                </div>
              )}
            </Popup>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value

          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const theme = isDarkTheme ? 'dark' : 'light'
          const color = isDarkTheme ? 'white' : 'black'

          const onClickLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          return (
            <>
              <NavMobileContainer theme={theme}>
                <ActiveMenuContext.Consumer>
                  {activeValue => {
                    const {changeActiveMenu} = activeValue
                    return (
                      <Link to="/">
                        <HeaderLogoImg
                          src={websiteLogo}
                          alt="website logo"
                          onClick={() => changeActiveMenu('HOME')}
                        />
                      </Link>
                    )
                  }}
                </ActiveMenuContext.Consumer>
                <NavMobileIcons>
                  <IconButton
                    type="button"
                    data-testid="theme"
                    onClick={() => changeTheme()}
                  >
                    {isDarkTheme ? (
                      <FiSun color="white" size={22} />
                    ) : (
                      <FaMoon size={22} />
                    )}
                  </IconButton>
                  <Popup
                    modal
                    className="popup-content"
                    trigger={
                      <IconButton type="button">
                        <GiHamburgerMenu color={color} size={22} />
                      </IconButton>
                    }
                  >
                    {close => (
                      <MenuPopupMobile theme={theme}>
                        <div className="profileAndCancel">
                          {this.renderMobileprofile()}

                          <IconContainer type="button" onClick={() => close()}>
                            <IoMdClose size={20} color={color} />
                          </IconContainer>
                        </div>

                        <MenuListMobile>
                          <MenuItemsList />

                          <div className="contactList" fixed="bottom">
                            <h3 theme={theme}>CONTACT US</h3>
                            <div>
                              <a href="https://x.com/GaliVenkatesh44">
                                <FaTwitter size={25} className="logo twitter" />
                              </a>

                              <a href="https://www.instagram.com/_the__tony_/">
                                <FaInstagram size={25} className="logo insta" />
                              </a>

                              <a href="https://www.linkedin.com/in/galivenkatesh/">
                                <FaLinkedin
                                  size={25}
                                  className="logo linkdin"
                                />
                              </a>
                            </div>
                            <h6 theme={theme}>
                              Enjoy! Now to see your channels and
                              recommendations!
                            </h6>
                          </div>
                        </MenuListMobile>
                      </MenuPopupMobile>
                    )}
                  </Popup>

                  <Popup
                    modal
                    trigger={
                      <IconButton type="button">
                        <FiLogOut color={color} size={22} />
                      </IconButton>
                    }
                    className="logout-popup"
                  >
                    {close => (
                      <LogoutPopupContent theme={theme}>
                        <p>Are you sure, you want to logout</p>
                        <div>
                          <Button outline type="button" onClick={() => close()}>
                            Cancel
                          </Button>
                          <Button
                            bgColor="blue"
                            color="white"
                            type="button"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </Button>
                        </div>
                      </LogoutPopupContent>
                    )}
                  </Popup>
                </NavMobileIcons>
              </NavMobileContainer>

              <NavLargeContainer theme={theme}>
                <ActiveMenuContext.Consumer>
                  {activeValue => {
                    const {changeActiveMenu} = activeValue
                    return (
                      <Link to="/">
                        <HeaderLogoImg
                          src={websiteLogo}
                          alt="website logo"
                          onClick={() => changeActiveMenu('HOME')}
                        />
                      </Link>
                    )
                  }}
                </ActiveMenuContext.Consumer>

                <NavLargeIcons>
                  <IconButton type="button" onClick={() => changeTheme()}>
                    {isDarkTheme ? (
                      <FiSun color="white" size={23} />
                    ) : (
                      <FaMoon size={23} />
                    )}
                  </IconButton>

                  {this.renderProfilePopup()}

                  <Popup
                    modal
                    trigger={
                      <LargeLogoutButton theme={theme} outline>
                        Logout
                      </LargeLogoutButton>
                    }
                    className="logout-popup"
                  >
                    {close => (
                      <LogoutPopupContent theme={theme}>
                        <p>Are you sure, you want to logout</p>
                        <div>
                          <Button outline type="button" onClick={() => close()}>
                            Cancel
                          </Button>
                          <Button
                            bgColor="blue"
                            color="white"
                            type="button"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </Button>
                        </div>
                      </LogoutPopupContent>
                    )}
                  </Popup>
                </NavLargeIcons>
              </NavLargeContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
