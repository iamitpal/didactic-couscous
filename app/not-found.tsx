import { PageHeader, PageHeaderHeading } from "@/components/page-headers";
import React from "react";

const Notfound = () => {
  return (
    <div>
      <PageHeader className="max-w-2xl">
        <PageHeaderHeading className="text-balance mt-4">
          Page Not Found
        </PageHeaderHeading>
      </PageHeader>
    </div>
  );
};

export default Notfound;
