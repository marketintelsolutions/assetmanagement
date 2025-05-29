// EmailTemplateGenerator.js
export const EmailTemplateGenerator = {
    createTemplate: ({
        title,
        subtitle,
        recipientName,
        greeting,
        sections,
        importantNotes,
        isUserCopy = false,
        brandColor = '#1e40af',
        brandName = 'PACAM',
        contactInfo = {
            email: 'info@pacam.com',
            phone: '+234-XXX-XXXX',
            website: 'www.pacam.com'
        }
    }) => {
        const currentDate = new Date().toLocaleString();
        const referenceId = `${brandName.toUpperCase()}-${Date.now()}`;

        return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8fafc;
          }
          .container {
              max-width: 800px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background: linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 100%);
              color: white;
              padding: 30px;
              text-align: center;
          }
          .logo {
              background-color: rgba(255, 255, 255, 0.2);
              border-radius: 10px;
              padding: 15px 25px;
              margin-bottom: 20px;
              display: inline-block;
          }
          .logo h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
          }
          .title {
              font-size: 28px;
              margin: 0;
              font-weight: 300;
          }
          .subtitle {
              margin: 10px 0 0 0;
              opacity: 0.9;
              font-size: 16px;
          }
          .content {
              padding: 30px;
          }
          .greeting {
              font-size: 18px;
              margin-bottom: 25px;
              color: ${brandColor};
          }
          .section {
              margin-bottom: 30px;
              background-color: #f8fafc;
              border-radius: 8px;
              padding: 20px;
              border-left: 4px solid ${brandColor}66;
          }
          .section-title {
              font-size: 18px;
              font-weight: bold;
              color: ${brandColor};
              margin-bottom: 15px;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 5px;
          }
          .info-grid {
              display: grid;
              grid-template-columns: 1fr 2fr;
              gap: 10px;
              margin-bottom: 10px;
          }
          .info-label {
              font-weight: 600;
              color: #374151;
          }
          .info-value {
              color: #1f2937;
          }
          .important-notes {
              background-color: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
          }
          .important-notes h3 {
              color: #92400e;
              margin-top: 0;
              margin-bottom: 15px;
          }
          .important-notes ul {
              margin: 0;
              padding-left: 20px;
          }
          .important-notes li {
              margin-bottom: 8px;
              color: #92400e;
          }
          .submission-info {
              background-color: #ecfdf5;
              border: 1px solid #10b981;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
              margin: 25px 0;
          }
          .footer {
              background-color: #1f2937;
              color: white;
              padding: 25px;
              text-align: center;
          }
          .footer-content {
              margin-bottom: 15px;
          }
          .copyright {
              font-size: 12px;
              opacity: 0.8;
              border-top: 1px solid #374151;
              padding-top: 15px;
              margin-top: 15px;
          }
          .contact-info {
              font-size: 14px;
              margin-bottom: 10px;
          }
          @media (max-width: 600px) {
              .info-grid {
                  grid-template-columns: 1fr;
              }
              .content {
                  padding: 20px;
              }
              .header {
                  padding: 20px;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">
                  <h1>${brandName}</h1>
              </div>
              <h2 class="title">${title}</h2>
              <p class="subtitle">${subtitle}</p>
          </div>
  
          <div class="content">
              ${greeting ? `<div class="greeting">${greeting}</div>` : ''}
  
              ${sections.map(section => `
                  <div class="section">
                      <h3 class="section-title">${section.title}</h3>
                      ${section.content}
                  </div>
              `).join('')}
  
              ${importantNotes ? `
                  <div class="important-notes">
                      <h3>Important Notes</h3>
                      ${importantNotes}
                  </div>
              ` : ''}
  
              <div class="submission-info">
                  <strong>Submission Details:</strong><br>
                  Submitted on: ${currentDate}<br>
                  Reference: ${referenceId}
              </div>
          </div>
  
          <div class="footer">
              <div class="footer-content">
                  <div class="contact-info">
                      <strong>${brandName}</strong><br>
                      Customer Service: ${contactInfo.email} | ${contactInfo.phone}<br>
                      Website: ${contactInfo.website}
                  </div>
              </div>
              
              <div class="copyright">
                  © ${new Date().getFullYear()} ${brandName}. All rights reserved.<br>
                  This email was generated automatically from the ${brandName} online portal.<br>
                  Please do not reply to this email. For assistance, contact our customer service team.
              </div>
          </div>
      </div>
  </body>
  </html>
      `;
    },

    // Helper function to create form data sections
    createFormDataSection: (title, data) => {
        const content = Object.entries(data)
            .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
            .map(([label, value]) => `
          <div class="info-grid">
            <div class="info-label">${label}:</div>
            <div class="info-value">${value}</div>
          </div>
        `).join('');

        return {
            title,
            content
        };
    }
};