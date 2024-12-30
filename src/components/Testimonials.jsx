import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { AiOutlineLinkedin } from "react-icons/ai";

const Testimonials = () => {
    const [showAll, setShowAll] = useState(false);

    const testimonials = [
        {
            name: "Sarah T.",
            role: "Marketing Consultant",
            text: "The custom banner transformed my LinkedIn profile completely! It perfectly aligned with my brand and boosted my visibility. Highly recommend this service!",
            color: "bg-[#673DDB]",
        },
        {
            name: "Emily R.",
            role: "HR Specialist",
            text: "I loved how the designer understood my requirements so well. The banner turned out to be exactly what I needed to reflect my expertise in HR.",
            color: "bg-[#8564E4]",
        },
        {
            name: "Rachel K.",
            role: "Entrepreneur",
            text: "My profile feels alive and professional with the new banner. It’s an investment every LinkedIn user should make! The design perfectly captures my personal brand and has already started attracting the right kind of connections. I’m thrilled with the results and would highly recommend this service to anyone looking to elevate their LinkedIn presence.",
            color: "bg-[#9478E9]",
        },
        {
            name: "James W.",
            role: "Startup Founder",
            text: "The design perfectly captures my personal brand and conveys professionalism and creativity. My profile now looks polished and has caught the attention of key prospects in my industry. I couldn’t be happier!",
            color: "bg-[#6F47DD]",
        },
        {
            name: "Amanda L.",
            role: "Creative Director",
            text: "Finally, a LinkedIn banner that truly represents me! The attention to detail and design quality is just amazing.",
            color: "bg-[#673DDB]",
        },
        {
            name: "Priya M.",
            role: "Tech Startup CEO",
            text: "As a startup founder, I’m always looking for ways to make my brand stand out, and this LinkedIn banner design service was exactly what I needed. The result was a sleek, professional banner that communicates everything I want people to know about my company at a glance. Since updating my profile with the new banner, I’ve seen an increase in profile views and even a few messages from potential investors. I highly recommend this service to anyone looking to elevate their LinkedIn presence.",
            color: "bg-[#9C81EB]",
        },
        {
            name: "William B.",
            role: "Real Estate Agent",
            text: "My LinkedIn banner now reflects my expertise and trustworthiness as a real estate professional. Great job!",
            color: "bg-[#7651E0]",
        },
        {
            name: "Mark P.",
            role: "Business Consultant",
            text: "I’ve always struggled to make my LinkedIn profile look professional and cohesive, but this banner design service changed everything. I’ve already received positive feedback from colleagues and clients who’ve noticed the change. The new banner gives my profile a polished and approachable look, and I can confidently say it was worth every penny. Thank you for such a fantastic experience!",
            color: "bg-[#8D6EE6]",
        },
        {
            name: "Ethan J.",
            role: "Leadership Coach and Speaker",
            text: "Working with this designer was an absolute pleasure! I was initially hesitant about investing in a LinkedIn banner, but now I see it was one of the best decisions I’ve made for my professional brand. The designer paid close attention to my branding details, including my colors, fonts, and messaging, and crafted a banner that aligns perfectly with my profile and overall online presence. The design feels modern, impactful, and uniquely mine. I’ve had several event organizers comment on how professional my profile looks now, which has already led to new speaking opportunities. I can’t recommend this service enough!",
            color: "bg-[#AB95EF]",
        },
    ];

    // Determine the testimonials to display
    const displayedTestimonials = 
        typeof window !== 'undefined' && window.innerWidth >= 1024 
            ? testimonials 
            : showAll 
                ? testimonials 
                : testimonials.slice(0, 4);

    return (
        <div className="bg-lightIndigo">
            <div className="max-w-screen-2xl mx-auto">
                {/* Section Title */}
                <SectionTitle title={"How they are growing their audience with"} />

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:px-24 md:px-12 px-6">
                    {displayedTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`break-inside-avoid mb-6 rounded-lg text-lightIndigo p-6 shadow-md ${testimonial.color}`}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl poppins-semibold">{testimonial.name}</h3>
                                {/* LinkedIn Icon */}
                                <span className="text-3xl text-lightIndigo opacity-90 cursor-pointer">
                                    <AiOutlineLinkedin />
                                </span>
                            </div>
                            <p className="text-base poppins-light opacity-90 mb-[2px]">
                                {testimonial.role}
                            </p>
                            <div className="border border-white w-24"></div>
                            <p className="text-base leading-6">{testimonial.text}</p>
                        </div>
                    ))}
                </div>

                {/* "See More / See Less" Button for Small Devices */}
                <div className="text-center mt-10 lg:hidden">
                    <button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="bg-darkIndigo/90 hover:bg-darkIndigo transition-colors duration-150 text-lightIndigo px-6 py-2 rounded-lg shadow-md poppins-semibold"
                    >
                        {showAll ? "See Less" : "See More"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

