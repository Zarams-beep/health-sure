"use client";
import { useRouter } from "next/navigation";
function PageNotFound (){
    const router = useRouter();

    return(
        <>
            <div className='page-not-found-container'>
                <div className="page-not-found-2">

                {/* section 1 */}
                <section className="">
                    <h1 className=''>oooops!</h1>
                    <h3 className=''>404 - PAGE IN PROGRESS </h3>
                    <p className="">The page you are looking for is temporarily unavailable </p>
                    <div className="btn-div">
                    <button onClick={()=>{
                        // Todo Later
                            if (document.referrer) {
                                router.back();
                            } else {
                                router.push("/"); 
                            }
                        
                    }} className="" >Back</button>
                    </div>
                </section>
</div>
            </div>
        </>
    )
}

export default PageNotFound