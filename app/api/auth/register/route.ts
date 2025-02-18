import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '@/lib/db';
import User from '@/models/Users';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log('password', password);
    if (!email || !password) {
      return NextResponse.json(
        {
          error: 'email and password are required'
        },
        { status: 400 }
      );
    }

    await connectToDb();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: 'Email is already registered'
        },
        { status: 400 }
      );
    }

    const user = await User.create({
      email,
      password
    });

    return NextResponse.json(
      {
        message: 'user created successfully'
      },
      {
        status: 201
      }
    );
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      {
        message: 'failed to register user successfully'
      },
      {
        status: 500
      }
    );
  }
}
