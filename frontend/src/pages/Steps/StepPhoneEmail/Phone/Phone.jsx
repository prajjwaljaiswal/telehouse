import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import { sendOtp } from '../../../../http/index'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../store/authSlice'
const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();

  const submit = async () => {
      // server request
      const { data } = await sendOtp({phone: phoneNumber});

      dispatch(setOtp({phone: data.phone, hash: data.hash}));
      onNext();
  }

  return (
        <Card title="Enter Your Phone number" icon="phone">
           
        <TextInput value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />

        <div>
          <div className={styles.actionButtonWrap}>
              <Button text="Next" onClick={submit} />
          </div>

        <p className={styles.bottomParagraph}>
        By entering your number, you`re agreeing to our Terms of Service and Policy.
         Thanks!
        </p>
        </div>
    </Card>
  )
}

export default Phone