import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-headers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GridPattern from "./magicui/GridPattern";
import { HeroVideoDialogComponent } from "./magicui/HeroVideo";

const HeroSection = () => {
  return (
    <div className="container relative">
      <GridPattern
        numSquares={50}
        maxOpacity={0.5}
        duration={2}
        repeatdelay={0.2}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        )}
      />
      <PageHeader className="max-w-3xl">
        <PageHeaderHeading className="text-balance mt-4">
          Top-rated Physiotherapists at Your Fingertips
        </PageHeaderHeading>
        <PageHeaderDescription className="text-gray-400 font-medium">
          Get expert advice from 80+ trusted physiotherapy specialists, now
          available online. Start your recovery with a free consultation.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant="outline">
            <a href="#blocks">Get Started</a>
          </Button>
          <Button asChild variant="default">
            <a
              href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
              target="_blank"
            >
              Book Free Consultation
            </a>
          </Button>
        </PageActions>
      </PageHeader>
      <HeroVideoDialogComponent />
    </div>
  );
};

export default HeroSection;
