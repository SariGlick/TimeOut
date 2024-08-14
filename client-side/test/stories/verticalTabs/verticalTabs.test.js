import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Updated import statement
import { I18nextProvider } from 'react-i18next';
import VerticalTabs from '../../../src/stories/verticalTabs/verticalTabs';
import i18n from '../../../src/i18n';

describe('Vertical tabs component', () => {
    test('renders labels and elements correctly', () => {
        const labels = ['Tab 1', 'Tab 2'];
        const elements = [<p key="1">Content 1</p>, <p key="2">Content 2</p>];   
        render(
            <I18nextProvider i18n={i18n}>
                <VerticalTabs labels={labels} elements={elements} />
            </I18nextProvider>
        );

        labels.forEach(label => {
          expect(screen.getByText(label)).toBeInTheDocument();
        });
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('changes active tab on clicking', () => {
        const labels = ['Tab 1', 'Tab 2'];
        const elements = [<p key="1">{'Content 1'}</p>, <p key="2">{'Content 2'}</p>];   
        render(
            <I18nextProvider i18n={i18n}>
                <VerticalTabs labels={labels} elements={elements} />
            </I18nextProvider>
        );

        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

        fireEvent.click(screen.queryByText('Tab 2'));
        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

  
});
