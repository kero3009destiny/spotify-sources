import React from 'react';
import styles from './checkbox.module.scss';
import cn from 'classnames';

const Checkbox = ({label, name, checked, onChange, selectOption = false}) => {

    return(
        <label className={cn("size-4 fw-normal", {"size-6": selectOption}, styles.container, {[styles.checked]: checked}, {[styles.select]: selectOption})}>
            {label}
            <input name={name} type="checkbox" checked={checked} onChange={onChange}/>
            <span className={cn(styles.checkmark, {[styles.select]: selectOption})}/>
        </label>
    )
}

export default Checkbox;