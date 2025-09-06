import ServicePlatformPage from "@/components/ServicePlatformPage";

export default function EmailAutomationServicesPage() {
  return (
    <ServicePlatformPage
      platform="email"
      platformName="Email Automation"
      platformIcon="📧"
      platformGradient="bg-gradient-to-r from-teal-400 to-blue-500"
      platformDescription="Automate your email marketing with professional campaigns and sequences"
    />
  );
}