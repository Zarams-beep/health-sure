"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const CatchAll = () => {
    const router = useRouter();
    const { fullName } = useParams(); 

    useEffect(() => {
        if (fullName) {
            router.replace(`/${fullName}/page-not-found`);
        }
    }, [router, fullName]);

    return null;
};

export default CatchAll;
