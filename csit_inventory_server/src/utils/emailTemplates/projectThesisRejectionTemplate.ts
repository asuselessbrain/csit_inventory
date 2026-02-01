export const projectThesisRejectionTemplate = (
  studentName: string,
  projectTitle: string,
  note: string,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project / Thesis Rejected</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 10px;">
        <table width="100%" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#dc2626; padding:20px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:22px;">
                ❌ Project / Thesis Rejected
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:24px; color:#374151;">
              <p style="font-size:16px; margin-top:0;">
                Dear <strong>${studentName}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6;">
                After careful review, your <strong>Project/Thesis</strong> titled
                <strong>“${projectTitle}”</strong> has been
                <span style="color:#dc2626; font-weight:bold;">rejected</span>.
              </p>

              <!-- Feedback -->
              <table width="100%" style="margin:20px 0;">
                <tr>
                  <td style="background:#fef2f2; border-left:4px solid #dc2626; padding:14px;">
                    <p style="margin:0; font-size:14px;">
                      <strong>Reviewer Feedback:</strong>
                    </p>
                    <p style="margin:8px 0 0; font-size:14px; color:#4b5563;">
                      ${note || "No additional feedback was provided."}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; line-height:1.6;">
                You are encouraged to carefully review the feedback and make the necessary improvements
                before submitting a revised proposal in the future.
              </p>

              <p style="font-size:14px;">
                If you need clarification, please contact your supervisor or department coordinator.
              </p>

              <p style="margin-bottom:0;">
                Best wishes,<br />
                <strong>Academic Management System</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:14px; text-align:center; font-size:12px; color:#6b7280;">
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
