import { FaCheckCircle } from "react-icons/fa";

const Banner =()=>{
    return (
        <section className="max-w-screen-2xl mx-auto md:mt-10 mt-6 lg:px-24 md:px-12 px-6">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-[60%]">
                    <div className="text-left xl:w-[80%] lg:w-[90%]">
                        <h3 className="xl:text-7xl xl:leading-[85px] lg:text-5xl tracking-wid md:text-4xl text-[26px] poppins-semibold mb-4">First Impressions Start with Your LinkedIn Banner! </h3>
                    </div>
                    <p className="xl:text-4xl lg:text-[20px] md:text-xl text-base sm:my-3 w-full xl:leading-10 lg:leading-7 poppins-light">Turn visitors into connections with a banner  that reflects your brand’s personality and  professionalism.</p>
                    <button className="xl:text-4xl lg:text-2xl md:text-xl text-base capitalize lg:p-5 p-3 xl:mt-8 mt-6 bg-indigo/90 transition-colors hover:bg-indigo duration-150 poppins-semibold tracking-wider">Get your banner now</button>
                </div>
                <div className="w-full lg:w-[40%] flex justify-center lg:mt-0 mt-8">
                    <img src="/Artboard 2 PNG.png" alt="LinkedIn Banner" className="h-auto lg:h-60 xl:h-[350px]" />
                </div>
            </div> 

            <ul className="flex flex-col lg:flex-row xl:gap-6 gap-4 lg:items-center lg:py-20 md:py-16 py-14 xl:text-xl lg:text-base md:text-xl text-base lg:justify-center poppins-light">
                <li className="flex items-center gap-2"><FaCheckCircle size={24} className="text-indigo lg:poppins-bold md:poppins-semibold poppins-medium"/> Custom LinkedIn banner design</li>
                <li className="flex items-center gap-2"><FaCheckCircle size={24} className="text-indigo lg:poppins-bold md:poppins-semibold poppins-medium"/> 48 Hours Turnaround</li>
                <li className="flex items-center gap-2"><FaCheckCircle size={24} className="text-indigo lg:poppins-bold md:poppins-semibold poppins-medium"/> Optimized for pc and mobile viewing</li>
            </ul>
        </section>
    );
};

export default Banner;