'use client';

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface SavedMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  presetRole: string;
  presetInterviewType: string;
  presetAmount: number;
  presetQuestions: string[]; // ensure this is passed as an array
}

const Agent = ({
  userName,
  userId,
  presetRole,
  presetInterviewType,
  presetAmount,
  presetQuestions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) router.push('/');
  }, [callStatus, userId]);

  const formattedQuestions = Array.isArray(presetQuestions)
    ? presetQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")
    : presetQuestions || "general interview topics";

  const prompt = `You are a professional job interviewer conducting a real-time voice interview with a candidate for the ${presetRole} position. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:

Here are the questions you should ask the candidate:

${formattedQuestions}

Limit the interview to ${presetAmount} questions.
The interview is of type ${presetInterviewType === "mixed" ? "behavioral and technical" : presetInterviewType}.

Engage naturally & react appropriately:
- Listen actively to responses and acknowledge them before moving forward.
- Ask brief follow-up questions if a response is vague or requires more detail.
- Keep the conversation flowing smoothly while maintaining control.

Be professional, yet warm and welcoming:
- Use official yet friendly language.
- Keep responses concise and to the point (like in a real voice interview).
- Avoid robotic phrasing—sound natural and conversational.

Answer the candidate’s questions professionally:
- If asked about the role, company, or expectations, provide a clear and relevant answer.
- If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
- Thank the candidate for their time.
- Inform them that the company will reach out soon with feedback.
- End the conversation on a polite and positive note.

- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.
`;

  const interviewer: CreateAssistantDTO = {
    name: "Interviewer",
    firstMessage:
      "Hello! Thank you for taking the time to speak with me today, are you ready for our interview?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: "sarah",
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(interviewer);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/logo.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interview</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full flex justify-center">
          {callStatus !== 'ACTIVE' ? (
            <button className="relative btn-call" onClick={handleCall}>
              <span
                className={cn(
                  'absolute animate-ping rounded-full opacity-75',
                  callStatus !== 'CONNECTING' && 'hidden'
                )}
              />
              <span>{isCallInactiveOrFinished ? 'Call' : '. . .'}</span>
            </button>
          ) : (
            <button className="btn-disconnect" onClick={handleDisconnect}>
              End
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Agent;
