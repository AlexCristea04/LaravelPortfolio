import React, {useEffect, useState} from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import '../../Languages/i18n.js';
import { useTranslation } from 'react-i18next';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
).toString();

const Resume = () => {
    const [width, setWidth] = useState(1200);
    const { t } = useTranslation('resume');

    const getLanguageFromCookie = () => {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith("language="))
            ?.split("=")[1] || "en"; // Default to English if not set
    };

    const [language, setLanguage] = useState(getLanguageFromCookie());

    const pdfUrl = language === "fr" ? "/AlexCristeaCV_FR.pdf" : "/AlexCristeaCV.pdf";

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentLang = getLanguageFromCookie();
            if (currentLang !== language) {
                setLanguage(currentLang);
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [language]);

    return (
        <Container fluid className="resume-section text-center py-5">
            <h1 className="display-5 fw-bolder mb-0">
                <span className="text-gradient d-inline">{t("Resume")}</span>
            </h1>

            {/* Download Button */}
            <Row className="mb-4 mt-4 d-flex justify-content-center">
                <Button variant="primary" href={pdfUrl} target="_blank" download style={{maxWidth: "250px"}}>
                    <AiOutlineDownload/>
                    &nbsp;{t("Download")}
                </Button>
            </Row>

            {/* Display PDF using react-pdf */}
            <Row className="resume">
                <Document file={pdfUrl} className="d-flex justify-content-center">
                    <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6}/>
                </Document>
            </Row>

        </Container>
    );
};

export default Resume;
