import React, { Component } from "react";
import ListComponenet from "./List";


const meta={
    title: 'ListComponenet',
    component: ListComponenet,
    argTypes:{
        dataObject: { control: 'object' },
    },
};
export default meta;

const Template =(args)=> <ListComponenet {...args}/>
export const data=Template.bind({})
data.args={
    dataObject:{
        messageData:[
        {message:'welcom',read:false},
        {message:'you have a new message',read:false},
        {message:'we check your account and we see that you didnt pay a lot of times for the servise',read:true},
        {message:'welcom',read:true},
        {message:'welcom',read:true},
   ]
}
        
}