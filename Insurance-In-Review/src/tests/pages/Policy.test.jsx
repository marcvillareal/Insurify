import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import Policy from '../../pages/Policy'; // Import the component to be tested

// Test suite for the Policy component
describe('Policy component', () => {

    test('renders heading correctly', () => {
        // Render the Policy component
        render(<Policy />);
    
        // Assertion: Check if the main heading is rendered
        expect(
          screen.getByRole('heading', { name: /Your Policy/i })
        ).toBeInTheDocument();
      });

    // Test case: Check if all elements are rendered on the screen
    test('Renders all elements on the screen', () => {
        // Render the Policy component
        render(<Policy />);

        // Assertion: Check if the welcome message is rendered
        expect(
            screen.getByText(/Welcome.*! To show your current insurance policy/i)
        ).toBeInTheDocument();

        // Assertion: Check if the View PDF button is rendered
        expect(screen.getByRole('button', { name: /view pdf/i })).toBeInTheDocument();

        // Assertion: Check if the Download button is rendered
        expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();

        // Assertion: Check if the policy overview heading is rendered
        expect(screen.getByText('Policy Overview')).toBeInTheDocument();

        // Assertion: Check if the policy overview description is rendered
        expect(
            screen.getByText(
                /In your policy document, you can expect to see a comprehensive/i
            )
        ).toBeInTheDocument();
    });
});
