import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { HeaderLanding } from "./component/pages/HeaderLanding";
import LandingFooter from "./component/pages/FooterLanding";


const LandingLayout = ({ enteredUser, setEnteredUser }: any) => {
  return (
    <motion.div
      initial="initial"
      animate="final"
      className=" min-h-screen overflow-x-hidden overflow-y-auto"
    >
      <HeaderLanding />
      <Outlet />
      <LandingFooter />
    </motion.div>
  );
};

export default LandingLayout;
