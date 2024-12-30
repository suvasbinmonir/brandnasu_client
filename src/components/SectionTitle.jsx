const SectionTitle = ({ title }) => {
    return (
        <div className="xl:pt-32 xl:pb-16 lg:pt-28 lg:pb-12 md:pt-24 md:pb-12 pt-20 pb-12 px-6">
            <h2 className="xl:max-w-4xl lg:max-w-xl max-w-lg mx-auto xl:text-6xl xl:leading-[65px] lg:text-4xl lg:leading-snug md:text-3xl md:leading-normal text-[26px] leading-8 poppins-semibold text-darkIndigo capitalize text-center">
                {title}
            </h2>
        </div>
    );
};

export default SectionTitle;
