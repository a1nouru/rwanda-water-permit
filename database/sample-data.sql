-- Sample data for Rwanda Water Permit System
-- Run this in Supabase SQL Editor to populate test data

-- =============================================
-- SAMPLE USERS
-- =============================================

-- Individual applicant
INSERT INTO users (
  id,
  email,
  phone,
  role,
  status,
  account_type,
  first_name,
  last_name,
  date_of_birth,
  id_number,
  id_type,
  province,
  district,
  sector,
  cell,
  village,
  address,
  applications_count,
  reviews_count,
  inspections_count,
  profile_completed
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'jane.doe@example.com',
  '+250789123456',
  'applicant',
  'active',
  'individual',
  'Jane',
  'Doe',
  '1985-03-15',
  '1198508012345689',
  'national_id',
  'Kigali',
  'Gasabo',
  'Kacyiru',
  'Kamatamu',
  'Nyarutarama',
  'KN 5 Ave, Kigali, Rwanda',
  0,
  0,
  0,
  true
);

-- Company applicant
INSERT INTO users (
  id,
  email,
  phone,
  role,
  status,
  account_type,
  company_name,
  company_tin,
  company_address,
  company_phone,
  province,
  district,
  sector,
  cell,
  address,
  applications_count,
  reviews_count,
  inspections_count,
  profile_completed
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  'admin@ecotech.rw',
  '+250788654321',
  'applicant',
  'active',
  'company',
  'EcoTech Solutions Ltd',
  '101234567',
  'KG 15 Ave, Kigali Industrial Park',
  '+250788654321',
  'Kigali',
  'Kicukiro',
  'Niboye',
  'Gahanga',
  'KG 15 Ave, Kigali Industrial Park',
  0,
  0,
  0,
  true
);

-- Administrative users
INSERT INTO users (
  id,
  email,
  phone,
  role,
  status,
  account_type,
  first_name,
  last_name,
  province,
  district,
  applications_count,
  reviews_count,
  inspections_count,
  profile_completed
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440003',
  'sarah.johnson@rwb.gov.rw',
  '+250783456789',
  'reviewer',
  'active',
  'individual',
  'Sarah',
  'Johnson',
  'Kigali',
  'Nyarugenge',
  0,
  0,
  0,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'michael.brown@rwb.gov.rw',
  '+250784567890',
  'inspector',
  'active',
  'individual',
  'Michael',
  'Brown',
  'Kigali',
  'Gasabo',
  0,
  0,
  0,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'admin@rwb.gov.rw',
  '+250785678901',
  'admin',
  'active',
  'individual',
  'Alice',
  'Wilson',
  'Kigali',
  'Nyarugenge',
  0,
  0,
  0,
  true
);

-- =============================================
-- SAMPLE APPLICATIONS
-- =============================================

-- Domestic water use application (approved)
INSERT INTO applications (
  id,
  applicant_id,
  application_number,
  status,
  application_type,
  water_source,
  water_purpose,
  estimated_usage_volume,
  usage_unit,
  province,
  district,
  sector,
  cell,
  village,
  location_description,
  project_title,
  project_description,
  water_taking_method,
  water_measuring_method,
  environmental_assessment,
  mitigation_actions,
  sla_status,
  assigned_reviewer_id,
  assigned_inspector_id,
  created_at,
  updated_at
) VALUES (
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  'RWB-2024-00001',
  'approved',
  'domestic',
  'borehole',
  'domestic',
  50,
  'm3_per_day',
  'Kigali',
  'Gasabo',
  'Kacyiru',
  'Kamatamu',
  'Nyarutarama',
  'Gasabo, Kacyiru, Kamatamu',
  'Residential Water Supply Borehole',
  'Installation of a borehole for domestic water supply to serve a family of 6 people in Nyarutarama',
  'Electric submersible pump',
  'Digital water meter',
  'Minimal environmental impact expected. Proper waste management during drilling.',
  'Use biodegradable drilling fluids, proper waste disposal, restore site after completion',
  'on_time',
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
  '2024-01-15 08:30:00',
  '2024-01-25 14:20:00'
);

