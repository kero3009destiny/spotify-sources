import React, {useState, useEffect, useRef} from 'react';
import cn from 'classnames';
import styles from './multiselect.module.scss';
import Checkbox from '../Checkbox/Checkbox';

const MultiSelect = ({value, name, options, placeholder, onChange, error, touched}) => {

    const [showOptions, setShowOptions] = useState(false);
    
    const optionsRef = useRef(null);
    const containerRef = useRef(null);

    const handleOpenOptions = () => {
        document.addEventListener('click', handleCloseOptions);
        setShowOptions(true);
    }

    // Mobile multiple select
    const handleSelectChange = e => {
        
        let selections = Array.from(e.target.selectedOptions).map(o => {
            return {
                [o.value]: true
            }
        });

        let updatedState = Object.assign({}, ...selections);
        onChange(name, {value: updatedState});
    }

    const handleBlur = () => {
        onChange(name, {touched: true});
    }

    // Desktop checkboxes
    const handleCheckboxChange = e => {
        
        const cbName = e.target.name;
        const cbValue = e.target.checked;

        let updatedState = {
            ...value,
            [cbName]: e.target.checked
        }

        if(!cbValue){
            delete updatedState[cbName];
        }
        
        onChange(name, {value: updatedState});
    }

    const handleCloseOptions = e => {
        if(containerRef.current && !containerRef.current.contains(e.target)){
            setShowOptions(false);
            onChange(name, {touched: true});
            document.removeEventListener('click', handleCloseOptions);
        }
    }

    useEffect(() => {
        return () => {
            document.removeEventListener('click', handleCloseOptions);
        }
    }, []);

    const getSelectedOptionsLabels = () => {

        let values = Object.keys(value);
        let labels = [];
        options.map(option => {
            if(values.indexOf(option.value) !== -1){
                labels.push(option.label);
            }
        })
        
        return labels;
    }

    const labels = getSelectedOptionsLabels();

    return(
        <div ref={containerRef} className={styles.container}>
            <div className={cn(styles.label, 'size-5 fw-normal', {[styles.visible]: labels.length})}>{placeholder}</div>
            <select className={styles.select} name={name} onBlur={handleBlur} onChange={handleSelectChange} value={Object.keys(value)} multiple>
                {
                    options.map((option, index) => <option value={option.value} key={index}>{option.label}</option>)
                }
            </select>
            <div onClick={handleOpenOptions} className={cn(styles.selectedContainer, {[styles.value]: labels.length}, {[styles.error]: error && touched})}>
                <div className={cn(styles.selectedValue, 'size-4 fw-normal', {[styles.value]: labels.length})}>{labels.length > 0 ? labels.join(', ') : placeholder}</div>
                <div className={styles.selectedArrow}></div>
            </div>
            {showOptions && <div ref={optionsRef} className={styles.options}>
                {
                    options.map((option, index) => {
                        return(
                            <div key={index} className={styles.option}>
                                <Checkbox label={option.label} name={option.value} onChange={handleCheckboxChange} checked={value[option.value] || false} selectOption />
                            </div>
                        )
                    })
                }
            </div>}
        </div>
    )
}

export default MultiSelect;