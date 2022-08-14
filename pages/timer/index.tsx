import { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async (context) => {

    return {};
};

default export const TimerPage: NextPage = (props) => {

    return<>
        <Timer />
    </>
}