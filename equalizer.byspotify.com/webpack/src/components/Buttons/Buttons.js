import React from 'react';
import { Link } from 'gatsby';
import cn from 'classnames';
import Loader from './Loader';

export const DarkOutlinedButton = ({label}) => {
    return(
        <button className="button-dark-outlined size-4">{label}</button>
    )
};

export const DarkOutlinedLink = ({label, descriptiveText = false, internalPath = false, url = false, target = '_blank'}) => {
    if(internalPath){
        return(
            <Link to={internalPath} className="button-dark-outlined size-4">{label}{descriptiveText ? <span className="visually-hidden"> {descriptiveText}</span> : null}</Link>
        )
    }
    return(
        <a className="button-dark-outlined size-4" href={url} target={target}>{label}</a>
    )
};

export const LightOutlinedLink = ({label, mobile = false, internalPath = false, url = false, target = '_blank'}) => {
    if(internalPath){
        return(
            <Link to={internalPath} className={cn("button-light-outlined size-4", {"mobile": mobile})}>{label}</Link>
        )
    }
    return(
        <a className={cn("button-light-outlined size-4", {"mobile size-3-mobile": mobile})} href={url} target={target}>{label}</a>
    )
};

export const LightOutlinedButtonSmall = ({label}) => {
    return(
        <button className="button-light-outlined small">{label}</button>
    )
};

export const LightOutlinedLinkSmall = ({label, internalPath, descriptiveText = false, dimmed = false}) => {
    return(
        <Link aria-label={label} to={internalPath} className={cn("button-light-outlined small", {"dimmed": dimmed})}>{label}{descriptiveText ? <span className="visually-hidden">{descriptiveText}</span> : null}</Link>
    )
};

export const LightFilledButton = ({label, onClick=null, disabled = false}) => {
    return(
        <button disabled={disabled} onClick={() => onClick ? onClick() : null} className="button-light-filled size-4">{label}</button>
    )
};

export const DarkFilledButtonSmall = ({label}) => {
    return(
        <button className="button-dark-filled small">{label}</button>
    )
};

export const DarkFilledButton = ({label, disabled = false, loader = false, onClick = null}) => {
    if(loader){
        return(
            <button onClick={e => onClick ? onClick(e) : null} className={cn("button-dark-filled size-4")} disabled={disabled}>
                {label}
                {disabled ? <Loader /> : null}
            </button>
        )
    }

    return(
        <button onClick={e => onClick ? onClick(e) : null} className="button-dark-filled size-4" disabled={disabled}>{label}</button>
    )
};

export const DarkFilledLinkSmall = ({label, internalPath, descriptiveText = false}) => {
    return(
        <Link aria-label={label} to={internalPath} className="button-dark-filled small">{label}{descriptiveText ? <span className="visually-hidden">{descriptiveText}</span> : null}</Link>
    )
}

export const GradientLink = ({label, currentEvents, internalPath, onClick = null}) => {
    if(internalPath){
        return(
            <Link to={internalPath} className="button-gradient">
                <div className="button-gradient__inner">
                    <div className="button-gradient__label size-4 fw-normal">{label}</div>
                    <div className="button-apply__events fw-normal">{currentEvents}</div>
                </div>
            </Link>
        )
    }

    return(
        <div className="button-gradient" onClick={onClick}>
            <div className="button-gradient__inner">
                <div className="button-gradient__label size-4 fw-normal">{label}</div>
                <div className="button-apply__events fw-normal">{currentEvents}</div>
            </div>
        </div>
    )
}

export const ApplyButton = ({label, currentEvents, forest = false}) => {
    return(
        <div className="button-apply">
            <div className={cn("button-apply__inner", {"button-apply__inner--forest": forest})}>
                <div className="button-apply__label">{label}</div>
                <div className="button-apply__gradient"/>
                <div className="button-apply__events">{currentEvents}</div>
            </div>
        </div>
    )
};

export const ApplyLink = ({label, internalPath, currentEvents, forest = false}) => {
    return(
        <Link to={internalPath} className="button-apply">
            <div className={cn("button-apply__inner", {"button-apply__inner--forest": forest})}>
                <div className="button-apply__label size-4">{label}</div>
                <div className="button-apply__gradient"/>
                <div className="button-apply__events">{currentEvents}</div>
            </div>
        </Link>
    )
}

export const ArrowButton = ({onClick, direction = 'right'}) => {

    let rotation = 0;

    switch(direction){
        case 'down':
            rotation = 90;
        break;
        case 'left':
            rotation = 180;
        break;
        case 'up':
            rotation = 270;
        break;
        default:
            rotation = 0;
    }

    let rotateStyle = {
        transform: `rotate(${rotation}deg)`
    };

    return(
        <div className="button-arrow" onClick={() => onClick(direction)}>
            <div className="button-arrow-icon" style={rotateStyle} />
        </div>
    )
}

