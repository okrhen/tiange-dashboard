import { ILoginProps } from 'interfaces/screens/Login.interface';
import React from 'react';
import AddCategories from './AddCategories';

// eslint-disable-next-line react/jsx-props-no-spreading
const EditCategories = (props: ILoginProps) => <AddCategories {...props} />;

export default EditCategories;
