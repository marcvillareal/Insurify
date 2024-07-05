import React from "react";

export default function ViewReportBanner() {
  return (
    <header
      className="flex lg:flex-row-reverse justify-between bg-insurify-purple text-white shadow-md tablet:pb-14 mobile:py-5 "
      data-testid="view-report-banner"
    >
      <div className="font-inter font-bold tablet:text-4xl tablet:pr-20 mobile:pl-52 mobile:text-xl md:pl-96 md:ml-20 xs:pl-64 sm:pl-96 mdlg:pl-96">
        <h1 className="text-insurify-dark laptop:text-3xl xs:text-base">
          Everything you need to know about
        </h1>
        <h1 className="text-insurify-footer-banner laptop:text-3xl xs:text-base flex flex-row-reverse">
          Insurance Year in Review
        </h1>
      </div>
    </header>
  );
}
