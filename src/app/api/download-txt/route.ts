import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sopContent = formData.get('sop_content')?.toString() || '';
    const userName = formData.get('name')?.toString() || 'User';
    
    // Create text content
    const textContent = sopContent;
    
    // Return as a downloadable file
    return new NextResponse(textContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="SOP_${userName.replace(/\s+/g, '_')}.txt"`,
      },
    });
  } catch (error) {
    console.error('Error generating text file:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
} 