import React from 'react';
import Banner from '../HomeComponents/Banner';
import Services from '../HomeComponents/Services';
import Team from '../HomeComponents/Team';
import Options from '../HomeComponents/Options';
import Testimonials from '../HomeComponents/Testimonials';

const Home = () => {
    return (
        <div className='overflow-hidden'>
            <Banner></Banner>
            <h1 className='text-center mt-16 mb-10 font-bold text-4xl'>Our Services</h1>
            <Services></Services>
            <Testimonials></Testimonials>
            <h1 className='text-center mt-16 mb-10 font-bold text-4xl'>Meet Our team</h1>
            <Team></Team>
            <h1 className='text-center mt-16 mb-10 font-bold text-4xl'>Warehousing Options</h1>
            <Options></Options>
           
        </div>
    );
};

export default Home;