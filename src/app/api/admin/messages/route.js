import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';
import { verifyAdmin } from '@/lib/adminAuth';

// GET - Get all messages with filtering
export async function GET(request) {
  try {
    const authResult = await verifyAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const isStarred = searchParams.get('starred');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;

    // Build filters
    const filters = {};
    if (status) filters.status = status;
    if (isStarred !== null) filters.isStarred = isStarred === 'true';
    if (search) filters.search = search;

    // Get messages
    const messages = await Message.getFilteredMessages(filters)
      .limit(limit)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const totalMessages = await Message.countDocuments(
      filters.status ? { status: filters.status } : {}
    );

    // Get statistics
    const stats = await Message.getStats();

    return NextResponse.json(
      {
        success: true,
        data: messages,
        pagination: {
          page,
          limit,
          total: totalMessages,
          pages: Math.ceil(totalMessages / limit)
        },
        stats
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
