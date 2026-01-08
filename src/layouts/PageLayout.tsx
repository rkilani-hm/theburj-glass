import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LoadingScreen from "@/components/alhamra/LoadingScreen";
import { usePageLoad } from "@/hooks/usePageLoad";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const isLoading = usePageLoad(1200);

  return (
    <LanguageProvider>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </LanguageProvider>
  );
};

export default PageLayout;
