import AnatomyDiagram from "@/component/DashboardAnatomy";
import CardsSection from "@/component/DashboardCard";

export default function DashboardLandingPage (){
    return(
        <>
            <div className="dashboard-main-page-container">
                <CardsSection/>
                <AnatomyDiagram/>
            </div>
        </>
    )
}