import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function HeroVideoDialogComponent() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/N4StOiRes6A?si=h1iM5SmtJivRJMxa"
        thumbnailSrc="https://utfs.io/f/bg00qvD4vhQwhb60kbBQVaHjMe6OvykNURxgt4bFLpK3JArs"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/N4StOiRes6A?si=h1iM5SmtJivRJMxa"
        thumbnailSrc="https://utfs.io/f/bg00qvD4vhQwhb60kbBQVaHjMe6OvykNURxgt4bFLpK3JArs"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
