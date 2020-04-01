import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../components/Footer';


describe('Footer', () =>{
    it('Should have a link to github',()=>{
        const {getByText} = render(<Footer />)
        expect(getByText('Github')).toBeInTheDocument();
    })
})