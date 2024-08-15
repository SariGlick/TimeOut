import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AccountTab from '../../../src/components/settings/accountTab';


test('render the components correctly ', () =>{
    render(<AccountTab />);
    expect(screen.getByText('Change Profile Picture')).toBeInTheDocument();
});
test('handales file select and preview image ' , ( ) =>{
    render(<AccountTab />);

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByLabelText('upload image');
    
    fireEvent.change(input, { target: { files: [file] } });

    const previewImage = screen.getByAltText('Profile Preview');
    expect(previewImage).toBeInTheDocument();
});
test('should handel no file selected' ,() =>{
    render(<AccountTab />);

    const input = screen.getByLabelText('upload image');
    
    fireEvent.change(input, { target: { files: [] } });

    const previewImage = screen.queryByAltText('Profile Preview');
    expect(previewImage).not.toBeInTheDocument();
} )