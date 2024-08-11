import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';
import VerticalTabs from '../../../src/stories/verticalTabs/verticalTabs';
import { queryByText } from '@storybook/test';
import i18n from '../../../src/i18n';

describe('Vertical tabs component' , ()=>{
    test('render labels and elements correctly' , () =>{
        const labels = ['Tab 1', 'Tab 2'];
        const elements = [<p>Content 1</p>, <p>Content 2</p>];   
        const {getByText} = render(
            <I18nextProvider i18n={i18n}>
              <VerticalTabs labels={labels} elements={elements}/>
            </I18nextProvider>
        );

        labels.forEach(label=>{
            expect(screen.getByText(label)).toBeInTheDocument();
        });
        // if the first element render 
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    });

    test('change active tab on clicking ' , () =>{
        const labels = ['Tab 1', 'Tab 2'];
        const elements = [<p>Content 1</p>, <p>Content 2</p>];   
        const {getByText} = render(
            <I18nextProvider i18n={i18n}>
              <VerticalTabs labels={labels} elements={elements}/>
            </I18nextProvider>
        );

        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

        //check if hte tab switch on clicking on htedocument
        fireEvent.click(screen.getByText('Tab 2'))
        //checko if the content has been change 
        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    
    })
    test('renders with default props', () => {
        const { getByText } = render(
          <I18nextProvider i18n={i18n}>
            <VerticalTabs />
          </I18nextProvider>
        );
        expect(screen.getByText('label 1')).toBeInTheDocument();
        expect(screen.getByText('label 2')).toBeInTheDocument();
        expect(screen.getByText('tab 1')).toBeInTheDocument();
    });
})
