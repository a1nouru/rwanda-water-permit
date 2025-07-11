"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, MapPin, FileText, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useApplications } from "@/hooks/useApplications";
import type { Application } from "@/types/database";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getApplication, loading } = useApplications();
  
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const applicationId = params.id as string;
        console.log('Fetching application details for ID:', applicationId);
        
        const app = await getApplication(applicationId);
        if (app) {
          setApplication(app);
          console.log('✅ Application details loaded:', app);
        } else {
          setError('Application not found');
          console.log('❌ Application not found for ID:', applicationId);
        }
      } catch (err) {
        console.error('❌ Error fetching application:', err);
        setError('Failed to load application details');
      }
    };
    
    if (params.id) {
    fetchApplicationDetails();
    }
  }, [params.id, getApplication]);
  
  // Function to render the correct status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">Draft</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Submitted</Badge>;
      case "under_review":
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Under Review</Badge>;
      case "pending_inspection":
        return <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">Pending Inspection</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Rejected</Badge>;
      case "revision_required":
        return <Badge variant="outline" className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">Revision Required</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // Format application type for display
  const formatApplicationType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to extract coordinates from PostGIS data
  const formatCoordinates = (coordinates: any) => {
    try {
      if (coordinates && typeof coordinates === 'object') {
        // Handle PostGIS Point geometry
        if (coordinates.type === 'Point' && coordinates.coordinates) {
          const [lng, lat] = coordinates.coordinates;
          return `${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E`;
        }
      }
      return JSON.stringify(coordinates);
    } catch (error) {
      return 'Invalid coordinates';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading application details...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h2 className="font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl text-red-600 mb-4">Error</h2>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground mb-6">{error}</p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!application) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h2 className="font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl mb-4">Application Not Found</h2>
            <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground mb-6">
              Application not found. Please check the application ID and try again.
            </p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Application Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">{application.project_title}</h1>
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground">
                Application submitted on {formatDate(application.created_at)}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              {getStatusBadge(application.status)}
              <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-sm text-muted-foreground">
                {`Application ID: ${application.id} • Status: ${application.status}`}
              </p>
            </div>
          </div>
          
          {/* Application Details */}
          <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Information
                </CardTitle>
                </CardHeader>
              <CardContent className="space-y-4">
                    <div>
                  <p className="text-sm text-muted-foreground">Application Type</p>
                  <p className="font-medium">{formatApplicationType(application.application_type)}</p>
                    </div>
                    <div>
                  <p className="text-sm text-muted-foreground">Water Source</p>
                  <p className="font-medium">{formatApplicationType(application.water_source)}</p>
                    </div>
                    <div>
                  <p className="text-sm text-muted-foreground">Water Purpose</p>
                  <p className="font-medium">{formatApplicationType(application.water_purpose)}</p>
                    </div>
                    <div>
                  <p className="text-sm text-muted-foreground">Usage</p>
                  <p className="font-medium">
                    {application.estimated_usage_volume} {application.usage_unit}
                  </p>
                    </div>
                {application.project_value && (
                    <div>
                    <p className="text-sm text-muted-foreground">Project Value</p>
                    <p className="font-medium">RWF {application.project_value.toLocaleString()}</p>
                    </div>
                )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Information
                </CardTitle>
                </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Province</p>
                  <p className="font-medium">{application.province}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">District</p>
                  <p className="font-medium">{application.district}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sector</p>
                  <p className="font-medium">{application.sector}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cell</p>
                  <p className="font-medium">{application.cell}</p>
                </div>
                                 {application.village && (
                   <div>
                     <p className="text-sm text-muted-foreground">Village</p>
                     <p className="font-medium">{application.village}</p>
                   </div>
                 )}
                 {application.coordinates && (
                   <div>
                     <p className="text-sm text-muted-foreground">GPS Coordinates</p>
                     <p className="font-medium">
                       {formatCoordinates(application.coordinates)}
                     </p>
                        </div>
                 )}
                </CardContent>
              </Card>
            </div>
            
          {/* Project Description */}
          {application.project_description && (
              <Card>
                <CardHeader>
                <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-muted-foreground">{application.project_description}</p>
              </CardContent>
            </Card>
          )}

          {/* Technical Details & Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>🔧 Technical Information & Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.water_taking_method && (
                <div>
                  <p className="text-sm text-muted-foreground">Water Taking Method</p>
                  <p className="font-medium">{application.water_taking_method}</p>
                </div>
              )}
              {application.water_measuring_method && (
                <div>
                  <p className="text-sm text-muted-foreground">Water Measuring Method</p>
                  <p className="font-medium">{application.water_measuring_method}</p>
                </div>
              )}
              {application.storage_facilities && (
                <div>
                  <p className="text-sm text-muted-foreground">Storage Facilities</p>
                  <p className="font-medium">{application.storage_facilities}</p>
                </div>
              )}
              {/* Enhanced Return Flow Description */}
              {application.return_flow_description && (
                <div>
                  <p className="text-sm text-muted-foreground">Return Flow & Duration Details</p>
                  {application.return_flow_description.includes('|') ? (
                    <div className="space-y-2 mt-2">
                      {application.return_flow_description.split(' | ').map((detail, index) => {
                        if (!detail.trim()) return null;
                        const isStructured = detail.includes(':');
                        return (
                          <div key={index} className="pl-4 border-l-2 border-gray-200">
                            {isStructured ? (
                              <>
                                <p className="text-xs text-muted-foreground font-medium">{detail.split(':')[0].trim()}</p>
                                <p className="text-sm">{detail.split(':')[1]?.trim()}</p>
                              </>
                            ) : (
                              <>
                                <p className="text-xs text-muted-foreground font-medium">Quality Description</p>
                                <p className="text-sm">{detail}</p>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="font-medium">{application.return_flow_description}</p>
                  )}
                </div>
              )}
              {application.environmental_assessment && (
                <div>
                  <p className="text-sm text-muted-foreground">Environmental Assessment</p>
                  <p className="font-medium">{application.environmental_assessment}</p>
                </div>
              )}
              {application.mitigation_actions && (
                <div>
                  <p className="text-sm text-muted-foreground">Mitigation Actions</p>
                  <p className="font-medium">{application.mitigation_actions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Infrastructure Details */}
          {(application.infrastructure_pipes || application.infrastructure_pumps || application.infrastructure_valves || application.infrastructure_meters) && (
            <Card>
              <CardHeader>
                <CardTitle>🏗️ Infrastructure Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.infrastructure_pipes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Pipes & Piping System</p>
                    <p className="font-medium">{application.infrastructure_pipes}</p>
                  </div>
                )}
                {application.infrastructure_pumps && (
                  <div>
                    <p className="text-sm text-muted-foreground">Pumps & Pumping System</p>
                    <p className="font-medium">{application.infrastructure_pumps}</p>
                  </div>
                )}
                {application.infrastructure_valves && (
                  <div>
                    <p className="text-sm text-muted-foreground">Valves & Control Systems</p>
                    {application.infrastructure_valves.includes('|') ? (
                      <div className="space-y-2 mt-2">
                        {application.infrastructure_valves.split(' | ').map((detail, index) => {
                          if (!detail.trim()) return null;
                          const isStructured = detail.includes(':');
                          return (
                            <div key={index} className="pl-4 border-l-2 border-blue-200">
                              {isStructured ? (
                                <>
                                  <p className="text-xs text-muted-foreground font-medium">{detail.split(':')[0].trim()}</p>
                                  <p className="text-sm">{detail.split(':')[1]?.trim()}</p>
                                </>
                              ) : (
                                <>
                                  <p className="text-xs text-muted-foreground font-medium">Valve Details</p>
                                  <p className="text-sm">{detail}</p>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="font-medium">{application.infrastructure_valves}</p>
                    )}
                  </div>
                )}
                {application.infrastructure_meters && (
                  <div>
                    <p className="text-sm text-muted-foreground">Meters & Measurement Devices</p>
                    <p className="font-medium">{application.infrastructure_meters}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Application Metadata */}
          {application.internal_notes && (
            <Card>
              <CardHeader>
                <CardTitle>📋 Application Type & Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {application.internal_notes.split(' | ').map((note, index) => {
                    const [label, value] = note.split(':');
                    if (!label || !value) return null;
                    return (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-muted-foreground font-medium">{label.trim()}</p>
                        <p className="font-semibold text-lg">{value.trim()}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Electricity Generation Details */}
          {application.electricity_generation_capacity && (
            <Card>
              <CardHeader>
                <CardTitle>⚡ Electricity Generation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.electricity_generation_capacity.includes('|') ? (
                  // Show structured data
                  application.electricity_generation_capacity.split(' | ').map((detail, index) => {
                    if (!detail.trim()) return null;
                    const [label, value] = detail.split(':');
                    if (!label || !value) {
                      return (
                        <div key={index}>
                          <p className="text-sm text-muted-foreground">Capacity</p>
                          <p className="font-medium">{detail.trim()}</p>
                        </div>
                      );
                    }
                    return (
                      <div key={index}>
                        <p className="text-sm text-muted-foreground">{label.trim()}</p>
                        <p className="font-medium">{value.trim()}</p>
                      </div>
                    );
                  })
                ) : (
                  // Show simple data
                  <div>
                    <p className="text-sm text-muted-foreground">Electricity Generation Capacity</p>
                    <p className="font-medium">{application.electricity_generation_capacity}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Mining Operations Details */}
          {application.mining_operations_type && (
            <Card>
              <CardHeader>
                <CardTitle>⛏️ Mining Operations Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.mining_operations_type.includes('|') ? (
                  // Show structured data
                  application.mining_operations_type.split(' | ').map((detail, index) => {
                    if (!detail.trim()) return null;
                    const [label, value] = detail.split(':');
                    if (!label || !value) {
                      return (
                        <div key={index}>
                          <p className="text-sm text-muted-foreground">Mining Type</p>
                          <p className="font-medium">{detail.trim()}</p>
                        </div>
                      );
                    }
                    return (
                      <div key={index}>
                        <p className="text-sm text-muted-foreground">{label.trim()}</p>
                        <p className="font-medium">{value.trim()}</p>
                      </div>
                    );
                  })
                ) : (
                  // Show simple data
                  <div>
                    <p className="text-sm text-muted-foreground">Mining Operations Type</p>
                    <p className="font-medium">{application.mining_operations_type}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Water Diversion Details */}
          {application.water_diversion_details && (
            <Card>
              <CardHeader>
                <CardTitle>🌊 Water Flow Diversion Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.water_diversion_details.includes('|') ? (
                  // Show structured data in a grid layout for better readability
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {application.water_diversion_details.split(' | ').map((detail, index) => {
                      if (!detail.trim()) return null;
                      const [label, value] = detail.split(':');
                      if (!label || !value) {
                        return (
                          <div key={index} className="col-span-full">
                            <p className="text-sm text-muted-foreground">Water Diversion</p>
                            <p className="font-medium">{detail.trim()}</p>
                          </div>
                        );
                      }
                      return (
                        <div key={index}>
                          <p className="text-sm text-muted-foreground">{label.trim()}</p>
                          <p className="font-medium">{value.trim()}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Show simple data
                  <div>
                    <p className="text-sm text-muted-foreground">Water Diversion Details</p>
                    <p className="font-medium">{application.water_diversion_details}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Assignment & Processing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment & Processing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.assigned_reviewer_id && (
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Reviewer ID</p>
                  <p className="font-medium">{application.assigned_reviewer_id}</p>
                </div>
              )}
              {application.assigned_inspector_id && (
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Inspector ID</p>
                  <p className="font-medium">{application.assigned_inspector_id}</p>
                </div>
              )}
              {application.assigned_approver_id && (
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Approver ID</p>
                  <p className="font-medium">{application.assigned_approver_id}</p>
                </div>
              )}
              {application.due_date && (
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{formatDate(application.due_date)}</p>
                </div>
              )}
              {application.location_description && (
                <div>
                  <p className="text-sm text-muted-foreground">Detailed Location Description</p>
                  <p className="font-medium">{application.location_description}</p>
                </div>
              )}
                </CardContent>
              </Card>
              
          {/* Additional Notes */}
          {application.revision_notes && (
              <Card>
                <CardHeader>
                <CardTitle>📝 Revision Notes</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="font-medium">{application.revision_notes}</p>
                </CardContent>
              </Card>
          )}



          {/* Status Information */}
          <Card>
            <CardHeader>
              <CardTitle>Status Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <div className="mt-1">{getStatusBadge(application.status)}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SLA Status</p>
                <div className="mt-1">
                  <Badge variant={application.sla_status === 'on_time' ? 'default' : 'destructive'}>
                    {formatApplicationType(application.sla_status)}
                  </Badge>
            </div>
          </div>
              {application.submitted_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Submitted At</p>
                  <p className="font-medium">{formatDate(application.submitted_at)}</p>
                </div>
              )}
              {application.reviewed_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Reviewed At</p>
                  <p className="font-medium">{formatDate(application.reviewed_at)}</p>
                </div>
              )}
              {application.approved_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Approved At</p>
                  <p className="font-medium">{formatDate(application.approved_at)}</p>
                </div>
              )}
              {application.rejection_reason && (
                <div>
                  <p className="text-sm text-muted-foreground">Rejection Reason</p>
                  <p className="font-medium text-red-600">{application.rejection_reason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 