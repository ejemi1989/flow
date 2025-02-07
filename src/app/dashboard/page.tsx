"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WorkflowGrid from "@/components/workflows/WorkflowGrid";

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <DashboardHeader />
          
            <WorkflowGrid />
        </DashboardLayout>
    );
}

export default DashboardPage;