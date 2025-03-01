import juice from 'juice'

export const Mailtemplate=(resetUrl)=>{
const html=
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Lazy Thoughts</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0fdf4; font-family: Arial, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; width: 100%; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); text-align: center; margin: 20px auto; border-collapse: collapse;">
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #66bb6a, #43a047); padding: 20px; border-radius: 16px 16px 0 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                Lazy Thoughts
            </td>
        </tr>
        <!-- Body -->
        <tr>
            <td style="padding: 20px; color: #333; font-size: 16px; line-height: 1.6;">
                <h2 style="font-size: 22px; font-weight: bold; margin: 0 0 16px; color: #1e293b;">Reset Your Password</h2>
                <p style="margin: 0 0 16px;">We received a request to reset your password. Click the button below to set a new one. If you didn’t request this, you can ignore this email.</p>
                <a href="${resetUrl}" style="display: inline-block; background: #43a047; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold; transition: background 0.3s ease;">Reset Password</a>
                <p style="margin: 16px 0 0;"><strong>Note:</strong> This link is valid for only 10 minutes.</p>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td style="font-size: 12px; color: #555; margin-top: 20px; padding: 16px; background: #f1f8f5; border-radius: 0 0 16px 16px;">
                <p style="margin: 0;">Need help? <a href="mailto:support@lazythoughts.com" style="color: #43a047; text-decoration: none;">Contact us</a></p>
            </td>
        </tr>
    </table>
</body>
</html>

`
const inlinedHtml = juice(html);
return inlinedHtml;
}  