-- Industrial water use application (under review)
INSERT INTO applications (
  id,
  applicant_id,
  application_number,
  status,
  application_type,
  water_source,
  water_purpose,
  estimated_usage_volume,
  usage_unit,
  province,
  district,
  sector,
  cell,
  location_description,
  project_title,
  project_description,
  water_taking_method,
  water_measuring_method,
  environmental_assessment,
  mitigation_actions,
  sla_status,
  assigned_reviewer_id,
  created_at,
  updated_at
) VALUES (
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  'RWB-2024-00002',
  'under_review',
  'industrial',
  'river',
  'industrial',
  500,
  'm3_per_day',
  'Kigali',
  'Kicukiro',
  'Niboye',
  'Gahanga',
  'Kicukiro, Niboye, Gahanga',
  'Manufacturing Plant Water Supply',
  'Water supply for textile manufacturing operations including dyeing and washing processes',
  'River intake with filtration system',
  'Automated flow measurement system',
  'Potential impact on downstream water quality. Wastewater treatment required.',
  'Install wastewater treatment plant, monitor discharge quality, implement water recycling',
  'on_time',
  '550e8400-e29b-41d4-a716-446655440003',
  '2024-01-20 10:15:00',
  '2024-01-20 10:15:00'
);

-- Agricultural application (draft)
INSERT INTO applications (
  id,
  applicant_id,
  application_number,
  status,
  application_type,
  water_source,
  water_purpose,
  estimated_usage_volume,
  usage_unit,
  province,
  district,
  sector,
  cell,
  location_description,
  project_title,
  project_description,
  sla_status,
  created_at,
  updated_at
) VALUES (
  '660e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440001',
  'RWB-2024-00003',
  'draft',
  'agricultural',
  'groundwater',
  'irrigation',
  200,
  'm3_per_day',
  'Eastern',
  'Nyagatare',
  'Karangazi',
  'Nyagahanga',
  'Nyagatare, Karangazi, Nyagahanga',
  'Irrigation System for Rice Farming',
  'Installation of irrigation system for 10 hectares of rice cultivation',
  'on_time',
  '2024-01-22 16:45:00',
  '2024-01-22 16:45:00'
);

-- =============================================
-- SAMPLE PERMITS
-- =============================================

-- Permit for approved domestic application
INSERT INTO permits (
  id,
  application_id,
  permit_number,
  status,
  water_source,
  purpose,
  water_allowance,
  allowance_unit,
  issuing_authority,
  issued_date,
  expiry_date,
  is_renewal,
  is_transfer,
  monitoring_frequency,
  reporting_requirements,
  created_at,
  updated_at
) VALUES (
  '770e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  'WP-2024-00001',
  'active',
  'borehole',
  'domestic',
  50,
  'm3_per_day',
  'Rwanda Water Board',
  '2024-01-25',
  '2027-01-25',
  false,
  false,
  'annual',
  'Annual water usage report required by January 31st',
  '2024-01-25 15:30:00',
  '2024-01-25 15:30:00'
);

-- =============================================
-- SAMPLE DOCUMENTS
-- =============================================

-- Documents for domestic application
INSERT INTO documents (
  id,
  application_id,
  name,
  type,
  verification_status,
  is_required,
  uploaded_by,
  upload_date,
  created_at,
  updated_at
) VALUES 
(
  '880e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  'Payment Receipt - Bank of Kigali',
  'payment_proof',
  'verified',
  true,
  '550e8400-e29b-41d4-a716-446655440001',
  '2024-01-15 09:00:00',
  '2024-01-15 09:00:00',
  '2024-01-16 10:30:00'
),
(
  '880e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440001',
  'National ID Copy - Jane Doe',
  'identification_doc',
  'verified',
  true,
  '550e8400-e29b-41d4-a716-446655440001',
  '2024-01-15 09:05:00',
  '2024-01-15 09:05:00',
  '2024-01-16 10:32:00'
),
(
  '880e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440001',
  'Land Ownership Certificate',
  'land_ownership_doc',
  'verified',
  true,
  '550e8400-e29b-41d4-a716-446655440001',
  '2024-01-15 09:10:00',
  '2024-01-15 09:10:00',
  '2024-01-16 10:35:00'
);

-- =============================================
-- SAMPLE REVIEWS
-- =============================================

