import { authOptions } from '@/lib/auth';
import { connectToDb } from '@/lib/db';
import Video, { IVideo } from '@/models/Video';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDb();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 500 });
    }
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { error: 'something went wrong while fetching videos' },
      {
        status: 500
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: 'Unauthorized'
        },
        {
          status: 400
        }
      );
    }

    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.thumbnailUrl ||
      !body.videoUrl
    ) {
      return NextResponse.json(
        {
          message: 'missing required fields'
        },
        {
          status: 400
        }
      );
    }
    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100
      }
    };

    const newVideo = await Video.create(videoData);
    NextResponse.json(newVideo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'failed to create a video'
      },
      {
        status: 400
      }
    );
  }
}
