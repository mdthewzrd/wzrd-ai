import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PublicationsTable from "./PublicationsTable";

export default async function PublicationsServicesPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <div className="bg-gray-950/50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Publications</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get featured in top publications and media outlets worldwide
            </p>
            
            {/* Navigation Links */}
            <div className="flex justify-center gap-4 mb-8">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                PR & Press Publications
              </Button>
              <Link href="/services/publications/specialty">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Specialty Placements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Publications Table */}
      <PublicationsTable />

      <Footer />
    </div>
  );
}