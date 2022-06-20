import React, { useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import styles from './StepAvatar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';

const StepAvatar = ({ onNext }) => {

    const { name, avatar } = useSelector((state) => state.activate);

    const [image, setImage] = useState('/images/monkey-avatar.png');

    const submit = async () => {
        try{
            const { data } = await activate({name, avatar});

            if(data.auth) {
                dispatch(setAuth(data));
            }
            console.log(data);
        } catch (err) {
            return err.message;
        }
    }

    const dispatch = useDispatch();

    const captureImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function() {
            dispatch(setAvatar(reader.result));
            setImage(reader.result);

            console.log(reader.result);
        }
    }

    return (
        <>
        <Card title={`Okay, ${name}`} icon="monkey-emoji">
            <p className={styles.subHeading}>How`s this photo?</p>

            <div className={styles.avatarWrapper}>
                <img src={image} alt="avatar" className={styles.avatarImage} /> 
            </div>

            <div>
                <input onChange={captureImage} type="file" className={styles.avatarInput} id="avatarInput" />
                <label htmlFor="avatarInput" className={styles.avatarLabel}>
                    Choose a diffrent photo 
                </label>
            </div>

       <div>
           <div className={styles.paragraph}>
               <Button text="Next" onClick={submit} />
           </div>
       </div>
       </Card>
   </>
    );
};

export default StepAvatar;
