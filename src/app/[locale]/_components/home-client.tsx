'use client'

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { FaHome, FaFile, FaUser } from "react-icons/fa";
import { HomeTab } from "./_tabs/home-tab";
import { ProfileTab } from "./_tabs/profile-tab";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export function HomeClient() {
  const iconClassName = "text-2xl";
  const triggerClassName = 'flex-1 py-2 data-[state=active]:bg-primary/10'
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'home';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full h-screen flex flex-col">
      <div className="flex-1 p-6">
        <TabsContent value="home" className="h-full"><HomeTab /></TabsContent>
        <TabsContent value="documents" className="h-full">Documents</TabsContent>
        <TabsContent value="profile" className="h-full"><ProfileTab /></TabsContent>
      </div>
      <TabsList className="flex-none rounded-none bg-background w-full flex justify-between items-center p-6 h-auto ">
        <TabsTrigger 
          value="home" 
          className={triggerClassName}
        >
          <FaHome className={iconClassName} />
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          className={triggerClassName}
        >
          <FaFile className={iconClassName} />
        </TabsTrigger>
        <TabsTrigger 
          value="profile" 
          className={triggerClassName}
        >
          <FaUser className={iconClassName} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
