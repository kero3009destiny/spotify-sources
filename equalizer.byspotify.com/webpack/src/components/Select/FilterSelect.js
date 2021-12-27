import React, {useState} from 'react';
import cn from 'classnames';
import styles from './filterselect.module.scss';

const FilterSelect = ({onChange, options, selectedOptionIndex = 0}) => {

    const [currentValue, setCurrentValue] = useState(options[selectedOptionIndex].label);

    const handleChange = e => {
        const index = e.currentTarget.selectedIndex;
        onChange(index);
        setCurrentValue(options[index].label);
    }

    return(
        <div className={styles.container}>
            <select onChange={handleChange} className={styles.select}>
                { options.map((option, index) => <option value={option.value} key={index}>{option.label}</option>)}
            </select>
            <div className={styles.selectedContainer}>
                <div className={cn(styles.selectedValue, 'size-4 fw-normal')}>{`In ${currentValue}`}</div>
                <div className={styles.selectedArrow}></div>
            </div>
        </div>
    )
}

export default FilterSelect;