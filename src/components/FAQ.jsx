import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SectionTitle from "./SectionTitle";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            title: "What file formats will I receive?",
            description: "You will receive your LinkedIn banner in high-resolution PNG and JPG formats, optimized for desktop and mobile viewing. Additionally, if needed, we can provide the editable source file in AI, PSD, or EPS formats for future customization.",
        },
        {
            title: "Can I request additional revisions?",
            description: "Absolutely! Our package include multiple revisions to ensure your satisfaction. If you need further adjustments beyond those included, additional revisions can be requested at a reasonable fee. We’re committed to delivering a banner you’re 100% happy with.",
        },
        {
            title: "Do you offer banners for team profiles?",
            description: "Yes, we do! We provide cohesive, branded banner designs for entire teams, ensuring a consistent and professional look across all profiles. Whether it’s for a small team or a large organization, we can create designs tailored to your brand identity. Contact hello@brandnasu.com for bulk pricing and customization options.",
        },
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-lightIndigo">
            <div className="max-w-screen-2xl mx-auto pb-16">
                {/* Section Title */}
                <SectionTitle title={"Frequently Asked Questions"} />

                <div className="flex flex-col gap-4 justify-center items-center lg:px-24 md:px-12 px-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-[#D8CFFD] w-full max-w-3xl rounded-lg text-darkIndigo shadow-md">
                            <div
                                className="flex justify-between items-center p-6 cursor-pointer"
                                onClick={() => toggleAccordion(index)}
                            >
                                <h3 className="md:text-xl text-lg poppins-semibold">{faq.title}</h3>
                                {activeIndex === index ? (
                                    <FiChevronUp className="text-2xl" />
                                ) : (
                                    <FiChevronDown className="text-2xl" />
                                )}
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    activeIndex === index ? "max-h-60" : "max-h-0"
                                }`}
                            >
                                <p className="text-base poppins-light p-6 pt-0">{faq.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
