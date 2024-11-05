import styled from 'styled-components'

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: ${props =>
    props.theme === 'dark' ? '#212121' : '#f4f4f4'};
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const LogoIcons = styled.img`
  width: 40px;
  margin: 0px 6px 0px 0px;
  cursor: pointer;
`
export const ContactUsContainer = styled.div`
  padding: 7px;
  margin-left: 10px;
`

export const Text = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: ${props => (props.theme === 'dark' ? '#f4f4f4' : '#212121')};
`
