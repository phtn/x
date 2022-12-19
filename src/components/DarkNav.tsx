import { FC } from "react"
import BG from '../assets/basarab.jpg'

type DarkNavPropTypes = {
    title: string;
    screen?: object;
}
const DarkNav: FC<DarkNavPropTypes> = ({title, screen}) => {
    // console.log(screen)
    return (
        <div style={styles.container}>
            <h1>{title}</h1>
        </div>
    )
}
const styles = {
    container: {
        color: "papayawhip",
        backgroundColor: "#141d26",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        height: "100%",
        // justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingLeft: 100,
    }
}
export default DarkNav