import QRCode from "qrcode";

/**
 * Generate a data URL for a given string (e.g. verification URL)
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 250,
      margin: 1,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    });
  } catch (err) {
    console.error("Error generating QR code:", err);
    return "";
  }
}

/**
 * Generate SVG string for QR code
 */
export async function generateQrSvg(text: string): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: "svg",
      width: 200,
      margin: 1,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    });
  } catch (err) {
    console.error("Error generating QR SVG:", err);
    return "";
  }
}
