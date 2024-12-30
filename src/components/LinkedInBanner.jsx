import artboard  from '/artboard.svg'
import artboard1  from '/artboard-1.svg'
import artboard2 from '/artboard-2.svg'
import artboard3  from '/artboard-3.svg'
import SectionTitle from './SectionTitle';

const LinkedInBanner = () => {
    return (
        <div className="bg-lightIndigo">
            <div className='max-w-screen-2xl mx-auto'>
                {/* Section Title */}
                <SectionTitle title={"See the Difference a Perfect Banner Makes!"} />
                <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center lg:gap-12 gap-8 lg:px-24 md:px-12 px-6">
                    <div className="flex md:items-center items-start md:gap-8 gap-4">
                        <div className="flex justify-center items-center md:mt-0 mt-1">
                            <img
                                src={artboard}
                                alt="Increase credibility illustration"
                                className='lg:w-32 md:w-20 w-20'
                            />
                        </div>
                        <div>
                            <h3 className="xl:text-3xl lg:text-[22px] md:text-2xl text-xl md:tracking-wide lg:poppins-bold md:poppins-semibold poppins-medium capitalize text-darkIndigo">
                                Increase Your Credibility
                            </h3>
                            <p className="text-darkIndigo xl:text-2xl lg:text-lg md:text-lg text-base">
                                First impressions count, and your banner is your LinkedIn storefront.
                            </p>
                        </div>
                    </div>
                    <div className="flex md:items-center items-start md:gap-8 gap-4">
                        <div className="flex justify-center items-center md:mt-0 mt-1">
                            <img
                                src={artboard2}
                                alt="Showcase brand identity illustration"
                                className='xl:w-[104px] lg:w-[90px] md:w-20 w-12'
                            />
                        </div>
                        <div>
                            <h3 className="xl:text-3xl lg:text-[22px] md:text-2xl text-lg md:tracking-wide lg:poppins-bold md:poppins-semibold poppins-medium capitalize text-darkIndigo">
                                Showcase Your Brand Identity
                            </h3>
                            <p className="text-darkIndigo xl:text-2xl lg:text-lg md:text-lg text-base">
                                Highlight your colors, logo, and tagline.
                            </p>
                        </div>
                    </div>
                    <div className="flex md:items-center items-start md:gap-8 gap-4">
                        <div className="flex justify-center items-center md:mt-0 mt-1">
                            <img
                                src={artboard1}
                                alt="Attract audience illustration"
                                className='xl:w-[104px] lg:w-[90px] md:w-20 w-16'
                            />
                        </div>
                        <div>
                            <h3 className="xl:text-3xl lg:text-[22px] md:text-2xl text-lg md:tracking-wide lg:poppins-bold md:poppins-semibold poppins-medium capitalize text-darkIndigo">
                                Attract the Right Audience
                            </h3>
                            <p className="text-darkIndigo xl:text-2xl lg:text-lg md:text-lg text-base">
                                Communicate your expertise and offerings instantly.
                            </p>
                        </div>
                    </div>
                    <div className="flex md:items-center items-start md:gap-8 gap-4">
                        <div className="flex justify-center items-center md:mt-0 mt-1">
                            <img
                                src={artboard3}
                                alt="Stand out from competitors illustration"
                                className='lg:w-28 md:w-20 w-16'
                            />
                        </div>
                        <div>
                            <h3 className="xl:text-3xl lg:text-[22px] md:text-2xl text-lg md:tracking-wide lg:poppins-bold md:poppins-semibold poppins-medium capitalize text-darkIndigo">
                                Stand Out from Competitors
                            </h3>
                            <p className="text-darkIndigo xl:text-2xl lg:text-lg md:text-lg text-base">
                                Be memorable with a unique and professional design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkedInBanner;

