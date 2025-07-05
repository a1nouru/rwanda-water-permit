import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Permit = {
  id: string;
  title: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "expiring-soon";
  type: string;
  location: string;
  permitNumber: string;
  waterSource: string;
  purpose: string;
  waterAllowance: string;
  issuingAuthority: string;
  applicationDetails?: {
    applicantName: string;
    applicantType: string;
    contactEmail: string;
    contactPhone: string;
    landOwnership: string;
    environmentalAssessment: string;
  };
  conditions: string[];
  inspections: Array<{
    date: string;
    status: string;
    notes: string;
  }>;
};

export const generatePermitPDF = async (permit: Permit): Promise<void> => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // Add logos
  try {
    // Add Rwanda Water Board logo (left)
    const rwbLogoUrl = `${window.location.origin}/assets/rwanda_water_board_Logo.png`;
    const rwbImg = new Image();
    rwbImg.src = rwbLogoUrl;
    
    // Specify only the width and let height scale proportionally
    const rwbWidth = 30; // Reduced width for more square proportions
    
    // Add Ministry of Environment logo (right)
    const moeLogoUrl = `${window.location.origin}/assets/ministry_of_env_logo.png`;
    const moeImg = new Image();
    moeImg.src = moeLogoUrl;
    
    // Specify only the width and let height scale proportionally
    const moeWidth = 30; // Made both logos the same size
    
    // Load images with proper dimensions - both logos with 1:1 ratio
    doc.addImage(rwbLogoUrl, 'PNG', 15, 10, rwbWidth, rwbWidth); // Using 1:1 aspect ratio for both logos
    doc.addImage(moeLogoUrl, 'PNG', 155, 10, moeWidth, moeWidth); // Use 1:1 aspect ratio for circular emblem
  } catch (error) {
    console.error('Error loading logos:', error);
    // Fallback to text headers if images fail to load
    doc.setFontSize(12);
    doc.setTextColor(0, 75, 135); // Water-themed blue color
    doc.text('Rwanda Water Resources Board', 15, 20);
    doc.text('Ministry of Environment', 195, 20, { align: 'right' });
  }
  
  // Add blue line separator - moved down to avoid cutting off the ministry logo
  doc.setDrawColor(0, 100, 150);
  doc.setFillColor(0, 100, 150);
  doc.roundedRect(15, 50, 180, 2, 1, 1, 'F');
  
  // Add title and permit number - adjust position to accommodate the lower separator
  doc.setFontSize(18);
  doc.setTextColor(0, 75, 135); // Water-themed blue color
  doc.text('WATER PERMIT CERTIFICATE', 105, 65, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Permit Number: ${permit.permitNumber}`, 105, 75, { align: 'center' });
  
  // Add divider - adjust position 
  doc.setDrawColor(0, 100, 150);
  doc.setLineWidth(0.5);
  doc.line(15, 80, 195, 80);
  
  // Add permit information - adjust position
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('PERMIT INFORMATION', 15, 90);
  
  // Permit details
  const permitDetails = [
    ['Title', permit.title],
    ['Type', permit.type],
    ['Status', permit.status.charAt(0).toUpperCase() + permit.status.slice(1).replace('-', ' ')],
    ['Issue Date', formatDate(permit.issueDate)],
    ['Expiry Date', formatDate(permit.expiryDate)],
    ['Water Source', permit.waterSource],
    ['Purpose', permit.purpose],
    ['Water Allowance', permit.waterAllowance],
    ['Location', permit.location],
    ['Issuing Authority', permit.issuingAuthority],
  ];
  
  autoTable(doc, {
    startY: 95,
    head: [['Property', 'Value']],
    body: permitDetails,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 100, 150],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });
  
  // Add applicant information if available
  let currentY = (doc as any).lastAutoTable.finalY + 10;
  
  if (permit.applicationDetails) {
    doc.setFontSize(14);
    doc.text('APPLICANT INFORMATION', 15, currentY);
    currentY += 5;
    
    const applicantDetails = [
      ['Applicant Name', permit.applicationDetails.applicantName],
      ['Applicant Type', permit.applicationDetails.applicantType],
      ['Contact Email', permit.applicationDetails.contactEmail],
      ['Contact Phone', permit.applicationDetails.contactPhone],
      ['Land Ownership', permit.applicationDetails.landOwnership],
      ['Environmental Assessment', permit.applicationDetails.environmentalAssessment],
    ];
    
    autoTable(doc, {
      startY: currentY,
      head: [['Property', 'Value']],
      body: applicantDetails,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 100, 150],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });
    
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Add permit conditions
  if (permit.conditions && permit.conditions.length > 0) {
    doc.setFontSize(14);
    doc.text('PERMIT CONDITIONS', 15, currentY);
    currentY += 5;
    
    const conditionsBody = permit.conditions.map((condition, index) => {
      return [`${index + 1}.`, condition];
    });
    
    autoTable(doc, {
      startY: currentY,
      head: [['#', 'Condition']],
      body: conditionsBody,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 100, 150],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });
    
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Add inspection history if available
  if (permit.inspections && permit.inspections.length > 0) {
    // Check if we need a new page for inspections
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('INSPECTION HISTORY', 15, currentY);
    currentY += 5;
    
    const inspectionsBody = permit.inspections.map(inspection => {
      return [inspection.date, inspection.status, inspection.notes];
    });
    
    autoTable(doc, {
      startY: currentY,
      head: [['Date', 'Status', 'Notes']],
      body: inspectionsBody,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 100, 150],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });
    
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Add footer with legal information
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    
    // Add legal disclaimer
    const footer = "This document is an official water permit certificate issued by the Rwanda Water Resources Board. " +
                  "This permit is issued under the Water Law of Rwanda and is subject to the conditions specified herein. " +
                  "Unauthorized modification of this document is a criminal offense.";
    
    doc.text(footer, 15, 285, { maxWidth: 180 });
    
    // Add page numbers
    doc.text(`Page ${i} of ${pageCount}`, 195, 295, { align: 'right' });
    
    // Add date of printing
    const printDate = new Date().toLocaleDateString();
    doc.text(`Printed on: ${printDate}`, 15, 295);
  }
  
  // Add official signature box on the last page
  doc.setPage(pageCount);
  
  if (currentY > 240) {
    doc.addPage();
    currentY = 20;
  } else {
    currentY = Math.max(currentY, 220);
  }
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('OFFICIAL SIGNATURES', 105, currentY, { align: 'center' });
  currentY += 5;
  
  // Draw signature boxes
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.1);
  
  // Authority signature
  doc.rect(20, currentY, 70, 40);
  doc.setFontSize(10);
  doc.text('Issuing Authority', 55, currentY + 5, { align: 'center' });
  doc.text('Date and Signature', 55, currentY + 35, { align: 'center' });
  
  // Applicant signature
  doc.rect(120, currentY, 70, 40);
  doc.setFontSize(10);
  doc.text('Permit Holder', 155, currentY + 5, { align: 'center' });
  doc.text('Date and Signature', 155, currentY + 35, { align: 'center' });
  
  // Open the PDF in a new tab
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
}; 