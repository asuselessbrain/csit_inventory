import path from "path";
import fs from "fs-extra";
import hbs from "handlebars";
import puppeteer from "puppeteer";

let browserInstance: any = null;

const getBrowser = async () => {
  if (browserInstance) return browserInstance;

  browserInstance = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  return browserInstance;
};

const getBase64FromUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("base64");
  } catch (error) {
    console.error("Error fetching logo:", error);
    return "";
  }
};

export const generatePdf = async (templateName: string, data: any) => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    const logoUrl =
      "https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png";
    const base64Logo = await getBase64FromUrl(logoUrl);
    const logoSrc = `data:image/png;base64,${base64Logo}`;

    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      templateName,
    );
    const content = await fs.readFile(templatePath, "utf-8");

    const template = hbs.compile(content);
    const html = template(data);

    await page.setContent(html, { waitUntil: "networkidle0" });

    const headerTemplate = `
            <div style="width: 100%; text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 0;">
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <img src="${logoSrc}" style="width: 50px; height: 50px; margin-bottom: 5px;" /> 
                    <div style="text-align: center;">
                        <h2 style="margin: 0; font-size: 16px; color: #003366; font-family: Helvetica, sans-serif; font-weight: bold;">Patuakhali Science and Technology University</h2>
                        <span style="font-size: 10px; color: #555; font-family: Helvetica, sans-serif;">Dumki, Patuakhali-8602, Bangladesh</span>
                    </div>
                </div>
            </div>
        `;

    const footerTemplate = `
            <div style="font-size: 8px; width: 100%; text-align: center; border-top: 1px solid #ddd; padding-top: 5px; color: #777; font-family: sans-serif;">
                Page <span class="pageNumber"></span> of <span class="totalPages"></span>
            </div>
        `;

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      margin: {
        top: "120px",
        bottom: "50px",
        left: "20px",
        right: "20px",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await page.close();
  }
};
