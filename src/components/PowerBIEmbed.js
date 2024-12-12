// components/PowerBIEmbed.js
import React, { useEffect, useRef } from "react";
import { models } from "powerbi-client";

const PowerBIEmbed = ({ embedUrl, accessToken, reportId }) => {
  const embedContainer = useRef(null);

  useEffect(() => {
    if (!embedContainer.current || !embedUrl || !accessToken) return;

    const powerbi = require("powerbi-client");

    // Power BI embedding configuration
    const config = {
      type: "report", // Embed type: 'report', 'dashboard', or 'tile'
      id: reportId,
      embedUrl: embedUrl,
      accessToken: accessToken,
      tokenType: models.TokenType.Aad,
      permissions: models.Permissions.All, // Permissions for user interaction
    };

    // Embed the Power BI report
    const powerbiService = new powerbi.service.Service(powerbi.factories.hpmFactory, powerbi.factories.wpmpFactory);
    powerbiService.embed(embedContainer.current, config);
  }, [embedUrl, accessToken, reportId]);

  return <div ref={embedContainer} style={{ height: "600px", width: "100%" }} />;
};

export default PowerBIEmbed;
