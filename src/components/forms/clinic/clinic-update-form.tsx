"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateClinic } from "@/actions/clinic"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { Clinic } from "@/db/schema"
import {
  updateClinicSchema,
  type UpdateClinicInput,
} from "@/validations/clinic"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

interface ClinicUpdateFormProps {
  clinic: Clinic
}

export function ClinicUpdateForm({
  clinic,
}: ClinicUpdateFormProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<UpdateClinicInput>({
    resolver: zodResolver(updateClinicSchema),
    defaultValues: {
      latitude: clinic.latitude,
      longitude: clinic.longitude,
      address: clinic.address,
      phone_1: clinic.phone_1,
      phone_2: clinic.phone_2,
      email: clinic.email,
    },
  })

  function onSubmit(formData: UpdateClinicInput) {
    startTransition(async () => {
      try {
        const message = await updateClinic({
          id: formData.id,
          latitude: formData.latitude,
          longitude: formData.longitude,
          address: formData.address,
          phone_1: formData.phone_1,
          phone_2: formData.phone_2,
          email: formData.email,
        })

        switch (message) {
          case "not-found":
            toast({
              title: "Clinic not found",
              description: "Could not find a clinic with the provided ID",
              variant: "destructive",
            })
            break
          case "success":
            toast({ title: "Clinic data has been updated" })
            router.push("/admin/clinic")
            break
          default:
            toast({
              title: "Something went wrong",
              description: "Failed to update clinic data",
              variant: "destructive",
            })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: "Something went wrong",
          description: "Failed to update clinic data",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-6"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landline phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="14 61 164 99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="501 014 554" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="newvision@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Example St, 12345 City"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input placeholder="49.963088528718764" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input placeholder="20.419507255029654" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update
          <span className="sr-only">Update</span>
        </Button>
      </form>
    </Form>
  )
}
        