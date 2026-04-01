'use server'

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/client-server'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  
  // This endpoint is just to keep the server alive
  // It doesn't need to do anything
    await supabase.from("habits").select("id").limit(1);
  return NextResponse.json({ ok: true });
}
