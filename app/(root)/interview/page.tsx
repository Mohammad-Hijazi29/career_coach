'use client';

import { useSearchParams } from 'next/navigation';
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{ name: string; id: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const role = searchParams.get('role') || '';
  const type = (searchParams.get('type') as 'technical' | 'behavioral' | 'mixed') || 'technical';
  const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount')!) : 3;

  const q = searchParams.get('questions');
  const parsedQuestions = q ? JSON.parse(decodeURIComponent(q)) : [];

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h3>Interview Agent</h3>
      <Agent
        userName={user.name}
        userId={user.id}
        presetRole={role}
        presetInterviewType={type}
        presetAmount={amount}
        presetQuestions={parsedQuestions}
      />
    </>
  );
};

export default Page;