import SectionTitle from "./SectionTitle";

const PerfectBanner =()=>{
    return (
        <div className="bg-lightIndigo text-indigo">
            <div className='max-w-screen-2xl mx-auto'>
                {/* Section Title */}
                <SectionTitle title={"See the Difference a Perfect Banner Makes!"} />
                <div className="grid grid-cols-1 gap-y-12 lg:px-24 md:px-12 px-6">

                    {/* Header Section */}
                    <div className="lg:grid hidden grid-cols-1 lg:grid-cols-2 justify-center md:gap-x-36 gap-x-24 md:gap-y-20 gap-y-16">
                        <h3 className="text-center block text-darkIndigo text-xl">Before</h3>
                        <h3 className="text-center block text-darkIndigo text-xl">After</h3>
                    </div>

                    {/* Image Sections */}
                    <div className="grid grid-cols-1 gap-y-12 divide-y divide-gray-400 lg:divide-y-0">
                        {[ 
                            { before: "/Artboard 3 PNG.png", after: "/Artboard 4 PNG.png" },
                            { before: "/Artboard 5 PNG.png", after: "/Artboard 6 PNG.png" },
                            { before: "/Artboard 7 PNG.png", after: "/Artboard 8 PNG.png" }
                        ].map((item, index) => (
                            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 justify-center md:gap-x-36 gap-x-24 md:gap-y-20 gap-y-16 pt-12 first:pt-0">

                                {/* Before Section */}
                                <div className="relative lg:mt-0 mt-3">
                                    <div className="absolute -top-8 left-0 lg:hidden">
                                        <span>Before</span>
                                    </div>
                                    <img src={item.before} alt={`Artboard ${index * 2 + 1}`} className="mx-auto" />
                                </div>

                                {/* After Section */}
                                <div className="relative">
                                    <div className="absolute -top-8 left-0 lg:hidden">
                                        <span>After</span>
                                    </div>
                                    <img src={item.after} alt={`Artboard ${index * 2 + 2}`} className="mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfectBanner;