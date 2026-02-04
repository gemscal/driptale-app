import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WARDROBE_CATEGORIES, WARDROBE_CATEGORY_LIST } from "@/lib/constant";
import { ImageAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(features)/wardrobe")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  const renderContent = () => {
    // if (isLoading) {
    //   return (
    //     <div className="flex items-center justify-center py-32">
    //       <p className="text-muted-foreground">Loading wardrobe...</p>
    //     </div>
    //   );
    // }

    // if (error) {
    //   return (
    //     <div className="flex items-center justify-center py-32">
    //       <p className="text-destructive">
    //         Failed to load wardrobe. Please try again.
    //       </p>
    //     </div>
    //   );
    // }

    return (
      <>
        <TabsContent value={WARDROBE_CATEGORIES.HEADWEAR}>
          {/* <Headwear items={headwearItems} /> */}
          headerwear
        </TabsContent>
        <TabsContent value={WARDROBE_CATEGORIES.UPPER}>
          {/* <UpperClothing items={upperItems} /> */}
          upper clothing
        </TabsContent>
        <TabsContent value={WARDROBE_CATEGORIES.LOWER}>
          {/* <LowerClothing items={lowerItems} /> */}
          lower clothing
        </TabsContent>
        <TabsContent value={WARDROBE_CATEGORIES.FOOTWEAR}>
          {/* <Footwear items={footwearItems} /> */}
          footwear
        </TabsContent>
        <TabsContent value={WARDROBE_CATEGORIES.ACCESSORIES}>
          {/* <Accessories items={accessoriesItems} /> */}
          accessories
        </TabsContent>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wardrobe</h1>
        <p className="text-muted-foreground">
          Manage your virtual wardrobe and add new items to your collection.
        </p>
      </div>

      <Tabs defaultValue={WARDROBE_CATEGORIES.HEADWEAR}>
        <div className="flex justify-between items-center">
          <TabsList>
            {WARDROBE_CATEGORY_LIST.map((category) => (
              <TabsTrigger key={category.key} value={category.key}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <HugeiconsIcon icon={ImageAdd01Icon} strokeWidth={2} />
                Add Clothing Item
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>New Clothing Item</SheetTitle>
                <SheetDescription>
                  Add a new clothing item to your wardrobe.
                </SheetDescription>
              </SheetHeader>

              {/* <WardrobeForm
                onSuccess={handleSheetClose}
                onCancel={handleSheetClose}
              /> */}
            </SheetContent>
          </Sheet>
        </div>
        <Separator className="my-2" />
        {renderContent()}
      </Tabs>
    </div>
  );
}
