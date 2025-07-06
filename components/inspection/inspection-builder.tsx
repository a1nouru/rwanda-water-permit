"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  FileCheck, 
  Save, 
  Send, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Camera,
  FileText
} from "lucide-react"

const inspectionFormSchema = z.object({
  // General Information
  applicationId: z.string().min(1, "Application ID is required"),
  inspectionDate: z.string().min(1, "Inspection date is required"),
  inspectorName: z.string().min(1, "Inspector name is required"),
  inspectionType: z.enum(["initial", "follow_up", "annual", "complaint"]),
  
  // Location Verification
  locationVerification: z.object({
    matches: z.enum(["yes", "no", "partial"]),
    actualCoordinates: z.string().optional(),
    sitePlan: z.boolean().optional(),
    sectionComments: z.string().optional(),
  }),
  
  // Technical Verification
  technicalVerification: z.object({
    waterSourceVerified: z.enum(["yes", "no", "partial"]),
    extractionMethodVerified: z.enum(["yes", "no", "partial"]),
    flowMeasurementVerified: z.enum(["yes", "no", "partial"]),
    infrastructureCondition: z.enum(["good", "fair", "poor"]),
    installationCompliance: z.enum(["yes", "no", "partial"]),
    sectionComments: z.string().optional(),
  }),
  
  // Environmental Compliance
  environmentalCompliance: z.object({
    impactAssessment: z.enum(["minimal", "moderate", "significant"]),
    mitigationMeasures: z.enum(["yes", "no", "partial"]),
    wasteManagement: z.enum(["yes", "no", "partial"]),
    vegetationImpact: z.enum(["minimal", "moderate", "significant"]),
    sectionComments: z.string().optional(),
  }),
  
  // Regulatory Compliance
  regulatoryCompliance: z.object({
    permitConditions: z.enum(["met", "not_met", "partially_met"]),
    volumeLimits: z.enum(["compliant", "non_compliant", "unknown"]),
    reportingRequirements: z.enum(["met", "not_met", "overdue"]),
    feesUpToDate: z.enum(["yes", "no", "partial"]),
    sectionComments: z.string().optional(),
  }),
  
  // Evidence Collection
  evidenceCollection: z.object({
    attachments: z.array(z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      size: z.number(),
      url: z.string().optional(),
    })).optional(),
    samplesCollected: z.boolean().optional(),
    sampleTypes: z.string().optional(),
    gpsCoordinates: z.string().optional(),
    sectionComments: z.string().optional(),
  }),
})

type InspectionFormValues = z.infer<typeof inspectionFormSchema>

// Default values
const defaultValues: Partial<InspectionFormValues> = {
  inspectionDate: new Date().toISOString().split('T')[0],
  inspectorName: "Current Inspector",
  inspectionType: "initial",
  locationVerification: {
    matches: "yes",
    sitePlan: false,
  },
  technicalVerification: {
    waterSourceVerified: "yes",
    extractionMethodVerified: "yes",
    flowMeasurementVerified: "yes",
    infrastructureCondition: "good",
    installationCompliance: "yes",
  },
  environmentalCompliance: {
    impactAssessment: "minimal",
    mitigationMeasures: "yes",
    wasteManagement: "yes",
    vegetationImpact: "minimal",
  },
  regulatoryCompliance: {
    permitConditions: "met",
    volumeLimits: "compliant",
    reportingRequirements: "met",
    feesUpToDate: "yes",
  },
  evidenceCollection: {
    attachments: [],
    samplesCollected: false,
  },
}

