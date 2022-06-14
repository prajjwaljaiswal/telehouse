import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css'
import Button from '../../../components/shared/Button/Button';


const StepOtp = ({ onNext }) => {

    const [otp, setOtp] = useState('');

    return (
        <>
           <div className={styles.cardWrapper}>
            <Card title="Enter the code we just text you" icon="lock-emoji">
            <TextInput value={otp} onChange={(e) => { setOtp(e.target.value) }} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" />
                </div>

            <p className={styles.bottomParagraph}>
                By entering your OTP, you`re agreeing to our Terms of Service and Policy.
                Thanks!
            </p>
            </div>
        </Card>
           </div>
        </>
    );
};

export default StepOtp;
