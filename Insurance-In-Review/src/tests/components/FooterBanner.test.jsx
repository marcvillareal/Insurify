import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import FooterBanner from '../../components/FooterBanner';

describe('FooterBanner component', () => {
    test('FooterBanner component › renders with test ID', () => {
        render(<FooterBanner />);
        
        const footerBannerElement = screen.getByTestId('footer-banner');
        expect(footerBannerElement).toBeInTheDocument();
      });
      
});