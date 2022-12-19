import { FC, ReactElement, useEffect, useState } from 'react';
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
  const width = window.innerWidth
  const height = window .innerHeight
  const [screen, setScreen] = useState({width, height})

  useEffect(()=> {
    window.addEventListener('resize', ()=> {
      setScreen({width: window.innerWidth, height: window.innerHeight})
    })

    return () => {
      // window.removeEventListener('resize')
    }
  }, [])
  return (
    <>
      <Navbar component={<DarkNav title="x priori" screen={screen}/>}/>
      <Content component={<DarkContent screen={screen}/>}/>
      <Footer component={<DarkFooter title="twitter" screen={screen}/>}/>
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
    height: "25vh",
  },
  content: {
    height: "75vh"
  },
  footer: {
    height: "5vh"
  }
}

export default App;
