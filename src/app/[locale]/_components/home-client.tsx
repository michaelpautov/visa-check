'use client'

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { FaHome, FaFile, FaUser } from "react-icons/fa";
import { HomeTab } from "./_tabs/home-tab";

export function HomeClient() {
  const iconClassName = "text-2xl";
  const triggerClassName = 'flex-1 py-2 data-[state=active]:bg-primary/10'

  return (
    <Tabs defaultValue="home" className="w-full h-full flex flex-col p-6 relative">
      <div className="flex-1 overflow-auto pb-24">
        <TabsContent value="home"><HomeTab /></TabsContent>
        <TabsContent value="documents">Documents</TabsContent>
        <TabsContent value="profile">Profile</TabsContent>
      </div>
      <TabsList className="fixed rounded-none bottom-6 left-0 right-0 bg-background h-16 w-full grid grid-cols-3 p-6">
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
