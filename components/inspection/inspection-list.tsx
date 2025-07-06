import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

const inspections = [
  {
    id: "INS-24-001",
    permitId: "RWB-24-00123",
    location: "Kigali, Gasabo",
    status: "Scheduled",
    date: "2024-03-15",
    inspector: "John Doe"
  },
  {
    id: "INS-24-002",
    permitId: "RWB-24-00120",
    location: "Musanze, Kinigi",
    status: "Completed",
    date: "2024-03-10",
    inspector: "Jane Smith"
  },
  // Add more sample data as needed
]

export function InspectionList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Inspection ID</TableHead>
            <TableHead>Permit ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Inspector</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell className="font-medium">{inspection.id}</TableCell>
              <TableCell>{inspection.permitId}</TableCell>
              <TableCell>{inspection.location}</TableCell>
              <TableCell>
                <Badge
                  variant={inspection.status === "Completed" ? "default" : "secondary"}
                >
                  {inspection.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(inspection.date)}</TableCell>
              <TableCell>{inspection.inspector}</TableCell>
              <TableCell className="text-right">
                <Link href={`/inspection/${inspection.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 