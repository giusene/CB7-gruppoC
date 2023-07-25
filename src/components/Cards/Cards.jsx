import Card from "../Card/Card";
import styles from "./Cards.module.scss"

const Cards = ({data}) => {



 console.log(data)

    return(
       
        <div className={styles.Cards}>
            
            {
                data.results.map((mock)=>(
                    <Card mock={mock} />
                ))
            }

        </div>
 
    )
}

export default Cards