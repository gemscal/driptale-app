import * as z from 'zod'

import { WARDROBE_CATEGORIES } from '@/lib/constant'

// Derive allowed values from the constant
const categoryValues = Object.values(WARDROBE_CATEGORIES) as [
  string,
  ...string[],
]

// Schema for creating a new wardrobe item (matches backend POST endpoint)
export const CreateWardrobeSchema = z.object({
  image: z
    .instanceof(File, { message: 'Image is required' })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'Image must be less than 5MB'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP images are allowed'
    ),
  category: z.enum(categoryValues, {
    message: 'Please select a category',
  }),
  name: z.string().max(100, 'Name must be less than 100 characters').optional(),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
})

export type CreateWardrobePayload = z.infer<typeof CreateWardrobeSchema>

/**
 * Converts form data to FormData for multipart/form-data submission
 * Use this when submitting to endpoints that accept file uploads
 */
export function toFormData(data: CreateWardrobePayload): FormData {
  const formData = new FormData()

  formData.append('image', data.image)
  formData.append('category', data.category)

  if (data.name) {
    formData.append('name', data.name)
  }

  if (data.notes) {
    formData.append('notes', data.notes)
  }

  return formData
}
