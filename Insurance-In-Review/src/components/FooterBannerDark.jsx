import React from "react";

export default function FooterBanner() {
  return (
    <header className="flex lg:flex-row-reverse justify-between bg-insurify-button-active text-white shadow-md tablet:py-10 mobile:py-5 " data-testid="footer-banner-dark">
      <div className="font-inter font-bold tablet:text-4xl tablet:pr-20 mobile:pl-52 mobile:text-xl md:pl-96 md:ml-20 xs:pl-64 sm:pl-96 mdlg:pl-96">
        <span className="text-insurify-dark ">secure</span>{" "}
        <span className="text-insurify-purple">
          your life
          <span className="text-base">®</span>
        </span>
      </div>
    </header>
  );
}
