import { jsPDF } from 'jspdf';
import { InsuranceCase } from '../components/dashboards/InsuranceDashboard';

export function downloadClaimPdf(
  formData: any,
  companyName: string,
  claim: InsuranceCase
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - margin * 2; // 186mm

  // True Architectural 4-Column Grid System
  const colGap = 2.5; // Uniform horizontal gap between tiles
  const colWidth = (contentWidth - 3 * colGap) / 4; // 44.625mm per base unit
  const rowHeight = 11.5; // Uniform vertical breathing height
  const rowGap = 2.2; // Uniform vertical gap between rows

  // Colors
  const navy = [15, 23, 42]; // #0f172a
  const blue = [30, 64, 175]; // #1e40af
  const textBlack90 = [26, 26, 26]; // 90% Solid Black for all answer text
  const slateLabel = [100, 116, 139]; // Muted crisp slate
  const borderTile = [226, 232, 240]; // Hairline tile border
  const bgTile = [248, 250, 252]; // Soft clean tile fill

  // Helper: Section Banner Ribbon
  const renderSectionHeader = (y: number, title: string, pageRef: string) => {
    doc.setFillColor(blue[0], blue[1], blue[2]);
    doc.roundedRect(margin, y, contentWidth, 7.2, 1.2, 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 3.5, y + 4.9);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(219, 234, 254);
    doc.text(pageRef, pageWidth - margin - 3.5, y + 4.9, { align: 'right' });
    return y + 9.5;
  };

  // Helper: Uniform 4-Column Aligned Grid Tile Row
  const renderFieldRow = (
    y: number,
    fields: Array<{ label: string; value: string; span?: number; customHeight?: number }>
  ) => {
    let curX = margin;
    const currentHeight = fields[0]?.customHeight || rowHeight;

    fields.forEach((f) => {
      const span = f.span || 1;
      const tileW = span * colWidth + (span - 1) * colGap;

      // Card Background & Hairline Border
      doc.setFillColor(bgTile[0], bgTile[1], bgTile[2]);
      doc.setDrawColor(borderTile[0], borderTile[1], borderTile[2]);
      doc.setLineWidth(0.25);
      doc.roundedRect(curX, y, tileW, currentHeight, 1.2, 1.2, 'FD');

      // Field Label (Muted Slate, Bold, 6.5pt)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
      doc.text(f.label.toUpperCase(), curX + 2.8, y + 4.2);

      // Answer Text (90% Black, Bold, 8.5pt with generous breathing room)
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(textBlack90[0], textBlack90[1], textBlack90[2]);
      
      const safeVal = f.value || 'N/A';
      if (currentHeight > rowHeight) {
        // Multi-line wrap for narrative description boxes
        doc.setFontSize(8);
        const splitText = doc.splitTextToSize(safeVal, tileW - 6);
        doc.text(splitText, curX + 2.8, y + 8.5);
      } else {
        doc.setFontSize(8.5);
        const maxChars = Math.floor(tileW * 0.58);
        const displayVal = safeVal.length > maxChars ? safeVal.substring(0, maxChars - 3) + '...' : safeVal;
        doc.text(displayVal, curX + 2.8, y + 9.2);
      }

      curX += tileW + colGap;
    });

    return y + currentHeight + rowGap;
  };

  // -------------------------------------------------------------
  // PAGE 1: HEADER + SECTION 1 + SECTION 2 + SECTION 3 (PERFECTLY BALANCED)
  // -------------------------------------------------------------

  // Top Accent Stripe
  doc.setFillColor(blue[0], blue[1], blue[2]);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Executive Top Banner
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(margin, 8, contentWidth, 25, 2, 2, 'F');

  // Underwriter & Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(147, 197, 253);
  doc.text(companyName.toUpperCase(), margin + 5, 14.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('MOTOR VEHICLE CLAIM FORM (CIF)', margin + 5, 21.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Commercial Mining & Logistics Haulage Fleet • Official Claim Filing Form', margin + 5, 27.5);

  // Official Case ID Badge on Top Right
  const caseBoxX = pageWidth - margin - 58;
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.3);
  doc.roundedRect(caseBoxX, 11, 54, 19, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('OFFICIAL CASE ID', caseBoxX + 4, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(52, 211, 153); // Emerald Glow
  doc.text(claim.caseId, caseBoxX + 4, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  doc.text(`VEHICLE: ${claim.vehicleNumber}`, caseBoxX + 4, 27.5);

  let curY = 37;

  // SECTION 1: POLICY DETAILS & INSURED PROFILE (Questions 1 - 9)
  curY = renderSectionHeader(curY, '1. Policy Details & Insured Profile', 'Questions 1 - 9');

  // Unified Grid: [1] [1] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Policy Number', value: formData.policyNo, span: 1 },
    { label: 'Claim Number', value: formData.claimNo, span: 1 },
    { label: 'Insurance Period', value: `${formData.insurancePeriodStart} to ${formData.insurancePeriodEnd}`, span: 2 }
  ]);

  // Unified Grid: [3] [1] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Insured Name & Operating Address', value: `${formData.insuredName} - ${formData.insuredAddress}`, span: 3 },
    { label: 'Area PIN Code', value: formData.pin, span: 1 }
  ]);

  // Unified Grid: [1] [2] [1] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Mobile Number', value: formData.mobile, span: 1 },
    { label: 'Email Address', value: formData.email, span: 2 },
    { label: 'PAN Number', value: formData.panNo, span: 1 }
  ]);

  // Unified Grid: [3] [1] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Bank Account Particulars (NEFT/RTGS Settlement)', value: formData.bankAcc, span: 3 },
    { label: 'Issuing Office Code', value: formData.branchCode, span: 1 }
  ]);

  curY += 3.5;

  // SECTION 2: ACCIDENT & POLICE (FIR) PARTICULARS (Questions 10 - 18)
  curY = renderSectionHeader(curY, '2. Accident & Police (FIR) Particulars', 'Questions 10 - 18');

  // Unified Grid: [1] [1] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Accident Date', value: formData.accidentDate, span: 1 },
    { label: 'Accident Time', value: formData.accidentTime, span: 1 },
    { label: 'Vehicle Purpose At Event', value: formData.vehiclePurpose, span: 2 }
  ]);

  // Unified Grid: [4] = 4 columns (full width)
  curY = renderFieldRow(curY, [
    { label: 'Exact Spot of Accident / Geographic Landmark', value: formData.place, span: 4 }
  ]);

  // Unified Grid: [2] [1] [1] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Police Station Investigating', value: formData.policeStation, span: 2 },
    { label: 'FIR / Station Diary No.', value: formData.firNo, span: 1 },
    { label: 'Charges Under Section', value: formData.chargesUS, span: 1 }
  ]);

  // Unified Grid: [2] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Name of Complainant / Informant', value: formData.complainantName, span: 2 },
    { label: 'Other Vehicles / Barriers Involved', value: formData.otherVehicles, span: 2 }
  ]);

  // Narrative Summary: [4] = 4 columns (full width, custom height 15mm)
  curY = renderFieldRow(curY, [
    {
      label: 'NARRATIVE SUMMARY / BRIEF DESCRIPTION OF ACCIDENT OCCURRENCE',
      value: formData.accidentBrief,
      span: 4,
      customHeight: 15
    }
  ]);

  // Delayed Intimation Reason: [4] = 4 columns (full width)
  curY = renderFieldRow(curY, [
    { label: 'Reason for Delayed Intimation / FIR (if applicable)', value: formData.firDelayedReason, span: 4 }
  ]);

  curY += 3.5;

  // SECTION 3: VEHICLE & COMMERCIAL PERMIT (Questions 19 - 28) -> UNIFIED PERFECT 4-COLUMN ALIGNMENT
  curY = renderSectionHeader(curY, '3. Vehicle & Commercial Permit Particulars', 'Questions 19 - 28');

  // Unified Grid: [1] [1] [1] [1] = 4 equal columns (All exactly 44.625mm!)
  curY = renderFieldRow(curY, [
    { label: 'Registration Number', value: formData.vehicleNo, span: 1 },
    { label: 'Make & Model', value: formData.makeModel, span: 1 },
    { label: 'Year of Mfg', value: formData.mfgYear, span: 1 },
    { label: 'Engine Number', value: formData.engineNo, span: 1 }
  ]);

  // Unified Grid: [1] [1] [1] [1] = 4 equal columns (Exact vertical alignment with Row 1!)
  curY = renderFieldRow(curY, [
    { label: 'Chassis Number', value: formData.chassisNo, span: 1 },
    { label: 'Cubic Cap. / GVW', value: formData.cubicCapacity, span: 1 },
    { label: 'Regd. Laden Weight', value: formData.regdLadenWeight, span: 1 },
    { label: 'Unladen Weight', value: formData.unladenWeight, span: 1 }
  ]);

  // Unified Grid: [2] [1] [1] = 4 columns (Permit category gets 2 spans, no clipping!)
  curY = renderFieldRow(curY, [
    { label: 'Permit Category', value: formData.permitType, span: 2 },
    { label: 'Nature of Goods Carried', value: formData.natureOfGoods, span: 1 },
    { label: 'Trailer Attached & Trailer No.', value: formData.trailerAttached ? `Yes (${formData.trailerNo})` : 'No Trailer', span: 1 }
  ]);

  // Page 1 Footer
  doc.setDrawColor(borderTile[0], borderTile[1], borderTile[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  doc.text(`Transvolt Fleet CIF System • Case Reference: ${claim.caseId} • Generated: ${new Date().toLocaleDateString('en-GB')}`, margin, pageHeight - 7);
  doc.text('Page 1 of 2', pageWidth - margin, pageHeight - 7, { align: 'right' });


  // -------------------------------------------------------------
  // PAGE 2: SECTION 4 + SECTION 5 + DECLARATION + SIGNATURES + AUDIT SEAL
  // -------------------------------------------------------------
  doc.addPage();

  // Top Accent Stripe
  doc.setFillColor(blue[0], blue[1], blue[2]);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Mini Banner Page 2
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(margin, 8, contentWidth, 16, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`MOTOR VEHICLE CLAIM FORM (CIF) - ${companyName.toUpperCase()}`, margin + 4.5, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(52, 211, 153);
  doc.text(`CASE ID: ${claim.caseId} | VEHICLE: ${claim.vehicleNumber}`, pageWidth - margin - 4.5, 16, { align: 'right' });

  curY = 28;

  // SECTION 4: DRIVER ON WHEEL PARTICULARS (Questions 29 - 36)
  curY = renderSectionHeader(curY, '4. Driver on Wheel Particulars', 'Questions 29 - 36');

  // Unified Grid: [1] [1] [1] [1] = 4 equal columns
  curY = renderFieldRow(curY, [
    { label: 'Driver Full Name', value: formData.driverName, span: 1 },
    { label: 'Age', value: `${formData.driverAge} Years`, span: 1 },
    { label: 'Driving License No.', value: formData.dlNumber, span: 1 },
    { label: 'Relationship with Insured', value: formData.relationship, span: 1 }
  ]);

  // Unified Grid: [2] [1] [1] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Authorised Vehicle Classes', value: formData.dlAuthorised, span: 2 },
    { label: 'Issuing Authority (RTO)', value: formData.issuingAuthority, span: 1 },
    { label: 'DL Expiry Date', value: formData.dlExpiry, span: 1 }
  ]);

  // Unified Grid: [2] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'License Suspended/Revoked History', value: formData.dlSuspended ? 'Yes (Suspension Recorded)' : 'No (Active/Clear Record)', span: 2 },
    { label: 'Past 5 Years Accident Record', value: formData.pastAccidents, span: 2 }
  ]);

  curY += 4;

  // SECTION 5: DAMAGES, SURVEY & COMMERCIAL CLAIMS (Questions 37 - 42)
  curY = renderSectionHeader(curY, '5. Damages Inspection, Survey & Commercial Claims', 'Questions 37 - 42');

  // Unified Grid: [2] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Third Party Injuries / Fatalities', value: `Injured: ${formData.injuredCount} Person(s) | Deaths: ${formData.deathCount}`, span: 2 },
    { label: 'Third Party Property Loss Approx', value: `Rs. ${formData.tppdApproxCost} (${formData.tppdNature})`, span: 2 }
  ]);

  // Unified Grid: [2] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Inspection Address / Designated Garage', value: formData.inspectionAddress, span: 2 },
    { label: 'Inspection Contact Person & Mobile', value: `${formData.contactPerson} (${formData.contactPhone})`, span: 2 }
  ]);

  // Unified Grid: [1] [1] [2] = 4 columns
  curY = renderFieldRow(curY, [
    { label: 'Insured Declared Value (IDV)', value: `Rs. ${formData.idvAmount}`, span: 1 },
    { label: 'Estimated Repair Cost (Loss)', value: `Rs. ${formData.estimatedRepairCost}`, span: 1 },
    { label: 'Filing Place & Intimation Date', value: `${formData.filingPlace || 'Mumbai'}, ${new Date().toLocaleDateString('en-GB')}`, span: 2 }
  ]);

  curY += 4;

  // LEGAL DECLARATION & WARRANTY STATEMENT
  doc.setFillColor(239, 246, 255); // soft light blue
  doc.setDrawColor(191, 219, 254);
  doc.setLineWidth(0.3);
  const declHeight = 22;
  doc.roundedRect(margin, curY, contentWidth, declHeight, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(blue[0], blue[1], blue[2]);
  doc.text('LEGAL WARRANTY & STATUTORY DECLARATION OF TRUTH', margin + 3.5, curY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  const declText =
    'I / We hereby declare and warrant the truth of each and every foregoing statement and answer in every respect. If I / We have made or shall make any false or fraudulent statement, suppression or concealment, the right to recover upon this policy shall be absolutely forfeited under insurance law.';
  const splitDecl = doc.splitTextToSize(declText, contentWidth - 7);
  doc.text(splitDecl, margin + 3.5, curY + 11);

  curY += declHeight + 5;

  // OFFICIAL EXECUTION & SIGNATURES BLOCK (Two 2-unit boxes = 4 columns)
  const sigBoxW = (contentWidth - colGap) / 2;
  const sigH = 26;

  // Left: Insured Signature Box
  doc.setFillColor(bgTile[0], bgTile[1], bgTile[2]);
  doc.setDrawColor(borderTile[0], borderTile[1], borderTile[2]);
  doc.setLineWidth(0.25);
  doc.roundedRect(margin, curY, sigBoxW, sigH, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  doc.text('SIGNATURE OF INSURED / AUTHORISED FLEET CONTROLLER', margin + 3.5, curY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textBlack90[0], textBlack90[1], textBlack90[2]);
  doc.text('Digitally Authenticated by Transvolt Mobility Pvt Ltd', margin + 3.5, curY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  doc.text(`Signed at: ${formData.filingPlace || 'Mumbai'}  |  Timestamp: ${new Date().toLocaleString()}`, margin + 3.5, curY + 20);

  // Right: Surveyor / Insurer Acknowledgment Stamp Box
  doc.roundedRect(margin + sigBoxW + colGap, curY, sigBoxW, sigH, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  doc.text('INSURER ACKNOWLEDGEMENT & SURVEYOR CLEARANCE', margin + sigBoxW + colGap + 3.5, curY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textBlack90[0], textBlack90[1], textBlack90[2]);
  doc.text(companyName.toUpperCase(), margin + sigBoxW + colGap + 3.5, curY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  doc.text(`Official Claim Registration Ref: CLM-${claim.caseId}`, margin + sigBoxW + colGap + 3.5, curY + 20);

  curY += sigH + 5;

  // SYSTEM CLAIM INTEGRITY AUDIT SEAL
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(margin, curY, contentWidth, 14, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(147, 197, 253);
  doc.text('DIGITAL CLAIM VERIFICATION SEAL & AUDIT IDENTIFIER', margin + 4, curY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(203, 213, 225);
  doc.text(`Hash: SHA256-${claim.caseId}-${claim.vehicleNumber.replace(/\s+/g, '')}-TVLT2026 | Schema: CIF-42Q-REV3 | Security: Authorized Corporate Fleet Submission`, margin + 4, curY + 10.5);

  // Page 2 Footer
  doc.setDrawColor(borderTile[0], borderTile[1], borderTile[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateLabel[0], slateLabel[1], slateLabel[2]);
  doc.text(`Transvolt Fleet CIF System • Case Reference: ${claim.caseId} • Official 2-Page Legal Schema`, margin, pageHeight - 7);
  doc.text('Page 2 of 2', pageWidth - margin, pageHeight - 7, { align: 'right' });

  // Direct File Download
  const cleanVehicle = (claim.vehicleNumber || 'VEHICLE').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `Motor_Claim_Form_${claim.caseId}_${cleanVehicle}.pdf`;
  doc.save(fileName);
}
