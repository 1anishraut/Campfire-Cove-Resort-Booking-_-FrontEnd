import React from 'react'
import background from "../../../../src/assets/images/footer-branches.jpg"
import ContactForm from './ContactForm';

const Section6 = () => {
  return (
    <div className='relative w-full '>
    <ContactForm/>
    
    <div
      className=" bg-center bg-cover w-full h-[160px] md:h-[300px] lg:h-[400px] xl:h-[400px] flex items-center justify-center "
      style={{ backgroundImage: `url(${background})` }}
    />

    </div>
  );
}

export default Section6