import { FC } from "react"

type DarkFooterPropTypes = {
    title: string
}
const DarkFooter: FC<DarkFooterPropTypes> = ({title}) => {
    return (
        <div style={styles.container}>
            <p>{title}</p>
        </div>
    )
}
const styles = {
    container: {
        color: "papayawhip",
        backgroundColor: "#243447",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    }
}
export default DarkFooter