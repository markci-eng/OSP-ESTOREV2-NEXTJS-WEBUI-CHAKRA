// app/api/items/route.ts
import { NextResponse } from 'next/server';

// const API_URL = 'http://localhost:5000/users'; // Backend API URL
const API_URL = 'https://render-json-server-jako.onrender.com/users'; // Backend API URL

// GET: Fetch all items
export async function GET() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST: Add new item
export async function POST(request: Request) {
  const body = await request.json();
  const newItem = { 
    ...(body?.id && { id: body.id }), 
    lastName: body.lastName, 
    firstName: body.firstName,
    middleName: body.middleName,
    email: body.email,
    contactNumber: body.contactNumber,
    password: body.password 
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to add user' }, { status: 400 });
    }

    const addedItem = await response.json();
    return NextResponse.json(addedItem);
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

// PUT: Update an existing item
export async function PUT(request: Request) {
  const body = await request.json();
  const { id, lastName, firstName, middleName, email, contactNumber, password,  } = body;

  console.log("Updating user with ID:", id);
  try {
    // Fetch the item from backend to check if it exists
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Proceed with update if item exists
    const updatedItem = { lastName, firstName, middleName, email, contactNumber, password };
    const updateResponse = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });

    if (!updateResponse.ok) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
    }

    const item = await updateResponse.json();
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE: Remove an item
export async function DELETE(request: Request) {
  const { id } = await request.json();
  
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
