import React from "react";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Header from "../Header/Header";

export default function HomePage() {
    return <React.Fragment>
        <Header />
        <Content />
        <Footer />
    </React.Fragment>
}