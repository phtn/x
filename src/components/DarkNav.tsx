import { FC } from "react"

type DarkNavPropTypes = {
    title: string
}
const DarkNav: FC<DarkNavPropTypes> = ({title}) => {
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
        height: "100%",
        // justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingLeft: 20,
    }
}
export default DarkNav