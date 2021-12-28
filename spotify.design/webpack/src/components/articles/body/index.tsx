import React from 'react';
import { BLOCKS, MARKS, Document, INLINES } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import style from './style.module.css';
import { Link } from '../../utilities/gatsby-link';

interface FragmentProps {
  children: React.ReactNode;
}

const Bold = ({ children }: FragmentProps) => <strong>{children}</strong>;

const Text = ({ children }: FragmentProps) => (
  <p className={`t-body-3 ${style.text}`}>{children}</p>
);

const Heading3 = ({ children }: FragmentProps) => (
  <h3 className="t-heading-1">{children}</h3>
);

/* eslint-disable react/display-name */

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: Document, children: React.ReactNode) => (
      <Link to={node.data?.uri}>{children}</Link>
    ),
    [BLOCKS.PARAGRAPH]: (node: Document, children: React.ReactNode) => (
      <Text>{children}</Text>
    ),
    [BLOCKS.HEADING_3]: (node: Document, children: React.ReactNode) => (
      <Heading3>{children}</Heading3>
    ),
  },
};

/* eslint-enable react/display-name */

export function formatRichText(node: Document) {
  return documentToReactComponents(node, options as Options);
}
