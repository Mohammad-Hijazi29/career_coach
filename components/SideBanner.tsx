import Image from 'next/image'

const SideBanner = () => {
  return (
    <div className="side-banner ">
      <div className="flex items-start gap-4">
        <Image src="/robot-icon.png" alt="robot-icon" width={80} height={80} />
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI-Powered Mock Interviews</h3>
          <p className="text-muted-foreground">
            Create immersive, real-time interview sessions with an AI agent. Practice answering questions tailored to your desired role and get better with each attempt.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Image src="/questions-icon.png" alt="questions-icon" width={80} height={80} />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Custom or AI-Generated Questions</h3>
          <p className="text-muted-foreground">
            Choose your own questions or let our AI craft a dynamic set based on your selected role.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Image src="/repeat-icon.png" alt="template-icon" width={80} height={80} />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Create Reusable Templates</h3>
          <p className="text-muted-foreground">
            Build your own interview templates so you can revisit them anytime. Perfect for tracking progress and tailoring your prep over time.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Image src="/sharing-icon.png" alt="sharing-icon" width={80} height={80} />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Browse Community Interviews</h3>
          <p className="text-muted-foreground">
            Explore templates created by our community of users to discover new interview types and questions. Use them as-is or remix them into your own.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SideBanner
