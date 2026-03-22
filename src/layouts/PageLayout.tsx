import { ReactNode } from "react";
import TowerLoader from "@/components/alhamra/TowerLoader";
import { useInitialLoad } from "@/hooks/useInitialLoad";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { isLoading, handleComplete, minDuration } = useInitialLoad({
    minDuration: 2500,
    sessionKey: "alhamra_loader_shown",
  });

  return (
    <>
      {isLoading && (
        <TowerLoader
          durationMs={minDuration}
          onComplete={handleComplete}
          theme="light"
        />
      )}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          ...(isLoading ? { filter: "blur(4px)" } : {}),
          transition: "opacity 0.6s ease-out, filter 0.6s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageLayout;
