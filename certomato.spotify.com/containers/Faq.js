import React, { useEffect, useState } from 'react';
import Markdown from '../components/Markdown';

const Faq = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const content = require('../content/faq.md');
    fetch(content).then((response) => response.text()).then((faqText) => {
      setText(faqText);
    });
  }, []);

  return <Markdown source={text}/>;
};

export default Faq;
