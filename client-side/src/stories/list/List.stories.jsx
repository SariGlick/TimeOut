import React from 'react';
import ListComponent from './List'; 

const meta = {
    title: 'Components/ListComponent',
    component: ListComponent,
    argTypes: {
        dataObject: { control: 'object' },
    },
};

export default meta;

const Template = (args) => <ListComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
    dataObject: {
        messageData: [
            {
                _id: '1',
                read: false,
                type: { type: 'Welcome' },
            },
            {
                _id: '2',
                read: false,
                type: { type: 'You have a new message' },
            },
            {
                _id: '3',
                read: true,
                type: { type: 'We checked your account and noticed multiple missed payments' },
            },
            {
                _id: '4',
                read: true,
                type: { type: 'Welcome back' },
            },
            {
                _id: '5',
                read: true,
                type: { type: 'Reminder: update your profile' },
            },
        ],
    },
};
