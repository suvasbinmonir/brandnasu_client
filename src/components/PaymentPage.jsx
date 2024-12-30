import { AiOutlineLinkedin } from "react-icons/ai";
import linkedInBanner from "../../public/Artboard 4.jpg"
import SectionTitle from "./SectionTitle";
import PaymentSection from './CheckoutForm';

const PaymentPage = () => {

    return (
        <div className="bg-lightIndigo">
            <div className="text-darkIndigo max-w-screen-2xl mx-auto relative">
                {/* Section Title */}
                <div className="hidden lg:block">
                    <SectionTitle title={"Ready to Stand Out on LinkedIn?"} />
                </div>

                <div className="lg:px-24 md:px-12 px-6">
                    <div className="flex flex-col lg:flex-row xl:gap-32 lg:gap-10 relative">
                        {/* Package Info */}
                        <div className="text-darkIndigo flex-1 lg:space-y-10 lg:mt-8">
                            <h4 className="md:text-[26px] text-[20px] poppins-semibold hidden lg:block">What’s included in the package</h4>
                            {/* Section Title */}
                            <div className="lg:hidden">
                                <SectionTitle title={"What’s included in the package"} />
                            </div>

                            <div className="lg:pl-6">
                                <div className="space-y-6">
                                    <div>
                                        <h5 className="md:text-[26px] text-xl poppins-semibold">Custom Design:</h5>
                                        <p className="md:text-lg text-base poppins-regular">Tailored to your brand’s style and message.</p>
                                    </div>
                                    <div>
                                        <h5 className="md:text-[26px] text-xl poppins-semibold">Fast Turnaround:</h5>
                                        <p className="md:text-lg text-base poppins-regular">Your banner will be ready in 24 hours or less.</p>
                                    </div>
                                    <div>
                                        <h5 className="md:text-[26px] text-xl poppins-semibold">Multiple Revisions:</h5>
                                        <p className="md:text-lg text-base poppins-regular">Ensuring it’s perfect for you.</p>
                                    </div>
                                    <div>
                                        <h5 className="md:text-[26px] text-xl poppins-semibold">Editable Formats:</h5>
                                        <p className="md:text-lg text-base poppins-regular">Receive files in PNG, JPG, and editable formats like PSD/AI.</p>
                                    </div>
                                </div>
                                <div className="xl:mt-14 lg:mt-8 hidden lg:block">
                                    <img src={linkedInBanner} alt="LinkedIn Banner" />
                                </div>
                            </div>
                        </div>

                        {/* Dividing Line Centered in the Gap */}
                        <div className="absolute lg:block hidden top-0 bottom-80 left-[50%] w-[2px] bg-indigo/50"></div>

                        {/* Section Title */}
                        <div className="lg:hidden">
                            <SectionTitle title={"Ready to Stand Out on LinkedIn?"} />
                        </div>

                        {/* Pricing Card */}
                        <div className="bg-indigo/10 divide-y-2 divide-darkIndigo/30 py-8 rounded-[40px] shadow-md text-darkIndigo flex-1 lg:ml-10 xl:ml-16">
                            <div className="flex justify-between items-baseline px-6 pb-6">
                                <h4 className="md:text-2xl text-xl poppins-medium md:poppins-semibold">LinkedIn Banner Design</h4>
                                <p className="md:text-2xl text-xl space-x-2"><span className="poppins-semibold">$50</span><span className="poppins-regular line-through">$90</span></p>
                            </div>
                            
                            {/* Payment section */}
                            <PaymentSection/>
                        </div>
                    </div>
                    <div className="lg:flex hidden justify-end lg:w-1/2 absolute -bottom-6 -left-1">
                        <div className={`break-inside-avoid mb-6 rounded-3xl text-darkIndigo p-6 shadow-md bg-indigo/10 lg:w-[400px] mt-8`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-3xl poppins-semibold">Daniel Andrews</h3>
                                {/* LinkedIn Icon */}
                                <span className="text-3xl text-darkIndigo poppins-bold cursor-pointer">
                                    <AiOutlineLinkedin/>
                                </span>
                            </div>
                            <p className="text-base poppins-light opacity-90 mb-[2px]">
                                Founder, CEO
                            </p>
                            <div className="border border-darkIndigo/50 w-24"></div>
                            <p className="text-base leading-6">The designer captured my brand essence perfectly. My LinkedIn profile now stands out, and I’m 
                            getting more inquiries than ever!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
