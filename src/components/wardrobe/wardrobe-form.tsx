import { zodResolver } from '@hookform/resolvers/zod'
import { Cancel01Icon, ImageAdd01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { WARDROBE_CATEGORY_LIST } from '@/lib/constant'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import {
  type CreateWardrobePayload,
  CreateWardrobeSchema,
} from '@/schemas/wardrobe-schema'

interface WardrobeFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const WardrobeForm = ({
  onSuccess: _onSuccess,
  onCancel,
}: WardrobeFormProps) => {
  // const createWardrobe = useCreateWardrobe();
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CreateWardrobePayload>({
    resolver: zodResolver(CreateWardrobeSchema),
    defaultValues: {
      name: '',
      notes: '',
    },
  })

  const onSubmit = async (_data: CreateWardrobePayload) => {
    // try {
    //   await createWardrobe.mutateAsync(data);
    //   toast.success("Wardrobe item added successfully");
    //   handleReset();
    //   onSuccess?.();
    // } catch (error) {
    //   error instanceof Error
    //     ? toast.error(error.message)
    //     : toast.error("Something went wrong");
    // }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('image', file, { shouldValidate: true })
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleRemoveImage = () => {
    form.resetField('image')
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleReset = () => {
    form.reset()
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCancel = () => {
    handleReset()
    onCancel?.()
  }

  return (
    <form
      id="add-wardrobe-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-6 px-4"
    >
      <FieldSet>
        <FieldGroup>
          <Controller
            name="image"
            control={form.control}
            render={({ fieldState }) => (
              <Field>
                <FieldLabel>
                  Image Upload<span className="text-destructive">*</span>
                </FieldLabel>
                {imagePreview ? (
                  <div className="border-border relative aspect-square w-full max-w-48 overflow-hidden rounded-lg border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute top-2 right-2 bg-white"
                      onClick={handleRemoveImage}
                    >
                      <HugeiconsIcon
                        className="text-destructive"
                        icon={Cancel01Icon}
                        strokeWidth={2}
                      />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="border-border bg-muted/30 hover:bg-muted/50 flex aspect-square w-full max-w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
                  >
                    <HugeiconsIcon
                      icon={ImageAdd01Icon}
                      strokeWidth={1.5}
                      className="text-muted-foreground size-8"
                    />
                    <span className="text-muted-foreground mt-2 text-sm">
                      Click to upload
                    </span>
                    <span className="text-muted-foreground text-xs">
                      JPEG, PNG, WEBP (max 5MB)
                    </span>
                  </label>
                )}
                <input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="category">
                  Category<span className="text-destructive">*</span>
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="category"
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {WARDROBE_CATEGORY_LIST.map((category) => (
                      <SelectItem key={category.key} value={category.key}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">
                  Name{' '}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="e.g., Blue Denim Jacket"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="notes"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="notes">
                  Notes{' '}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="notes"
                  placeholder="Add any notes about this item..."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <div className="mt-6 flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Adding...' : 'Add Item'}
        </Button>
      </div>
    </form>
  )
}

export default WardrobeForm
