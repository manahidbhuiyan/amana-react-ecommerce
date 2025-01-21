import React from "react";

const TopHead = () => {
    let branch = 'uttra'
  return (
    branch && (
      <div className="header-top px-4 py-[6px] bg-themeColor text-white flex flex-col md:flex-row items-center text-font-14">
        {/* Marquee Section */}
        <div className="marquee mb-2 lg:mb-0 w-full overflow-hidden whitespace-nowrap box-border">
            <p className="inline-block capitalize animate-marquee">
            {branch?.branch_notice || 
                "Welcome to Amana Big Bazar Super Store Ltd. Committed to Quality & Service"}
            </p>
        </div>
        <div className="header-top-contacts hidden sm:flex items-center gap-5 justify-center lg:justify-end min-w-[470px]">
        <div className="contact-numbers flex justify-center mt-1">
           <i className="bx bxs-phone-call mr-1.5 relative mt-1"></i>
            <span>+8809612612000</span>
        </div>
        <div className="flex items-center contact-email justify-center">
          <span>
            <i className="fas fa-envelope mr-1.5 mt-2"></i>
          </span>
          <span>queries@amanagroupbd.com</span>
        </div>
      </div>
    </div>
    )
  );
};

export default TopHead;


