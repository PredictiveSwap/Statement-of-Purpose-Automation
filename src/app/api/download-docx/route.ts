import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType } from 'docx';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sopContent = formData.get('sop_content')?.toString() || '';
    const userName = formData.get('name')?.toString() || 'User';
    
    // Create a document
    const doc = generateDocx(sopContent, userName);
    
    // Create a buffer with the document
    const buffer = await Packer.toBuffer(doc);
    
    // Return as a downloadable file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="SOP_${userName.replace(/\s+/g, '_')}.docx"`,
      },
    });
  } catch (error) {
    console.error('Error generating DOCX file:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

function generateDocx(sopContent: string, userName: string) {
  // Split the content into sections
  const parts = sopContent.split('\n\n');
  
  // Create document title
  const title = new Paragraph({
    text: "STATEMENT OF PURPOSE",
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
  });
  
  // Process all paragraphs
  const paragraphs = [
    title,
    new Paragraph({}), // Empty paragraph for spacing
    ...processSopContent(parts)
  ];
  
  // Create a new document
  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }],
    creator: userName,
    title: `Statement of Purpose - ${userName}`,
    description: 'Statement of Purpose generated with AI'
  });
  
  return doc;
}

function processSopContent(parts: string[]) {
  const paragraphs = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0 && i + 1 < parts.length) {
      // This is a heading
      paragraphs.push(
        new Paragraph({
          text: parts[i],
          heading: HeadingLevel.HEADING_2,
          spacing: {
            before: 240,
            after: 120
          }
        })
      );
    } else {
      // This is content - Split into actual paragraphs
      const contentParagraphs = parts[i].split('\n');
      for (const para of contentParagraphs) {
        paragraphs.push(
          new Paragraph({
            text: para,
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 360
            }
          })
        );
      }
    }
  }
  
  return paragraphs;
} 