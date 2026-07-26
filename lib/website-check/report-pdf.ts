import type { WebsiteCheckResult } from "./types";

type PdfPage = string[];

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function pdfText(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(value: string, maxChars: number) {
  const words = value.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) current = candidate;
    else {
      if (current) lines.push(current);
      current = word.length > maxChars ? `${word.slice(0, maxChars - 1)}-` : word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

class ReportPdf {
  private pages: PdfPage[] = [[]];
  private pageIndex = 0;
  private y = PAGE_HEIGHT - MARGIN;

  private get page() {
    return this.pages[this.pageIndex];
  }

  private newPage() {
    this.pages.push([]);
    this.pageIndex += 1;
    this.y = PAGE_HEIGHT - MARGIN;
  }

  private ensureSpace(height: number) {
    if (this.y - height < MARGIN) this.newPage();
  }

  private drawText(text: string, x: number, y: number, size: number, bold = false) {
    this.page.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${pdfText(text)}) Tj ET`);
  }

  private line(y: number) {
    this.page.push(`0.82 G 0.6 w ${MARGIN} ${y} m ${PAGE_WIDTH - MARGIN} ${y} l S`);
  }

  addHeading(text: string, size = 20) {
    const lines = wrapText(text, Math.max(24, Math.floor(CONTENT_WIDTH / (size * 0.55))));
    this.ensureSpace(lines.length * (size + 5) + 12);
    for (const line of lines) {
      this.drawText(line, MARGIN, this.y, size, true);
      this.y -= size + 5;
    }
    this.y -= 6;
  }

  addParagraph(text: string, size = 10, indent = 0) {
    const width = CONTENT_WIDTH - indent;
    const lines = wrapText(text, Math.max(35, Math.floor(width / (size * 0.52))));
    this.ensureSpace(lines.length * (size + 4) + 5);
    for (const line of lines) {
      this.drawText(line, MARGIN + indent, this.y, size, false);
      this.y -= size + 4;
    }
    this.y -= 4;
  }

  addKeyValue(label: string, value: string) {
    const valueLines = wrapText(value, 76);
    this.ensureSpace(Math.max(16, valueLines.length * 13) + 6);
    this.drawText(label, MARGIN, this.y, 9, true);
    let valueY = this.y;
    for (const line of valueLines) {
      this.drawText(line, MARGIN + 145, valueY, 9);
      valueY -= 13;
    }
    this.y = Math.min(this.y - 16, valueY - 3);
  }

  addDivider() {
    this.ensureSpace(18);
    this.line(this.y);
    this.y -= 18;
  }

  addPageNumbers() {
    this.pages.forEach((page, index) => {
      page.push(`BT /F1 8 Tf ${PAGE_WIDTH - MARGIN - 70} 25 Td (Seite ${index + 1} von ${this.pages.length}) Tj ET`);
    });
  }

  build() {
    this.addPageNumbers();
    const objects: string[] = [];
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
    objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

    const kids: string[] = [];
    this.pages.forEach((commands, index) => {
      const pageObject = 5 + index * 2;
      const streamObject = pageObject + 1;
      kids.push(`${pageObject} 0 R`);
      const stream = commands.join("\n");
      const streamLength = Buffer.byteLength(stream, "latin1");
      objects[pageObject] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${streamObject} 0 R >>`;
      objects[streamObject] = `<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`;
    });
    objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${this.pages.length} >>`;

    let output = "%PDF-1.4\n%âãÏÓ\n";
    const offsets: number[] = [0];
    for (let index = 1; index < objects.length; index += 1) {
      offsets[index] = Buffer.byteLength(output, "latin1");
      output += `${index} 0 obj\n${objects[index]}\nendobj\n`;
    }
    const xrefOffset = Buffer.byteLength(output, "latin1");
    output += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let index = 1; index < objects.length; index += 1) {
      output += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
    }
    output += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return Buffer.from(output, "latin1");
  }
}

export function createWebsiteReportPdf(result: WebsiteCheckResult) {
  const pdf = new ReportPdf();
  pdf.addHeading("Website-Report", 26);
  pdf.addHeading(result.domain, 18);
  pdf.addParagraph(result.summary, 11);
  pdf.addDivider();
  pdf.addKeyValue("Analysierte URL", result.normalizedUrl);
  pdf.addKeyValue("Teststrategie", result.strategy === "mobile" ? "Mobile" : "Desktop");
  pdf.addKeyValue("Analysezeitpunkt", new Date(result.createdAt).toLocaleString("de-DE"));

  pdf.addDivider();
  pdf.addHeading("Hauptscores", 17);
  for (const score of Object.values(result.scores)) {
    pdf.addKeyValue(score.label, `${score.value ?? "Nicht verfügbar"}/100 - ${score.statusLabel}`);
  }

  pdf.addDivider();
  pdf.addHeading("Zentrale Messwerte", 17);
  for (const metric of result.metrics) {
    pdf.addKeyValue(metric.label, `${metric.value ?? "Nicht verfügbar"} (${metric.sourceLabel})`);
  }

  pdf.addDivider();
  pdf.addHeading("Priorisierte Erkenntnisse", 17);
  result.findings.forEach((finding, index) => {
    pdf.addHeading(`${index + 1}. ${finding.title}`, 13);
    pdf.addParagraph(finding.technicalSummary, 9);
    pdf.addParagraph(finding.businessImpact, 10);
  });

  if (result.intelligence?.sections?.length) {
    pdf.addDivider();
    pdf.addHeading("Erweiterte Website-Analyse - Bereiche 1 bis 19", 17);
    result.intelligence.sections.forEach((section) => {
      pdf.addHeading(section.title, 13);
      pdf.addParagraph(section.description, 9);
      pdf.addKeyValue("Bewertung", section.score === null ? "Keine numerische Bewertung" : `${section.score}/100`);
      pdf.addKeyValue("Erkennungssicherheit", section.confidence === "high" ? "Hoch" : section.confidence === "medium" ? "Mittel" : "Niedrig");
      section.items.forEach((entry) => {
        const evidence = entry.evidence ? ` | Nachweis: ${entry.evidence}` : "";
        pdf.addKeyValue(entry.label, `${entry.value}${evidence}`);
      });
      pdf.addDivider();
    });
    result.intelligence.notes.forEach((note) => pdf.addParagraph(`Hinweis: ${note}`, 8));
  } else {
    pdf.addDivider();
    pdf.addHeading("Erweiterte Website-Analyse", 17);
    pdf.addParagraph("Für dieses ältere Analyseergebnis sind die Bereiche 1 bis 19 nicht gespeichert. Bitte führen Sie einen neuen Website-Check aus.");
  }

  pdf.addDivider();
  pdf.addHeading("Hinweis", 14);
  pdf.addParagraph("Der Report ist eine automatisierte technische Momentaufnahme. Messwerte können schwanken. Heuristische Erkennungen zu Technologie, Hosting, AEO und GEO sind keine Garantie und ersetzen keine vollständige fachliche oder rechtliche Prüfung.", 9);
  pdf.addParagraph("Leon Pllana IT-Solutions - pllana.io", 9);
  return pdf.build();
}
