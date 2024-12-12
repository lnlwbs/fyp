import Employee from '../components/Employee';
import FAQ from '../components/FAQ';

import Info from '../components/Info';


function AboutUs() {
  return (
    <div className='bg-white-900 dark:bg-gray-900'>
        <Employee/>
        <Info/>
        <FAQ/>
    </div>
  );
}
export default AboutUs;
