"use server";

import { resend } from "@/lib/resend";
import { createServerClient } from "@/lib/supabase/server";
import { NewEmployeeEmail } from "@toolkit/email/new-employee";
import { cacheKeys } from "@toolkit/supabase/cache-keys";
import OrganizationMutations from "@toolkit/supabase/organization-mutations";
import {
  getDepartmentMembers,
  getManagers,
  getOrganizationMembers,
  getUserDepartment,
} from "@toolkit/supabase/queries";
import { UserRolesEnum } from "@toolkit/supabase/types";
import { employeeInsertSchema } from "@toolkit/supabase/validations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authActionClient } from "./safe-action";

export const createEmployeeAction = authActionClient
  .metadata({
    name: "create-employee",
    track: {
      event: "create-employee",
      channel: "employees",
    },
  })
  .schema(
    z.object({
      employee: employeeInsertSchema.omit({ id: true, avatar_url: true }),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const supabase = createServerClient({
      isAdmin: true,
    });

    const { employee } = parsedInput;
    const { data: auth, error: authError } =
      await supabase.auth.admin.createUser({
        email: employee.email,
        email_confirm: true,
        user_metadata: {
          organization_id: ctx.user.user_metadata.organization_id,
          role: employee.role,
        },
      });

    if (authError || !auth.user) {
      throw new Error(authError?.message ?? "Unknown error creating user auth");
    }

    const { data, error } = await OrganizationMutations.createEmployee(
      supabase,
      { ...employee, id: auth.user.id, avatar_url: "" },
      ctx.user.user_metadata.organization_id,
    );

    if (error || !data) {
      throw new Error(error?.message ?? "Unknown error creating employee");
    }
    revalidateTag(
      `${cacheKeys.organization.members}-${ctx.user.user_metadata.organization_id}`,
    );

    await resend.emails.send({
      from: "HR Toolkit Onboarding<onboarding@hrtoolkit.app>",
      to: data.email,
      subject: "Welcome to HR Toolkit",
      react: NewEmployeeEmail({
        name: `${data.first_name} ${data.last_name}`,
        // organizationName: ctx.user.user_metadata.organization_name,
      }),
    });
    return {
      user: auth.user,
    };
  });

export const getEmployeesAction = authActionClient
  .metadata({
    name: "get-employees",
  })
  .action(async ({ ctx }) => {
    const { user, supabase } = ctx;

    if (user.user_metadata.role === UserRolesEnum.admin) {
      const { data: employees, error: employeesError } =
        await getOrganizationMembers(
          supabase,
          user.user_metadata.organization_id,
        );

      if (employeesError) {
        throw new Error(employeesError.message);
      }

      return employees;
    }

    const { data, error: departmentError } = await getUserDepartment(
      supabase,
      user.id,
    );
    if (departmentError || !data.department) {
      throw new Error(departmentError?.message ?? "Error getting department");
    }

    const { data: employees, error: employeesError } =
      await getDepartmentMembers(supabase, data.department.id);
    if (employeesError) {
      throw new Error(employeesError.message);
    }

    return employees;
  });

export const getManagersAction = authActionClient
  .metadata({
    name: "get-managers",
    track: {
      event: "get-managers",
      channel: "employees",
    },
  })
  .action(async ({ ctx }) => {
    const { data, error } = await getManagers(
      ctx.supabase,
      ctx.user.user_metadata.organization_id,
    );

    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
