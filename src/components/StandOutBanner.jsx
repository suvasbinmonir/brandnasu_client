import SectionTitle from "./SectionTitle";

const StandOutBanner = () => {
    return (
        <div className="bg-lightIndigo">
            <div className="max-w-screen-2xl mx-auto">
                {/* Section Title */}
                <SectionTitle title={"How do I get a StandOut LinkedIn banner?"} />

                <div className="grid grid-cols-1 md:gap-y-10 gap-y-6 justify-items-center align-items-center lg:px-24 md:px-12 px-6">
                    <div className="flex lg:gap-x-32 md:gap-x-20 md:gap-y-10 gap-6">
                        <div className="bg-[#D8CFFD] md:p-8 p-5 xl:w-96 xl:h-96 lg:w-80 lg:h-80 md:w-72 md:h-72 w-[180px] h-[180px] flex justify-center flex-col">
                            <h3 className="text-indigo md:poppins-bold poppins-semibold lg:text-[40px] md:text-[34px] text-[22px]">Step 1:</h3>
                            <p className="text-indigo lg:text-3xl md:text-[26px] text-gl poppins-semibold leading-relaxed">Share your LinkedIn URL</p>
                        </div>
                        <div className="bg-[#D8CFFD] md:p-8 p-5 xl:w-96 xl:h-96 lg:w-80 lg:h-80 md:w-72 md:h-72 w-[180px] h-[180px] flex justify-center flex-col">
                            <h3 className="text-indigo md:poppins-bold poppins-semibold lg:text-[40px] md:text-[34px] text-[22px]">Step 2:</h3>
                            <p className="text-indigo lg:text-3xl md:text-[26px] text-lg poppins-semibold leading-relaxed">Receive initial concepts within 24 hours!</p>
                        </div>
                    </div>
                    <div className="flex lg:gap-x-32 md:gap-x-20 md:gap-y-10 gap-6">
                        <div className="bg-[#D8CFFD] md:p-8 p-5 xl:w-96 xl:h-96 lg:w-80 lg:h-80 md:w-72 md:h-72 w-[180px] h-[180px] flex justify-center flex-col">
                            <h3 className="text-indigo md:poppins-bold poppins-semibold lg:text-[40px] md:text-[34px] text-[22px]">Step 3:</h3>
                            <p className="text-indigo lg:text-3xl md:text-[26px] text-lg poppins-semibold leading-relaxed">Provide feedback for revisions.</p>
                        </div>
                        <div className="bg-[#D8CFFD] md:p-8 p-5 xl:w-96 xl:h-96 lg:w-80 lg:h-80 md:w-72 md:h-72 w-[180px] h-[180px] flex justify-center flex-col">
                            <h3 className="text-indigo md:poppins-bold poppins-semibold lg:text-[40px] md:text-[34px] text-[22px]">Step 4:</h3>
                            <p className="text-indigo lg:text-3xl md:text-[26px] text-lg poppins-semibold leading-relaxed">Get your final banner, ready to upload.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StandOutBanner;