import Balance from "react-wrap-balancer";

import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <>
      {/* <h1 className={cn("text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]", className)} {...props} /> */}
      <h1
        className={cn(
          "bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-tight tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in [--animation-delay:200ms] text-center lg:leading-[1.1]",
          className
        )}
        {...props}
      />
      {/* <h1
        className={cn(
          "bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-tight tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]",
          className
        )}
        {...props}
      /> */}
    </>
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <>
      {/* <Balance
        className={cn("mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]", className)}
        {...props}
      /> */}
      {/* <Balance
        className={cn("max-w-[750px] text-center text-gray-400 text-balance text-lg font-light translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]", className)}
        {...props}
      /> */}
      <Balance
        className={cn(
          "max-w-[750px] text-center  text-lg font-light text-foreground",
          className
        )}
        {...props}
      />
    </>
  );
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center space-x-4 py-4 md:pb-10",
        className
      )}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, PageActions };
