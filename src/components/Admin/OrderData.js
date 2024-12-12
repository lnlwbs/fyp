import React, { useEffect, useState } from "react";
import PowerBIEmbed from "../PowerBIEmbed";

const OrderPage = () => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [reportId, setReportId] = useState("");

  useEffect(() => {
    const fetchEmbedToken = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/powerbi/token"); // Endpoint to get the embed token
        const data = await response.json();

        setEmbedUrl(data.embedUrl);
        setAccessToken(data.accessToken);
        setReportId(data.reportId);
      } catch (error) {
        console.error("Error fetching embed token:", error);
      }
    };

    fetchEmbedToken();
  }, []);

  return (
    <div>
      <h1>Order Data Visualization</h1>
      {accessToken && embedUrl && reportId ? (
        <PowerBIEmbed embedUrl={embedUrl} accessToken={accessToken} reportId={reportId} />
      ) : (
        <p>Loading Power BI report...</p>
      )}
    </div>
  );
};

export default OrderPage;
