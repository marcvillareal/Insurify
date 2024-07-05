import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home'; // Import the component to be tested

// Test suite for the Home component
describe('Home component', () => {
    // Test case: Rendering of elements
    test('Renders home title correctly', () => {
        // Render the Home component
        render(<Home />);

        // Assertion: Check if elements are present in the document
        // You can use screen queries to find elements by various attributes

        // Check for heading elements
        expect(screen.getByText('Insurance')).toBeInTheDocument();
        expect(screen.getByText('Year in Review')).toBeInTheDocument();

        // Check for paragraph elements
        expect(screen.getByText(/Welcome to your Insurance Snapshot!/i)).toBeInTheDocument();

        // Check for button elements
        expect(screen.getByRole('button', { name: /Learn More/i })).toBeInTheDocument();

        // You can add more assertions for other elements as needed
    });

    test('Renders elements in the bottom carousel correctly', () => {
        // Render the Home component
        render(<Home />);

        // Check for heading element
        expect(screen.getByText(/One App, One Location, Everything you need/i)).toBeInTheDocument();

        // Check for paragraph element
        expect(screen.getByText(/Mobilize Your Peace of Mind/i)).toBeInTheDocument();

        // Check for button element
        expect(screen.getByRole('button', { name: /get the app/i })).toBeInTheDocument();

    });

    // test('Navigates to correct page when buttons in the bottom carousel are clicked', () => {
    //     // Render the Home component within a BrowserRouter to enable routing
    //     render(
    //       <BrowserRouter>
    //         <Home />
    //       </BrowserRouter>
    //     );
    
    //     // Find the button element
    //     const button = screen.getByRole('button', { name: /Learn More/i });
    
    //     // Simulate a click on the button
    //     fireEvent.click(button);
    
    //     // Assertion: Check if the URL changes to the expected value after the button click
    //     expect(window.location.href).toBe('http://localhost:5173/view-report');
       

    //   });
});
