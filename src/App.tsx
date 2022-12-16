import { FC, ReactElement } from 'react';
import DarkNav from './components/DarkNav'
import DarkContent from './components/DarkContent'
import DarkFooter from './components/DarkFooter'

type NavbarPropTypes = {
  component: ReactElement;
}
type ContentPropTypes = {
  component: ReactElement;
}
type FooterPropTypes = {
  component: ReactElement;
}
function App() {
  return (
    <>
      <Navbar component={<DarkNav title="x priori"/>}/>
      <Content component={<DarkContent/>}/>
      <Footer component={<DarkFooter title="twitter"/>}/>
    </>
  );
}

const Navbar: FC<NavbarPropTypes> = ({component}) => {
  return (
    <div style={styles.navbar}>
      {component}
    </div>
  )
}
const Content: FC<ContentPropTypes> = ({component}) => {
  return (
    <div style={styles.content}>{component}</div>
  )
}
const Footer: FC<FooterPropTypes> = ({component}) => {
  return (
    <div style={styles.footer}>{component}</div>
  )
}

const styles = {
  navbar: {
    height: "10vh",
  },
  content: {
    height: "85vh"
  },
  footer: {
    height: "5vh"
  }
}

export default App;
