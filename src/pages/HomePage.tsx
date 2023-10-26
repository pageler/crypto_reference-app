import { CoinsTable } from "../components/CoinsTable";
import { Banner } from "../components/banner/Banner";

type HomePageProps = {};

export const HomePage = (props: HomePageProps) => {
    return (
        <>
            <Banner />
            <CoinsTable />
        </>
    );
};
