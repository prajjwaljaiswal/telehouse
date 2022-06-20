import React, { useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';

const StepName = ({ onNext }) => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.activate);

    const [fullname, setFullname] = useState(name);

    const nextStep = () => {
        if(!fullname){
            return;
        }

        dispatch(setName(fullname));
        onNext();
    }
    return (
        <>
             <Card title="Enter Your Full Name" icon="goggle-emoji">
            <TextInput value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
            <div>
                <div className={styles.paragraph}>
                    <Button text="Next" onClick={nextStep} />
                </div>

            <p className={styles.paragraph}>
                By entering your OTP, you`re agreeing to our Terms of Service and Policy.
                Thanks!
            </p>
            </div>
            </Card>
        </>
    );
};

export default StepName;
