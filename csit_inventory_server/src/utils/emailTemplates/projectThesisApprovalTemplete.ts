export const projectThesisApprovalTemplate = (
  studentName: string,
  projectThesisTitle: string,
  note: string,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project/Thesis Approved</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 10px;">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #16a34a; padding: 20px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px;">
                🎉 Project / Thesis Approved
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 24px; color: #333333;">
              <p style="margin-top: 0; font-size: 16px;">
                Dear <strong>${studentName}</strong>,
              </p>

              <p style="font-size: 15px; line-height: 1.6;">
                We are pleased to inform you that your <strong>Project/Thesis</strong> has been
                <span style="color: #16a34a; font-weight: bold;">successfully approved</span>.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px;">
                    <p style="margin: 0; font-size: 14px;">
                      <strong>Feedback from Supervisor:</strong>
                    </p>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #374151;">
                      ${note}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.6;">
                You may now proceed to the next steps according to the academic guidelines.
                Please ensure that you follow all instructions carefully.
              </p>

              <p style="font-size: 14px;">
                If you have any questions, feel free to contact your supervisor or the department office.
              </p>

              <p style="margin-bottom: 0;">
                Best regards,<br />
                <strong>Academic Management System</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 14px; text-align: center; font-size: 12px; color: #6b7280;">
              © ${new Date().getFullYear()} Academic Management System. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
