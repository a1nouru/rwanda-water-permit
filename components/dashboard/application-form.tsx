"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { MapPin, Upload, X, FileText, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the validation schema for the form
const formSchema = z.object({
  // Personal information (prefilled)
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  
  // Permit details
  permitType: z.string({ required_error: "Please select a permit type." }),
  waterSource: z.string({ required_error: "Please select a water source." }),
  purpose: z.string({ required_error: "Please select a purpose." }).min(1),
  waterUsage: z.number().min(1, { message: "Water usage must be greater than 0." }),
  waterUsageUnit: z.string().min(1, { message: "Please select a unit." }),
  
  // Location
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sector: z.string().min(1, { message: "Sector is required" }),
  cell: z.string().min(1, { message: "Cell is required" }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  
  // Project details
  projectTitle: z.string().min(5, { message: "Project title must be at least 5 characters." }),
  projectDescription: z.string().min(20, { message: "Description must be at least 20 characters." }),
  
  // Documents
  paymentProof: z.any().optional(),
  identificationDoc: z.any().optional(),
  landOwnershipDoc: z.any().optional(),
  technicalDrawings: z.any().optional(),
  environmentalImpactDoc: z.any().optional(),
  
  // Terms
  termsAccepted: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface UserData {
  email: string;
  name: string;
  phone: string;
  address: string;
  idNumber: string;
}

interface ApplicationFormProps {
  userData: UserData;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

export function ApplicationForm({ userData, onSubmit, isLoading }: ApplicationFormProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [files, setFiles] = useState<Record<string, File | null>>({
    paymentProof: null,
    identificationDoc: null,
    landOwnershipDoc: null,
    technicalDrawings: null,
    environmentalImpactDoc: null,
  });
  
  const fileInputRefs = {
    paymentProof: useRef<HTMLInputElement>(null),
    identificationDoc: useRef<HTMLInputElement>(null),
    landOwnershipDoc: useRef<HTMLInputElement>(null),
    technicalDrawings: useRef<HTMLInputElement>(null),
    environmentalImpactDoc: useRef<HTMLInputElement>(null),
  };
  
  // Initialize form with default values from user data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      permitType: "",
      waterSource: "",
      purpose: "",
      waterUsage: 0,
      waterUsageUnit: "m3_per_day",
      province: "",
      district: "",
      sector: "",
      cell: "",
      latitude: "",
      longitude: "",
      projectTitle: "",
      projectDescription: "",
      termsAccepted: false,
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [fileType]: e.target.files![0],
      }));
    }
  };
  
  const removeFile = (fileType: string) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [fileType]: null,
    }));
    
    // Reset the file input
    if (fileInputRefs[fileType as keyof typeof fileInputRefs].current) {
      fileInputRefs[fileType as keyof typeof fileInputRefs].current!.value = "";
    }
  };
  
  const handleFormSubmit = (values: FormValues) => {
    // Add files to the form data
    const formData = {
      ...values,
      ...files,
    };
    
    onSubmit(formData);
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude.toString());
          form.setValue("longitude", position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  // District options based on province
  const getDistrictOptions = () => {
    switch (selectedProvince) {
      case "kigali":
        return [
          { value: "gasabo", label: "Gasabo" },
          { value: "kicukiro", label: "Kicukiro" },
          { value: "nyarugenge", label: "Nyarugenge" }
        ];
      case "northern":
        return [
          { value: "burera", label: "Burera" },
          { value: "gakenke", label: "Gakenke" },
          { value: "gicumbi", label: "Gicumbi" },
          { value: "musanze", label: "Musanze" },
          { value: "rulindo", label: "Rulindo" }
        ];
      case "eastern":
        return [
          { value: "bugesera", label: "Bugesera" },
          { value: "gatsibo", label: "Gatsibo" },
          { value: "kayonza", label: "Kayonza" },
          { value: "kirehe", label: "Kirehe" },
          { value: "ngoma", label: "Ngoma" },
          { value: "nyagatare", label: "Nyagatare" },
          { value: "rwamagana", label: "Rwamagana" }
        ];
      case "southern":
        return [
          { value: "gisagara", label: "Gisagara" },
          { value: "huye", label: "Huye" },
          { value: "kamonyi", label: "Kamonyi" },
          { value: "muhanga", label: "Muhanga" },
          { value: "nyamagabe", label: "Nyamagabe" },
          { value: "nyanza", label: "Nyanza" },
          { value: "nyaruguru", label: "Nyaruguru" },
          { value: "ruhango", label: "Ruhango" }
        ];
      case "western":
        return [
          { value: "karongi", label: "Karongi" },
          { value: "ngororero", label: "Ngororero" },
          { value: "nyabihu", label: "Nyabihu" },
          { value: "nyamasheke", label: "Nyamasheke" },
          { value: "rubavu", label: "Rubavu" },
          { value: "rusizi", label: "Rusizi" },
          { value: "rutsiro", label: "Rutsiro" }
        ];
      default:
        return [];
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Water Permit Application Form</CardTitle>
          <CardDescription>
            Fill out all required fields to submit your water permit application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="details">Applicant Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="project">Project Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                {/* Applicant Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Permit Details Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Permit Details</h3>
                      <FormField
                        control={form.control}
                        name="permitType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Permit Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select permit type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="extraction">Water Extraction</SelectItem>
                                <SelectItem value="borehole">Borehole Drilling</SelectItem>
                                <SelectItem value="wastewater">Wastewater Discharge</SelectItem>
                                <SelectItem value="irrigation">Irrigation</SelectItem>
                                <SelectItem value="industrial">Industrial Use</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="waterSource"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Water Source</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select water source" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="groundwater">Groundwater</SelectItem>
                                <SelectItem value="river">River</SelectItem>
                                <SelectItem value="lake">Lake</SelectItem>
                                <SelectItem value="spring">Spring</SelectItem>
                                <SelectItem value="dam">Dam/Reservoir</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purpose</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="domestic">Domestic</SelectItem>
                                <SelectItem value="agriculture">Agriculture</SelectItem>
                                <SelectItem value="livestock">Livestock</SelectItem>
                                <SelectItem value="industrial">Industrial</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="waterUsage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Water Usage Volume</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="waterUsageUnit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="m3_per_day">m³/day</SelectItem>
                                  <SelectItem value="m3_per_week">m³/week</SelectItem>
                                  <SelectItem value="m3_per_month">m³/month</SelectItem>
                                  <SelectItem value="litres_per_second">litres/second</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("location")}>
                      Next: Location
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Location Tab */}
                <TabsContent value="location" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Administrative Location</h3>
                      
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedProvince(value);
                                // Reset district when province changes
                                form.setValue("district", "");
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select province" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="kigali">Kigali City</SelectItem>
                                <SelectItem value="eastern">Eastern Province</SelectItem>
                                <SelectItem value="western">Western Province</SelectItem>
                                <SelectItem value="northern">Northern Province</SelectItem>
                                <SelectItem value="southern">Southern Province</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedProvince}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select district" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {getDistrictOptions().map(district => (
                                  <SelectItem key={district.value} value={district.value}>
                                    {district.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sector</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cell"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cell</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Geographic Coordinates</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Click the button below to automatically get your current location or enter coordinates manually.
                      </p>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2 mb-4"
                        onClick={handleGetLocation}
                      >
                        <MapPin className="h-4 w-4" />
                        Get Current Location
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="latitude"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Latitude</FormLabel>
                              <FormControl>
                                <Input {...field} />
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
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-4 h-40 flex items-center justify-center">
                        <p className="text-muted-foreground text-center">Map preview will be displayed here</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                      Previous: Details
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("project")}>
                      Next: Project Details
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Project Details Tab */}
                <TabsContent value="project" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Project Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="projectTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={5}
                              placeholder="Provide a detailed description of your project and how you plan to use the water resources"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("location")}>
                      Previous: Location
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("documents")}>
                      Next: Documents
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Required Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Please upload all required documents. Acceptable file formats: PDF, JPG, PNG (max 5MB each).
                    </p>
                    
                    {/* Payment Proof */}
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="paymentProof" className="font-medium">
                          Proof of Payment (IREMBO)
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {files.paymentProof ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 h-8"
                            onClick={() => removeFile("paymentProof")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : null}
                      </div>
                      
                      {!files.paymentProof ? (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                          onClick={() => fileInputRefs.paymentProof.current?.click()}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload proof of payment
                          </p>
                          <input
                            ref={fileInputRefs.paymentProof}
                            type="file"
                            id="paymentProof"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "paymentProof")}
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium truncate flex-1">
                            {files.paymentProof.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(files.paymentProof.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Identification Document */}
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="identificationDoc" className="font-medium">
                          Identification Document
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {files.identificationDoc ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 h-8"
                            onClick={() => removeFile("identificationDoc")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : null}
                      </div>
                      
                      {!files.identificationDoc ? (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                          onClick={() => fileInputRefs.identificationDoc.current?.click()}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload identification document
                          </p>
                          <input
                            ref={fileInputRefs.identificationDoc}
                            type="file"
                            id="identificationDoc"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "identificationDoc")}
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium truncate flex-1">
                            {files.identificationDoc.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(files.identificationDoc.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Land Ownership Document */}
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="landOwnershipDoc" className="font-medium">
                          Land Ownership Document
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        {files.landOwnershipDoc ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 h-8"
                            onClick={() => removeFile("landOwnershipDoc")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : null}
                      </div>
                      
                      {!files.landOwnershipDoc ? (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                          onClick={() => fileInputRefs.landOwnershipDoc.current?.click()}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload land ownership document
                          </p>
                          <input
                            ref={fileInputRefs.landOwnershipDoc}
                            type="file"
                            id="landOwnershipDoc"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "landOwnershipDoc")}
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium truncate flex-1">
                            {files.landOwnershipDoc.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(files.landOwnershipDoc.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Technical Drawings */}
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="technicalDrawings" className="font-medium">
                          Technical Drawings (if applicable)
                        </Label>
                        {files.technicalDrawings ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 h-8"
                            onClick={() => removeFile("technicalDrawings")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : null}
                      </div>
                      
                      {!files.technicalDrawings ? (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                          onClick={() => fileInputRefs.technicalDrawings.current?.click()}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload technical drawings
                          </p>
                          <input
                            ref={fileInputRefs.technicalDrawings}
                            type="file"
                            id="technicalDrawings"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "technicalDrawings")}
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium truncate flex-1">
                            {files.technicalDrawings.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(files.technicalDrawings.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Environmental Impact Document */}
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="environmentalImpactDoc" className="font-medium">
                          Environmental Impact Assessment (if applicable)
                        </Label>
                        {files.environmentalImpactDoc ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 h-8"
                            onClick={() => removeFile("environmentalImpactDoc")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : null}
                      </div>
                      
                      {!files.environmentalImpactDoc ? (
                        <div 
                          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                          onClick={() => fileInputRefs.environmentalImpactDoc.current?.click()}
                        >
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload environmental impact assessment
                          </p>
                          <input
                            ref={fileInputRefs.environmentalImpactDoc}
                            type="file"
                            id="environmentalImpactDoc"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "environmentalImpactDoc")}
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium truncate flex-1">
                            {files.environmentalImpactDoc.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(files.environmentalImpactDoc.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Terms and Conditions */}
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I certify that all information provided is accurate and complete
                            </FormLabel>
                            <FormDescription>
                              By submitting this application, you agree to our terms and conditions
                              and understand that false information may result in rejection.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("project")}>
                      Previous: Project Details
                    </Button>
                    <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                      {isLoading ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
} 