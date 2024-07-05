import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import FooterBannerDark from '../../components/FooterBannerDark';

describe('FooterBannerDark component', () => {
    test('FooterBannerDark component › renders with test ID', () => {
        render(<FooterBannerDark />);
        
        const footerBannerDarkElement = screen.getByTestId('footer-banner-dark');
        expect(footerBannerDarkElement).toBeInTheDocument();
      });
      
});