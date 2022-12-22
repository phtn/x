import { FC, useEffect, useState } from "react"
import { FaFire } from 'react-icons/fa'
import BG from '../assets/basarab.jpg'

type DarkNavPropTypes = {
    title: string;
    screen: {
        width: number,
        height: number
    };
}
const DarkNav: FC<DarkNavPropTypes> = ({title, screen}) => {
    const width = screen.width
    const [paddingLeft, setPaddingLeft] = useState(80)
    const [fontSize, setFontSize] = useState(38)

    useEffect(()=> {
        window.addEventListener('resize', () => {
            if (width > 1200){
                setPaddingLeft(width * 0.1)
                setFontSize(28)
            } else {
                setPaddingLeft(60)
                setFontSize(24)
            }
            
        })
    }, [paddingLeft, fontSize, width])

    if (width > 1050){
        return (
            <div style={styles.containerLarge}>
                <h1 style={{paddingLeft, fontSize}}>{title}</h1>
                <div style={styles.phtnContainer}>

                <span style={styles.phtn}>forged in <FaFire size={15} /> by <b>phtn458</b></span>
                </div>
            </div>
        )
    } else {
        return (
            <div style={styles.containerSmall}>
                <h1 style={{ fontSize }}>{title}</h1>
            </div>
        )
    }
}
const styles = {
    containerLarge: {
        color: "papayawhip",
        backgroundColor: "#141d26",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        height: "100%",
        alignItems: "center",
        display: "flex",
    },
    containerSmall: {
        color: "papayawhip",
        backgroundColor: "#141d26",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        height: "100%",
        justifyContent: "center",
        display: "flex",
    },
    phtnContainer: {
        display: 'flex',
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "0px",
    },
    phtn: {
        color: "inherit",
    }
}
export default DarkNav