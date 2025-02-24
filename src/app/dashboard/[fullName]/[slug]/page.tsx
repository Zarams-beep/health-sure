// /pages/[fullName]/[...slug].tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

const CatchAll = () => {
    const router = useRouter();
    const { fullName } = router.query;

    useEffect(() => {
        router.replace(`/${fullName}/page-not-found`);
    }, [router, fullName]);

    return null;
};

export default CatchAll;
