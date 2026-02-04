import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(features)/')({
  component: GenerateOutfitPage,
})

function GenerateOutfitPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Outfit</h1>
        <p className="text-muted-foreground">
          Upload your clothes or choose from your wardrobe to generate a style.
        </p>
      </div>
      {/* Content will go here */}
      <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
        Outfit generation form will be implemented here.
      </div>
    </div>
  )
}