INSERT INTO reviews (
  id,
  application_id,
  reviewer_id,
  review_stage,
  status,
  risk_assessment,
  recommendation,
  technical_review,
  compliance_review,
  overall_comments,
  assigned_at,
  completed_at,
  quality_score,
  processing_time_hours,
  created_at,
  updated_at
) VALUES (
  '990e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440003',
  'technical_review',
  'completed',
  'low',
  'approve',
  'Technical specifications meet standards. Borehole depth and pump capacity appropriate for intended use.',
  'All regulatory requirements met. Environmental impact minimal.',
  'Application meets all criteria for approval. Recommend proceeding to inspection phase.',
  '2024-01-16 08:00:00',
  '2024-01-18 16:30:00',
  9.5,
  56,
  '2024-01-16 08:00:00',
  '2024-01-18 16:30:00'
);

-- =============================================
-- SAMPLE INSPECTIONS
-- =============================================

INSERT INTO inspections (
  id,
  application_id,
  inspector_id,
  inspection_number,
  type,
  status,
  result,
  scheduled_date,
  completed_date,
  location_verified,
  coordinates_verified,
  site_plan_compliance,
  location_notes,
  water_source_verified,
  extraction_method_verified,
  infrastructure_condition,
  technical_compliance,
  technical_notes,
  environmental_impact_assessed,
  mitigation_measures_implemented,
  environmental_compliance,
  environmental_notes,
  permit_conditions_met,
  volume_limits_respected,
  reporting_up_to_date,
  fees_paid,
  regulatory_compliance,
  regulatory_notes,
  photos_taken,
  samples_collected,
  overall_score,
  recommendations,
  follow_up_required,
  created_at,
  updated_at
) VALUES (
  'aa0e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440004',
  'INS-2024-00001',
  'initial',
  'completed',
  'passed',
  '2024-01-20 09:00:00',
  '2024-01-20 14:30:00',
  true,
  true,
  true,
  'Site location matches application. Access roads adequate.',
  true,
  true,
  'Good condition, proper installation',
  true,
  'Pump and piping system installed according to specifications.',
  true,
  true,
  true,
  'No negative environmental impact observed. Site properly restored.',
  true,
  true,
  true,
  true,
  true,
  'All regulatory requirements satisfied.',
  12,
  2,
  8.8,
  'Site meets all requirements. Recommend permit approval.',
  false,
  '2024-01-20 09:00:00',
  '2024-01-20 14:30:00'
);

-- =============================================
-- SAMPLE WORKFLOW HISTORY
-- =============================================

INSERT INTO workflow_history (
  id,
  application_id,
  user_id,
  from_status,
  to_status,
  action,
  comment,
  created_at
) VALUES 
(
  'bb0e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  null,
  'draft',
  'created',
  'Application created by applicant',
  '2024-01-15 08:30:00'
),
(
  'bb0e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  'draft',
  'submitted',
  'submitted',
  'Application submitted for review',
  '2024-01-15 14:20:00'
),
(
  'bb0e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440003',
  'submitted',
  'under_review',
  'assigned_for_review',
  'Application assigned to technical reviewer',
  '2024-01-16 08:00:00'
),
(
  'bb0e8400-e29b-41d4-a716-446655440004',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440004',
  'under_review',
  'pending_inspection',
  'review_completed',
  'Technical review completed successfully',
  '2024-01-18 16:30:00'
),
(
  'bb0e8400-e29b-41d4-a716-446655440005',
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440005',
  'pending_inspection',
  'approved',
  'approved',
  'Application approved after successful inspection',
  '2024-01-25 14:20:00'
);

-- =============================================
-- UPDATE USER COUNTERS
-- =============================================

-- Update application counts for users
UPDATE users SET applications_count = 2 WHERE id = '550e8400-e29b-41d4-a716-446655440001';
UPDATE users SET applications_count = 1 WHERE id = '550e8400-e29b-41d4-a716-446655440002';
UPDATE users SET reviews_count = 1 WHERE id = '550e8400-e29b-41d4-a716-446655440003';
UPDATE users SET inspections_count = 1 WHERE id = '550e8400-e29b-41d4-a716-446655440004';

COMMIT; 