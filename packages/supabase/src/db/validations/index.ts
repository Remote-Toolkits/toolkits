import { isValidPhoneNumber } from "libphonenumber-js";
// Generated by ts-to-zod
import { z } from "zod";
import type { Json } from "./../../types/database";

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
);

export const addressesRowSchema = z.object({
  address_1: z.string().min(3),
  address_2: z.string().nullable(),
  city: z.string().min(1),
  country: z.string().min(1),
  created_at: z.string(),
  id: z.string(),
  state: z.string().min(1),
  updated_at: z.string().nullable(),
  user_id: z.string().uuid(),
  zip_code: z.string().min(3),
});

export const addressesInsertSchema = z.object({
  address_1: z.string().min(3),
  address_2: z.string().optional().nullable(),
  city: z.string().min(1),
  country: z.string().min(1),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  state: z.string().min(1),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid(),
  zip_code: z.string().min(3),
});

export const addressesUpdateSchema = z.object({
  address_1: z.string().min(3).optional(),
  address_2: z.string().optional().nullable(),
  city: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  state: z.string().min(1).optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid().optional(),
  zip_code: z.string().min(3).optional(),
});

export const addressesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("addresses_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const departmentRowSchema = z.object({
  created_at: z.string(),
  description: z.string().min(1),
  id: z.string().uuid(),
  manager_id: z.string().nullable(),
  name: z.string().min(1),
  organization_id: z.string().uuid(),
  updated_at: z.string().nullable(),
});

export const departmentInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  description: z.string().min(1),
  id: z.string().uuid().optional(),
  manager_id: z.string().optional().nullable(),
  name: z.string().min(1),
  organization_id: z.string().uuid(),
  updated_at: z.string().optional().nullable(),
});

export const departmentUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  description: z.string().optional(),
  id: z.string().uuid().optional(),
  manager_id: z.string().optional().nullable(),
  name: z.string().optional(),
  organization_id: z.string().uuid().optional(),
  updated_at: z.string().optional().nullable(),
});

