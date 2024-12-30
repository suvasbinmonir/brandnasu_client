import Banner from "../components/Banner";
import BannerNav from "../components/BannerNav";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LinkedInBanner from "../components/LinkedInBanner";
import LinkedInHeader from "../components/LinkedInHeader";
import PaymentPage from "../components/PaymentPage";
import PaymentsData from "../components/PaymentsData";
import PerfectBanner from "../components/PerfectBanner";
import StandOutBanner from "../components/StandOutBanner";
import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <section className="bg-gradient-to-r from-darkIndigo to-indigo text-lightIndigo w-full">
      <BannerNav />
      <Banner />
      <LinkedInHeader />
      <LinkedInBanner />
      <PerfectBanner />
      <StandOutBanner />
      <Testimonials />
      <PaymentPage />
      <PaymentsData />
      <FAQ />
      <Footer />
    </section>
  );
};

export default HomePage;
