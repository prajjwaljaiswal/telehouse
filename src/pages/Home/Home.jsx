import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/shared/Button/Button'
import Card from '../../components/shared/Card/Card'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.cardWrapper}>
   
          <Card title="Welcome To TeleHouse !">
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, dolores, sapiente sint dicta iusto illo magni nesciunt rem itaque aliquid odit reiciendis eveniet eligendi a necessitatibus dolor officia facere eos!
            </p>

            <div>
                <Button text="Get Your Username" />
            </div>

            <div className={styles.signInWrapper}>
              <span className={styles.hasInvite}>Have an invite text? <Link to="/login">Sign In</Link></span>
            </div>

        </Card>
    </div>
 
  )
}

export default Home