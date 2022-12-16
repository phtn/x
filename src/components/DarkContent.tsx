import CLT from './CLT/CLT'
import BlockchainContent from './XRP/Blockchain'

function DarkContent(){
    return (
        <div style={styles.container}>
            <BlockchainContent/>
        </div>
    )
}
const styles = {
    container: {
        color: "#243447",
        backgroundColor: "#F6F6F6",
        height: "100%",
        justifyContent: "center",
        display: "flex",
        overflow: "hidden"
    }
}
export default DarkContent