import {Component} from 'react'
import {FaInstagram, FaTwitter, FaLinkedin} from 'react-icons/fa'

import MenuItemsList from '../MenuItemsList'

import ThemeContext from '../../Context/ThemeContext'
import {SidebarContainer, ContactUsContainer, Text} from './styledComponents'

import './index.css'

class Sidebar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const theme = isDarkTheme ? 'dark' : 'light'
          return (
            <SidebarContainer theme={theme}>
              <MenuItemsList />
              <ContactUsContainer>
                <Text theme={theme}>CONTACT US</Text>
                <div>
                  <a href="https://x.com/GaliVenkatesh44">
                    <FaTwitter size={25} className="logo twitter" />
                  </a>

                  <a href="https://www.instagram.com/_the__tony_/">
                    <FaInstagram size={25} className="logo insta" />
                  </a>

                  <a href="https://www.linkedin.com/in/galivenkatesh/">
                    <FaLinkedin size={25} className="logo linkdin" />
                  </a>
                </div>
                <Text theme={theme}>
                  Enjoy! Now to see your channels and recommendations!
                </Text>
              </ContactUsContainer>
            </SidebarContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Sidebar
