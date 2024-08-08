import React from 'react';
import TableComponent from './TableComponent';

const meta = {
    title: 'TableComponent',
    component: TableComponent,
    argTypes: {
        dataObject: { control: 'object' },
    },
};
export default meta;

const Template = (args) => <TableComponent {...args} />;
export const data1 = Template.bind({});
data1.args = {
    dataObject: {
        headers: ['id','name', 'age', 'city'],
         rows: [
      { id: 1, name: 'יונתן', age: 25, city: 'תל אביב' },
      { id: 2, name: 'מיכל', age: 30, city: 'ירושלים' },
    ],
    },
    widthOfTable:"60%",
    widthOfColums:[150,150,150,150]
};

export const data2 = Template.bind({});
data2.args = {
    dataObject: {
        headers: ['id','name', 'profession','age', 'city'],
        rows: [
            { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },
            { id: 2, name: 'מיכל', profession: 'חשבון', age: 30, city: 'ירושלים' },
          ],
    },
    widthOfTable:"80%",
    widthOfColums:[150,150,150,150,150]
    

};

