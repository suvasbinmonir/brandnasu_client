const Footer = () => {
    return (
        <footer className="bg-darkIndigo">
            <div className="max-w-screen-2xl mx-auto text-lightIndigo md:py-8 py-4 lg:px-24 md:px-12 px-6">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-8">
                    {/* Left Section */}
                    <div className="flex flex-col gap-y-2">
                        <h3 className="lg:w-40 md:w-32 w-20">
                            <img src="/Logo.png" alt="BrandNasu Logo" />
                        </h3>
                        <h1 className="lg:text-5xl md:text-4xl text-3xl lg:poppins-bold poppins-semibold">brandnasu</h1>
                        <address className="not-italic lg:text-2xl text-xl poppins-medium leading-6">
                            1209 MOUNTAIN ROAD PL NE STE R <br />
                            ALBUQUERQUE, NM 87110 <br />
                            USA
                        </address>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col md:gap-20 gap-10">
                        <div>
                            <p className="lg:text-3xl md:text-[26px] text-2xl poppins-medium md:mb-2">
                                <a 
                                    href="mailto:hello@brandnasu.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer">hello@brandnasu.com
                                </a>
                            </p>
                            <p className="lg:text-3xl md:text-[26px] text-2xl text-left poppins-medium">+1 (505) 575 7863</p>
                        </div>
                        <div className="flex justify-center md:justify-normal gap-x-6 md:text-lg text-base">
                            <a href="#" className="hover:text-gray-300 hover:underline underline-offset-2">Terms of Service</a>
                            <a href="#" className="hover:text-gray-300 hover:underline underline-offset-2">Privacy Policy</a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="md:text-lg text-base md:mt-8 mt-4 lg:text-left text-center">
                    <p>© 2024 BrandNasu</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
