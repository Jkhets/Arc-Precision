import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = "https://flxmneyfdpebgjvxjzbt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZseG1uZXlmZHBlYmdqdnhqemJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mjc1MDgsImV4cCI6MjA1ODUwMzUwOH0.hPC7mrcCYmMRmDJexwJ45oNnuG2pR6L5lYqw756Sa2I";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
