import React from 'react';
import cn from 'classnames';
import styles from './formselect.module.scss';

const FormSelect = ({value, options, name, onChange, error, touched}) => {
    
    const hasValue = value !== "";
    
    const getIndexByValue = () => {
        let currentIndex = 0;

        for(let i = 0; i < options.length; i++){
            let option = options[i];
            if(option.value === value){
                currentIndex = i;
                break;
            }
        }

        return currentIndex;
    }

    const handleBlur = () => {
        onChange(name, {touched: true});
    }
    
    const handleChange = e => {
        onChange(name, {value: e.currentTarget.value});
    }

    return(
        <div className={styles.container}>
            <div className={cn(styles.label, 'size-5 fw-normal', {[styles.visible]: hasValue})}>{options[0].label}</div>
            <select name={name} onBlur={handleBlur} onChange={handleChange} value={value} className={styles.select}>
                { options.map((option, index) => <option value={option.value} key={index}>{option.label}</option>) }
            </select>
            <div className={cn(styles.selectedContainer, {[styles.value]: hasValue}, {[styles.error]: error && touched})}>
                <div className={cn(styles.selectedValue, 'size-4 fw-normal', {[styles.value]: hasValue})}>{options[getIndexByValue(value)].label}</div>
                <div className={styles.selectedArrow}></div>
            </div>
        </div>
    )
}

export default FormSelect;