import {ErrorContainer, Para, Head, Button, ErrorImg} from './styledComponent'

import ThemeContext from '../../Context/ThemeContext'

const ErrorImage = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const refreshPage = () => {
        props.refresh()
      }

      return (
        <ErrorContainer>
          {isDarkTheme ? (
            <ErrorImg src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" />
          ) : (
            <ErrorImg src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" />
          )}
          <Head>Oops! Something Went Wrong</Head>
          <Para>
            We are having some trouble to complete your request. Please try
            again.
          </Para>
          <Button onClick={refreshPage}>retry</Button>
        </ErrorContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default ErrorImage
