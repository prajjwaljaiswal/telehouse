import React , { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Email = ({onNext}) => {

  const [email, setEmail] = useState('');

  return (
    <Card title="Enter Your email id" icon="email-emoji">
       <TextInput value={email} onChange={(e) => { setEmail(e.target.value) }} />
       <div>
          <div className={styles.actionButtonWrap}>
              <Button text="Next" onClick={onNext} />
          </div>

        <p className={styles.bottomParagraph}>
         By entering your email, you`re agreeing to our Terms of Service and Policy.
         Thanks!
        </p>
        </div>
    </Card>
  )
}

export default Email