export const departmentRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("department_manager_id_user_id_fk"),
    columns: z.tuple([z.literal("manager_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("department_organization_id_organization_id_fk"),
    columns: z.tuple([z.literal("organization_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("organization"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const departmentMemberRowSchema = z.object({
  department_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const departmentMemberInsertSchema = z.object({
  department_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const departmentMemberUpdateSchema = z.object({
  department_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
});

export const departmentMemberRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal(
      "department_member_department_id_department_id_fk",
    ),
    columns: z.tuple([z.literal("department_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("department"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("department_member_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const emergencyContactsRowSchema = z.object({
  contact_email: z.string().email(),
  contact_name: z.string().min(2),
  contact_number: z.string().refine(isValidPhoneNumber),
  contact_relation: z.string().min(1),
  created_at: z.string(),
  id: z.string().uuid(),
  updated_at: z.string(),
  user_id: z.string().uuid(),
});

export const emergencyContactsInsertSchema = z.object({
  contact_email: z.string().email(),
  contact_name: z.string().min(2),
  contact_number: z.string().refine(isValidPhoneNumber),
  contact_relation: z.string().min(1),
  created_at: z.string().optional().nullable(),
  id: z.string().uuid().optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid(),
});

export const emergencyContactsUpdateSchema = z.object({
  contact_email: z.string().email().optional(),
  contact_name: z.string().min(2).optional(),
  contact_number: z.string().refine(isValidPhoneNumber).optional(),
  contact_relation: z.string().min(1).optional(),
  created_at: z.string().optional().nullable(),
  id: z.string().uuid().optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid().optional(),
});

export const emergencyContactsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("emergency_contacts_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const notesRowSchema = z.object({
  content: jsonSchema,
  createdAt: z.string(),
  id: z.string().uuid(),
  title: z.string().min(1),
  updatedAt: z.string(),
  user_id: z.string().uuid(),
});

export const notesInsertSchema = z.object({
  content: jsonSchema,
  createdAt: z.string().optional().nullable(),
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  updatedAt: z.string().optional().nullable(),
  user_id: z.string().uuid(),
});

export const notesUpdateSchema = z.object({
  content: jsonSchema.optional(),
  createdAt: z.string().optional().nullable(),
  id: z.string().uuid().optional(),
  title: z.string().min(1).optional(),
  updatedAt: z.string().optional().nullable(),
  user_id: z.string().uuid().optional(),
});

export const notesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("notes_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const organizationRowSchema = z.object({
  address_1: z.string().min(3),
  address_2: z.string().nullable(),
  city: z.string().min(1),
  contact_email: z.string().email(),
  contact_name: z.string().min(2),
  contact_number: z.string().refine(isValidPhoneNumber),
  country: z.string().min(1),
  created_at: z.string(),
  id: z.string().uuid(),
  logo_url: z.string().nullable(),
  name: z.string().min(1),
  payroll_pattern: z.string().min(1),
  payroll_start_day: z.number(),
  state: z.string().min(1),
  time_zone: z.string().min(1),
  type: z.string().min(1),
  updated_at: z.string(),
  website: z.string().nullable(),
  zip_code: z.string().min(3),
});

export const organizationInsertSchema = z.object({
  address_1: z.string().min(3),
  address_2: z.string().optional().nullable(),
  city: z.string().min(1),
  contact_email: z.string().email(),
  contact_name: z.string().min(2),
  contact_number: z.string().refine(isValidPhoneNumber),
  country: z.string().min(1),
  created_at: z.string().optional().nullable(),
  id: z.string().uuid().optional(),
  logo_url: z.string().optional().nullable(),
  name: z.string().min(1),
  payroll_pattern: z.string().min(1),
  payroll_start_day: z.number(),
  state: z.string().min(1),
  time_zone: z.string().min(1),
  type: z.string().min(1),
  updated_at: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  zip_code: z.string().min(3),
});

export const organizationUpdateSchema = z.object({
  address_1: z.string().optional(),
  address_2: z.string().optional().nullable(),
  city: z.string().optional(),
  contact_email: z.string().optional(),
  contact_name: z.string().optional(),
  contact_number: z.string().optional(),
  country: z.string().optional(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  logo_url: z.string().optional().nullable(),
  name: z.string().optional(),
  payroll_pattern: z.string().optional(),
  payroll_start_day: z.number().optional(),
  state: z.string().optional(),
  time_zone: z.string().optional(),
  type: z.string().optional(),
  updated_at: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  zip_code: z.string().optional(),
});

export const organizationRelationshipsSchema = z.tuple([]);

export const organizationMembersRowSchema = z.object({
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const organizationMembersInsertSchema = z.object({
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const organizationMembersUpdateSchema = z.object({
  organization_id: z.string().optional(),
  user_id: z.string().optional(),
});

export const organizationMembersRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal(
      "organization_members_organization_id_organization_id_fk",
    ),
    columns: z.tuple([z.literal("organization_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("organization"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("organization_members_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const organizationOwnersRowSchema = z.object({
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const organizationOwnersInsertSchema = z.object({
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export const organizationOwnersUpdateSchema = z.object({
  organization_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
});

export const organizationOwnersRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal(
      "organization_owners_organization_id_organization_id_fk",
    ),
    columns: z.tuple([z.literal("organization_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("organization"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("organization_owners_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const timeSheetRowSchema = z.object({
  clock_in: z.string().min(1),
  clock_out: z.string().nullable(),
  created_at: z.string(),
  date: z.string(),
  id: z.string().uuid(),
  notes: z.string().nullable(),
  status: z.string().min(1),
  total_worked_minutes: z.number().nullable(),
  updated_at: z.string(),
  user_id: z.string().uuid(),
});

export const timeSheetInsertSchema = z.object({
  clock_in: z.string().min(1),
  clock_out: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  date: z.string(),
  id: z.string().uuid().optional(),
  notes: z.string().optional().nullable(),
  status: z.string().min(1).optional(),
  total_worked_minutes: z.number().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid(),
});

export const timeSheetUpdateSchema = z.object({
  clock_in: z.string().optional(),
  clock_out: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  date: z.string().optional(),
  id: z.string().uuid().optional(),
  notes: z.string().optional().nullable(),
  status: z.string().optional(),
  total_worked_minutes: z.number().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid().optional(),
});

export const timeSheetRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("time_sheet_user_id_user_id_fk"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const timeSheetBreakRowSchema = z.object({
  break_end: z.string().nullable(),
  break_start: z.string().min(1),
  id: z.string().uuid(),
  time_sheet_id: z.string().uuid(),
});

export const timeSheetBreakInsertSchema = z.object({
  break_end: z.string().optional().nullable(),
  break_start: z.string().min(1),
  id: z.string().uuid().optional(),
  time_sheet_id: z.string().uuid(),
});

export const timeSheetBreakUpdateSchema = z.object({
  break_end: z.string().optional().nullable(),
  break_start: z.string().optional(),
  id: z.string().uuid().optional(),
  time_sheet_id: z.string().uuid().optional(),
});

export const timeSheetBreakRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal(
      "time_sheet_break_time_sheet_id_time_sheet_id_fk",
    ),
    columns: z.tuple([z.literal("time_sheet_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("time_sheet"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const userRowSchema = z.object({
  avatar_url: z.string().nullable(),
  created_at: z.string(),
  date_of_birth: z.string(),
  email: z.string().email(),
  employment_status: z.string(),
  employment_type: z.string(),
  first_name: z.string(),
  gender: z.string(),
  hire_date: z.string(),
  id: z.string().uuid(),
  job_title: z.string(),
  last_name: z.string(),
  leave_date: z.string().optional().nullable(),
  phone_number: z.string().refine(isValidPhoneNumber).optional().nullable(),
  role: z.string().optional().nullable(),
  salary_per_hour: z.number().optional().nullable(),
  updated_at: z.string(),
  work_hours_per_week: z.number().optional().nullable(),
  working_days_per_week: z.array(z.string()).optional().nullable(),
});

export const userInsertSchema = z.object({
  avatar_url: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  email: z.string().email(),
  employment_status: z.string().min(1),
  employment_type: z.string().min(1),
  first_name: z.string().min(3),
  gender: z.string().min(1),
  hire_date: z.string(),
  id: z.string().uuid(),
  job_title: z.string().min(2),
  last_name: z.string().min(2),
  leave_date: z.string().optional().nullable(),
  phone_number: z.string().refine(isValidPhoneNumber),
  role: z.string().min(1),
  salary_per_hour: z.number().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  work_hours_per_week: z.number().min(1),
  working_days_per_week: z.array(z.string()),
});

export const userUpdateSchema = z.object({
  avatar_url: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  email: z.string().optional(),
  employment_status: z.string().optional().nullable(),
  employment_type: z.string().optional().nullable(),
  first_name: z.string().optional(),
  gender: z.string().optional().nullable(),
  hire_date: z.string().optional().nullable(),
  id: z.string().optional(),
  job_title: z.string().optional().nullable(),
  last_name: z.string().optional(),
  leave_date: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  salary_per_hour: z.number().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  work_hours_per_week: z.number().optional().nullable(),
  working_days_per_week: z.array(z.string()).optional().nullable(),
});

export const userRelationshipsSchema = z.tuple([]);

export const employmentStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("terminated"),
]);

export const employmentTypeSchema = z.union([
  z.literal("full_time"),
  z.literal("part_time"),
  z.literal("contract"),
  z.literal("internship"),
]);

export const organizationTypeSchema = z.union([
  z.literal("for-profit"),
  z.literal("non-profit"),
  z.literal("government"),
]);

export const payrollPatternSchema = z.union([
  z.literal("weekly"),
  z.literal("bi-weekly"),
  z.literal("monthly"),
]);

export const timeSheetStatusSchema = z.union([
  z.literal("pending"),
  z.literal("approved"),
  z.literal("rejected"),
  z.literal("clocked_in"),
  z.literal("clocked_out"),
]);

export const userRolesSchema = z.union([
  z.literal("admin"),
  z.literal("manager"),
  z.literal("staff"),
  z.literal("team_lead"),
]);

export const employeeInsertSchema = userInsertSchema
  .merge(addressesInsertSchema)
  .merge(emergencyContactsInsertSchema)
  .merge(departmentMemberInsertSchema)
  .merge(organizationMembersInsertSchema);