export function InspectionBuilder() {
  const searchParams = useSearchParams()
  const applicationId = searchParams.get("applicationId")
  const [activeTab, setActiveTab] = useState("general")
  const [progress, setProgress] = useState(0)

  const form = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionFormSchema),
    defaultValues,
  })

  const { watch } = form

  // Calculate progress based on filled required fields
  useEffect(() => {
    const subscription = watch((value) => {
      let completedSections = 0
      const totalSections = 6 // general, location, technical, environmental, regulatory, evidence
      
      // Check if general section is complete
      if (value.applicationId && value.inspectionDate && value.inspectorName && value.inspectionType) {
        completedSections++
      }
      
      // Check if location verification is complete
      if (value.locationVerification?.matches) {
        completedSections++
      }
      
      // Check if technical verification is complete
      if (value.technicalVerification?.waterSourceVerified && 
          value.technicalVerification?.extractionMethodVerified &&
          value.technicalVerification?.infrastructureCondition) {
        completedSections++
      }
      
      // Check if environmental compliance is complete
      if (value.environmentalCompliance?.impactAssessment && 
          value.environmentalCompliance?.mitigationMeasures) {
        completedSections++
      }
      
      // Check if regulatory compliance is complete
      if (value.regulatoryCompliance?.permitConditions && 
          value.regulatoryCompliance?.volumeLimits) {
        completedSections++
      }
      
      // Check if evidence collection is complete
      if (value.evidenceCollection?.attachments !== undefined || value.evidenceCollection?.samplesCollected !== undefined) {
        completedSections++
      }
      
      const newProgress = Math.round((completedSections / totalSections) * 100)
      setProgress(newProgress)
    })
    
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (applicationId) {
      form.setValue("applicationId", applicationId)
    }
  }, [applicationId, form])

  function onSubmit(data: InspectionFormValues) {
    console.log("Inspection Data:", data)
    // Handle form submission
  }

  const SimpleVerificationField = ({ 
    name, 
    label, 
    description 
  }: { 
    name: string
    label: string
    description?: string
  }) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${name}-yes`} />
                <label htmlFor={`${name}-yes`} className="flex items-center text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 mr-1 text-green-600" />
                  Yes/Matches
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${name}-no`} />
                <label htmlFor={`${name}-no`} className="flex items-center text-sm font-medium">
                  <XCircle className="h-4 w-4 mr-1 text-red-600" />
                  No/Doesn't Match
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id={`${name}-partial`} />
                <label htmlFor={`${name}-partial`} className="flex items-center text-sm font-medium">
                  <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600" />
                  Partial/Needs Review
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const SectionComments = ({ 
    name, 
    label = "Section Comments"
  }: { 
    name: string
    label?: string
  }) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Add any relevant comments or observations for this section..."
              {...field}
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Inspection Report
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Application ID: {applicationId || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">Progress</div>
                <div className="text-2xl font-bold">{progress}%</div>
              </div>
              <Progress value={progress} className="w-24" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="environmental">Environmental</TabsTrigger>
                  <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                </TabsList>

                {/* General Information Tab */}
                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="applicationId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application ID</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inspectionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inspection Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inspectorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inspector Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inspectionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inspection Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inspection type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="initial">Initial Inspection</SelectItem>
                              <SelectItem value="follow_up">Follow-up Inspection</SelectItem>
                              <SelectItem value="annual">Annual Inspection</SelectItem>
                              <SelectItem value="complaint">Complaint Investigation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Location Verification Tab */}
                <TabsContent value="location" className="space-y-6">
                  <div className="space-y-6">
                    <SimpleVerificationField
                      name="locationVerification.matches"
                      label="Location Matches Application"
                      description="Verify if the actual location matches the coordinates provided in the application"
                    />
                    <Separator />
                    
                    {/* Conditional GPS Coordinates field */}
                    {(form.watch("locationVerification.matches") === "no" || 
                      form.watch("locationVerification.matches") === "partial") && (
                      <FormField
                        control={form.control}
                        name="locationVerification.actualCoordinates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Actual GPS Coordinates</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., -1.9441, 30.0619" {...field} />
                            </FormControl>
                            <FormDescription>
                              Record the actual GPS coordinates if different from application
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="locationVerification.sitePlan"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Site Plan Available</FormLabel>
                            <FormDescription>
                              Check if site plan/layout drawing is available and matches reality
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    <SectionComments 
                      name="locationVerification.sectionComments"
                      label="Location Section Comments"
                    />
                  </div>
                </TabsContent>

                {/* Technical Verification Tab */}
                <TabsContent value="technical" className="space-y-6">
                  <div className="space-y-6">
                    <SimpleVerificationField
                      name="technicalVerification.waterSourceVerified"
                      label="Water Source Verification"
                      description="Verify the water source matches the application description"
                    />
                    <Separator />
                    <SimpleVerificationField
                      name="technicalVerification.extractionMethodVerified"
                      label="Extraction Method Verification"
                      description="Verify the extraction method and equipment installed"
                    />
                    <Separator />
                    <SimpleVerificationField
                      name="technicalVerification.flowMeasurementVerified"
                      label="Flow Measurement System"
                      description="Verify flow measurement equipment and calibration"
                    />
                    <Separator />
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="technicalVerification.infrastructureCondition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Infrastructure Condition</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="good" id="infra-good" />
                                  <label htmlFor="infra-good" className="flex items-center text-sm font-medium">
                                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-600" />
                                    Good
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="fair" id="infra-fair" />
                                  <label htmlFor="infra-fair" className="flex items-center text-sm font-medium">
                                    <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600" />
                                    Fair
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="poor" id="infra-poor" />
                                  <label htmlFor="infra-poor" className="flex items-center text-sm font-medium">
                                    <XCircle className="h-4 w-4 mr-1 text-red-600" />
                                    Poor
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <SimpleVerificationField
                      name="technicalVerification.installationCompliance"
                      label="Installation Compliance"
                      description="Verify if installation meets regulatory requirements"
                    />
                    <Separator />
                    <SectionComments 
                      name="technicalVerification.sectionComments"
                      label="Technical Section Comments"
                    />
                  </div>
                </TabsContent>

                {/* Environmental Compliance Tab */}
                <TabsContent value="environmental" className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="environmentalCompliance.impactAssessment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Environmental Impact Assessment</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="minimal" id="impact-minimal" />
                                  <label htmlFor="impact-minimal" className="text-sm font-medium">Minimal</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="moderate" id="impact-moderate" />
                                  <label htmlFor="impact-moderate" className="text-sm font-medium">Moderate</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="significant" id="impact-significant" />
                                  <label htmlFor="impact-significant" className="text-sm font-medium">Significant</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <SimpleVerificationField
                      name="environmentalCompliance.mitigationMeasures"
                      label="Mitigation Measures"
                      description="Verify implementation of environmental mitigation measures"
                    />
                    <Separator />
                    <SimpleVerificationField
                      name="environmentalCompliance.wasteManagement"
                      label="Waste Management"
                      description="Verify proper waste management practices"
                    />
                    <Separator />
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="environmentalCompliance.vegetationImpact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Vegetation Impact</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="minimal" id="veg-minimal" />
                                  <label htmlFor="veg-minimal" className="text-sm font-medium">Minimal</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="moderate" id="veg-moderate" />
                                  <label htmlFor="veg-moderate" className="text-sm font-medium">Moderate</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="significant" id="veg-significant" />
                                  <label htmlFor="veg-significant" className="text-sm font-medium">Significant</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <SectionComments 
                      name="environmentalCompliance.sectionComments"
                      label="Environmental Section Comments"
                    />
                  </div>
                </TabsContent>

                {/* Regulatory Compliance Tab */}
                <TabsContent value="regulatory" className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="regulatoryCompliance.permitConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Permit Conditions</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="met" id="permit-met" />
                                  <label htmlFor="permit-met" className="text-sm font-medium">Met</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="not_met" id="permit-not-met" />
                                  <label htmlFor="permit-not-met" className="text-sm font-medium">Not Met</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="partially_met" id="permit-partial" />
                                  <label htmlFor="permit-partial" className="text-sm font-medium">Partially Met</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="regulatoryCompliance.volumeLimits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Volume Limits</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="compliant" id="volume-compliant" />
                                  <label htmlFor="volume-compliant" className="text-sm font-medium">Compliant</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="non_compliant" id="volume-non-compliant" />
                                  <label htmlFor="volume-non-compliant" className="text-sm font-medium">Non-Compliant</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="unknown" id="volume-unknown" />
                                  <label htmlFor="volume-unknown" className="text-sm font-medium">Unknown</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="regulatoryCompliance.reportingRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Reporting Requirements</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="met" id="reporting-met" />
                                  <label htmlFor="reporting-met" className="text-sm font-medium">Met</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="not_met" id="reporting-not-met" />
                                  <label htmlFor="reporting-not-met" className="text-sm font-medium">Not Met</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="overdue" id="reporting-overdue" />
                                  <label htmlFor="reporting-overdue" className="text-sm font-medium">Overdue</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <SimpleVerificationField
                      name="regulatoryCompliance.feesUpToDate"
                      label="Fees Up to Date"
                      description="Verify if all required fees are paid and up to date"
                    />
                    <Separator />
                    <SectionComments 
                      name="regulatoryCompliance.sectionComments"
                      label="Regulatory Section Comments"
                    />
                  </div>
                </TabsContent>

                {/* Evidence Collection Tab */}
                <TabsContent value="evidence" className="space-y-6">
                  <div className="space-y-6">
                    {/* Document Attachment Section */}
                    <div className="space-y-4">
                      <FormLabel className="text-base font-medium">Document Attachment</FormLabel>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2"
                              onClick={() => {
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.multiple = true
                                input.accept = '.pdf,.jpg,.jpeg,.png'
                                input.onchange = (e) => {
                                  const files = (e.target as HTMLInputElement).files
                                  if (files) {
                                    const currentAttachments = form.getValues("evidenceCollection.attachments") || []
                                    const newAttachments = Array.from(files).map(file => ({
                                      id: crypto.randomUUID(),
                                      name: file.name,
                                      type: file.type,
                                      size: file.size,
                                      url: URL.createObjectURL(file)
                                    }))
                                    form.setValue("evidenceCollection.attachments", [...currentAttachments, ...newAttachments])
                                  }
                                }
                                input.click()
                              }}
                            >
                              Choose Files
                            </Button>
                          </div>
                          <FormDescription className="text-center">
                            Upload PDFs or images (JPG, PNG) of your inspection evidence.<br/>
                            Max size: 5MB per file. Multiple files allowed.
                          </FormDescription>
                        </div>
                      </div>
                      
                      {/* Display attached files */}
                      {form.watch("evidenceCollection.attachments")?.map((attachment, index) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">{attachment.name}</span>
                            <span className="text-xs text-green-600">
                              ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              const attachments = form.getValues("evidenceCollection.attachments") || []
                              const updatedAttachments = attachments.filter((_, i) => i !== index)
                              form.setValue("evidenceCollection.attachments", updatedAttachments)
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Samples Section */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="evidenceCollection.samplesCollected"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Samples Collected</FormLabel>
                              <FormDescription>
                                Check if water/soil samples were collected
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="evidenceCollection.sampleTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sample Types</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe types of samples collected..."
                                {...field}
                                rows={2}
                                disabled={!form.watch("evidenceCollection.samplesCollected")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="evidenceCollection.gpsCoordinates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPS Coordinates for Evidence</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., -1.9441, 30.0619" {...field} />
                          </FormControl>
                          <FormDescription>
                            Record GPS coordinates where evidence was collected
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <SectionComments 
                      name="evidenceCollection.sectionComments"
                      label="Evidence Section Comments"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button type="submit" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Submit Report
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Progress: {progress}% Complete
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
} 