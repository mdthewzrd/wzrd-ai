import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceById, platformConfigs } from "@/lib/services-data-complete";

export default function ServiceDetail({
  params,
}: {
  params: { category: string; platform: string; serviceId: string };
}) {
  const service = getServiceById(params.serviceId);
  const platformConfig = platformConfigs[params.platform as keyof typeof platformConfigs];
  
  if (!service || !platformConfig) {
    notFound();
  }
  
  return <ServiceDetailPage service={service} platformConfig={platformConfig} />;
}

// Generate static params for all services
export function generateStaticParams() {
  const { completeServicesData } = require("@/lib/services-data-complete");
  
  return completeServicesData.map((service: any) => {
    const categoryMap: Record<string, string> = {
      socialMedia: "social-media",
      publication: "publications",
      tool: "tools"
    };
    
    return {
      category: categoryMap[service.category],
      platform: service.platform,
      serviceId: service.id
    };
  });
}