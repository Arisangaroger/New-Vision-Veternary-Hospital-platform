"use client"

import * as React from "react"
import Link from "next/link"
import { deleteBooking } from "@/actions/booking"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"

import { bookings, type Booking } from "@/db/schema"

import { useToast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

interface BookingsTableShellProps {
  data: Booking[]
  pageCount: number
  clinicId: number
}

export function BookingsTableShell({
  data,
  pageCount,
  clinicId,
}: BookingsTableShellProps): JSX.Element {
  const toast = useToast()
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<Booking, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ cell }) => {
          const types = Object.values(bookings.type.enumValues)
          const type = cell.getValue() as Booking["type"]

          if (!types.includes(type)) return null

          return (
            <Badge variant="outline" className="capitalize">
              {type}
            </Badge>
          )
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const statuses = Object.values(bookings.status.enumValues)
          const status = cell.getValue() as Booking["status"]

          if (!statuses.includes(status)) return null

          return (
            <Badge variant="outline" className="capitalize">
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "slot",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="First Name" />
        ),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last Name" />
        ),
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "message",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Message" />
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created at" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Updated at" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/admin/bookings/${row.original.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/booking/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false)

                    // toast(
                    //   deleteBookingAction({
                    //     id: row.original.id,
                    //     clinicId,
                    //   }),
                    //   {
                    //     loading: "Usuwanie...",
                    //     success: () => "Booking successfully deleted",
                    //     error: (err: unknown) => console.error(err),
                    //   }
                    // )
                  })
                }}
                disabled={isPending}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, clinicId]
  )

  // function deleteSelectedRows() {
  //   toast.promise(
  //     Promise.all(
  //       selectedRowIds.map((id) =>
  //         deleteBookingAction({
  //           id,
  //           clinicId,
  //         })
  //       )
  //     ),
  //     {
  //       loading: "Usuwanie...",
  //       success: () => {
  //         setSelectedRowIds([])
  //         return "Selected bookings successfully deleted"
  //       },
  //       error: (err: unknown) => {
  //         setSelectedRowIds([])
  //         return catchError(err)
  //       },
  //     }
  //   )
  // }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "type",
          title: "Type",
          options: bookings.type.enumValues.map((type) => ({
            label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
            value: type,
          })),
        },
      ]}
      // searchableColumns={[
      //   {
      //     id: "name",
      //     title: "names",
      //   },
      // ]}
      newRowLink={`/admin/bookings/add`}
      // deleteRowsAction={() => void deleteSelectedRows()}
    />
  )
}
       