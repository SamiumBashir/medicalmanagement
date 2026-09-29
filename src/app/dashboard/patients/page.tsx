import * as React from "react";
import { dataStore } from "@/lib/services/dataStore";
import { PatientsManagementClient } from "./patients-client";

export default function PatientsManagementPage() {
  return <PatientsManagementClient initialPatients={dataStore.patients} />;
}
