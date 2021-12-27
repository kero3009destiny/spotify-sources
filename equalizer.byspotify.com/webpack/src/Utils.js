import moment from 'moment';
import {gsap, Power3} from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const formatDate = date => {
    return moment(date).format('MMMM Do, YYYY');
}

export const datePassed = date => {
    return moment(date).diff(moment(), 'days') < 0
}

export const shorthandDate = (date, text) => {
    if(text.indexOf('[date]') === -1 || !date){
        return text;
    }
    return text.replace('[date]', formatDate(date));
}

export const shorthandYear = (text, year) => {
    if(text.indexOf('[year]') === -1 || !year){
        return text;
    }

    return text.replace('[year]', year);
}

export const eventSlug = path => {
    const p = new RegExp("/events/[a-z0-9]+(?:-[a-z0-9]+)*$");
    return p.test(path);
}

export const scrollTo = targetY => {
    gsap.to(window, 1.5, {scrollTo:{y: targetY}, ease: Power3.easeInOut});
}