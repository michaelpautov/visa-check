'use client'

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { FaHome, FaFile, FaUser } from "react-icons/fa";
import { HomeTab } from "./_tabs/home-tab";
import { ProfileTab } from "./_tabs/profile-tab";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HomeClient() {
  const iconClassName = "text-2xl";
  const triggerClassName = 'flex-1 py-2 data-[state=active]:bg-primary/10'
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'home';
  const [tabsHeight, setTabsHeight] = useState(0);
  const tabsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsListRef.current) {
      setTabsHeight(tabsListRef.current.offsetHeight);
    }
  }, []);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full h-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentTab === "home" && (
            <motion.div
              key="home"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="h-full"
            >
              <TabsContent value="home" className="h-full"><HomeTab /></TabsContent>
            </motion.div>
          )}
          {currentTab === "documents" && (
            <motion.div
              key="documents"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="h-full"
            >
              <TabsContent value="documents" className="h-full">Documents</TabsContent>
            </motion.div>
          )}
          {currentTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="h-full"
            >
              <TabsContent value="profile" className="h-full"><ProfileTab tabsHeight={tabsHeight} /></TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <TabsList ref={tabsListRef} className="flex-none rounded-none bg-background w-full flex justify-between items-center p-6 h-auto ">
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
