import React, {useState, useRef} from 'react';
import styles from './question.module.scss';
import cn from 'classnames';

const Accordion = ({question, answer}) => {

    const el = useRef(null);
    const questionEl = useRef(null);

    const [open, setOpen] = useState(false);
    const targetHeight = useRef(0);

    const handleToggle = () => {
        setOpen(prevState => {
            targetHeight.current = prevState ? 0 : el.current.getElementsByClassName('js-question')[0].clientHeight;
            return !prevState;
        });
    }

    return(
        <div ref={el} data-aos="fade-up" data-aos-once="true" className={styles.container}>
            <div className={cn(styles.head, {[styles.open]: open})} onClick={handleToggle}>
                <div className={styles.inner}>
                    <div className={cn(styles.question, 'size-1 line-110 line-120-mobile fw-normal')}>{question}</div>
                    <div className={cn(styles.button, {[styles.open]: open})}/>
                </div>
            </div>
            <div className={cn(styles.inner, styles.innerQuestion)}>
                <div ref={questionEl} className={styles.questionWrapper} style={{height: `${targetHeight.current}px`, opacity: open ? 1 : 0}}>
                    <div className={cn('js-question', styles.body, 'size-2 line-140')} dangerouslySetInnerHTML={{__html: answer}}/>
                </div>
            </div>
        </div>
    )
}

export default Accordion;