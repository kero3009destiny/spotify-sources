import React from 'react';
import { FormCategoryTitle, FormDescription, FormTitle } from './FormStyledComponents';

type FormHeaderProps = {
  category: string;
  title: string;
  description: string;
};

export const FormHeader = ({ category, description, title }: FormHeaderProps) => {
  return (
    <>
      <FormCategoryTitle>{category}</FormCategoryTitle>
      <FormTitle>{title}</FormTitle>
      <FormDescription>{description}</FormDescription>
    </>
  );
};
