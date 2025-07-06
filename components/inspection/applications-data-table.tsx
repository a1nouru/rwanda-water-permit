"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TypographyH3, TypographyP, TypographySmall } from "@/components/ui/typography"
import { ClipboardList, MoreHorizontal, FileCheck } from "lucide-react"
import Link from "next/link"

// Sample data - replace with actual data fetching
const applications = [
  {
    id: "RWB-24-00123",
    applicant: "John Doe",
    location: "Kigali, Gasabo",
    type: "Surface Water",
    status: "Pending Inspection",
    submittedDate: "2024-03-15",
    notes: "Initial site visit required for water source verification",
  },
  {
    id: "RWB-24-00124",
    applicant: "Jane Smith",
    location: "Musanze, Kinigi",
    type: "Groundwater",
    status: "Pending Inspection",
    submittedDate: "2024-03-16",
    notes: "Well drilling location needs verification",
  },
  // Add more sample data as needed
]

export function ApplicationsDataTable() {
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null)

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>{application.applicant}</TableCell>
                <TableCell>{application.location}</TableCell>
                <TableCell>{application.type}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{application.status}</Badge>
                </TableCell>
                <TableCell>{application.submittedDate}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onClick={() => setSelectedApp(application)}
                          >
                            <ClipboardList className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem asChild>
                          <Link href={`/inspection/new?applicationId=${application.id}`}>
                            <FileCheck className="mr-2 h-4 w-4" />
                            Begin Inspection
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-[425px]">
                      {selectedApp && (
                        <div className="space-y-4">
                          <TypographyH3>Application Details</TypographyH3>
                          <div className="grid gap-4">
                            <div>
                              <TypographySmall>Application ID</TypographySmall>
                              <TypographyP>{selectedApp.id}</TypographyP>
                            </div>
                            <div>
                              <TypographySmall>Applicant</TypographySmall>
                              <TypographyP>{selectedApp.applicant}</TypographyP>
                            </div>
                            <div>
                              <TypographySmall>Location</TypographySmall>
                              <TypographyP>{selectedApp.location}</TypographyP>
                            </div>
                            <div>
                              <TypographySmall>Type</TypographySmall>
                              <TypographyP>{selectedApp.type}</TypographyP>
                            </div>
                            <div>
                              <TypographySmall>Notes</TypographySmall>
                              <TypographyP>{selectedApp.notes}</TypographyP>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button asChild>
                              <Link href={`/inspection/new?applicationId=${selectedApp.id}`}>
                                Begin Inspection
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 