"use client";
import BalanceMainSection from "@/component/BalanceMain";
import BasicInfoSectionView from "@/component/manageHealth/BasicInfo";
import HealthStatusView from "@/component/manageHealth/HealthStatus";
import MedicalHistoryView from "@/component/manageHealth/MedicalHistory";
import TreatmentInfoView from "@/component/manageHealth/TreatmentInfo";
export default function ViewHealthPage(){
   return(
    <>
    <div className="">
         <div className="">
           <BalanceMainSection />
           <div className="view-main-container">
            <BasicInfoSectionView/>
            <HealthStatusView/>
            <MedicalHistoryView/>
            <TreatmentInfoView/>
           </div>
           </div>
    </div>
</>
   )
}